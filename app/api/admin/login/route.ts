import { NextResponse } from "next/server";
import { db } from "@/lib/db"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const [rows]: any = await db.query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid Email" },
        { status: 401 }
      );
    }

    const admin = rows[0];

    const validPassword = await bcrypt.compare(
      password,
      admin.password
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid Password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}