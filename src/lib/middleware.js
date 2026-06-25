import { verifyAuth } from "./auth";
import { NextResponse } from "next/server";
import { connectDB } from "./mongodb";
import User from "@/models/User";

/**
 * Middleware to require authentication
 * Usage: export const POST = withAuth(async (request, { auth }) => { ... })
 */
export function withAuth(handler) {
  return async (request, context) => {
    try {
      const auth = await verifyAuth();

      if (!auth) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }

      // Pass auth info to the handler
      return handler(request, { ...context, auth });
    } catch (error) {
      console.error("Auth middleware error:", error);
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }
  };
}

/**
 * Middleware to require authentication and fetch full user data
 * Usage: export const POST = withAuthUser(async (request, { user }) => { ... })
 */
export function withAuthUser(handler) {
  return async (request, context) => {
    try {
      const auth = await verifyAuth();

      if (!auth) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }

      await connectDB();
      const user = await User.findById(auth.userId).select("-password");

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Pass full user object to the handler
      return handler(request, { ...context, user, auth });
    } catch (error) {
      console.error("Auth user middleware error:", error);
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }
  };
}

/**
 * Middleware to require admin role
 * Usage: export const POST = withAdmin(async (request, { user }) => { ... })
 */
export function withAdmin(handler) {
  return withAuthUser(async (request, context) => {
    const { user } = context;

    if (user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    return handler(request, context);
  });
}

/**
 * Middleware to optionally include auth if present
 * Usage: export const GET = withOptionalAuth(async (request, { auth }) => { ... })
 * auth will be null if not authenticated
 */
export function withOptionalAuth(handler) {
  return async (request, context) => {
    try {
      const auth = await verifyAuth();
      return handler(request, { ...context, auth });
    } catch (error) {
      // Continue without auth
      return handler(request, { ...context, auth: null });
    }
  };
}

/**
 * Middleware to validate request body with a Zod schema
 * Usage: export const POST = withValidation(schema, async (request, { data }) => { ... })
 */
export function withValidation(schema) {
  return (handler) => {
    return async (request, context) => {
      try {
        const body = await request.json();
        const validation = schema.safeParse(body);

        if (!validation.success) {
          const errors = validation.error.errors.map((err) => err.message).join(", ");
          return NextResponse.json({ error: errors }, { status: 400 });
        }

        // Pass validated data to the handler
        return handler(request, { ...context, data: validation.data });
      } catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
      }
    };
  };
}

/**
 * Compose multiple middleware functions
 * Usage: export const POST = compose(withAuth, withValidation(schema))(handler)
 */
export function compose(...middlewares) {
  return (handler) => {
    return middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
  };
}
