import { connectDB } from "@/lib/mongodb";
import { verifyAuth } from "@/lib/auth";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const auth = await verifyAuth();
    if (!auth) {
      return NextResponse.json({ error: "Please login to share your story" }, { status: 401 });
    }

    const { name, text } = await request.json();

    if (!name || !text) {
      return NextResponse.json({ error: "Name and testimonial are required" }, { status: 400 });
    }

    if (text.length < 10) {
      return NextResponse.json({ error: "Testimonial must be at least 10 characters" }, { status: 400 });
    }

    await connectDB();

    const testimonial = await Testimonial.create({
      userId: auth.userId,
      name,
      text,
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
