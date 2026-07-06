import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { topicTitle, topicSlug, feedbackText } = await req.json();

    if (!topicTitle || !topicSlug || !feedbackText) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const [result]: any = await db.execute(
      "INSERT INTO ArtsLabFeedback (topicTitle, topicSlug, feedbackText, createdAt) VALUES (?, ?, ?, NOW())",
      [topicTitle, topicSlug, feedbackText]
    );

    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
