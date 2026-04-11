import { connectDB } from "@/lib/mongodb";
import { verifyAuth } from "@/lib/auth";
import User from "@/models/User";
import QuizAttempt from "@/models/QuizAttempt";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const auth = await verifyAuth();
    if (!auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const currentUser = await User.findById(auth.userId).select("role");
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const targetUser = await User.findById(params.id);
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (targetUser.role === "admin") {
      return NextResponse.json({ error: "Cannot delete admin user" }, { status: 403 });
    }

    await QuizAttempt.deleteMany({ userId: params.id });
    await User.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
