import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("bsky_session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    return NextResponse.json(session);
  } catch (error) {
    console.error("Session parse error:", error);
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}
