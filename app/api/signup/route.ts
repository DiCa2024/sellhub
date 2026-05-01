import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "This email is already registered." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    return NextResponse.json(
      { message: "Sign up complete." },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGNUP_ERROR", error);

    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}