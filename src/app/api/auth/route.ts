import { NextResponse } from "next/server";
import { BskyAgent } from "@atproto/api";
import { cookies } from "next/headers";

const bskyAgent = new BskyAgent({
  service: "https://bsky.social",
});

export async function POST(request: Request) {
  try {
    const { identifier, password, code } = await request.json();
    const cookieStore = cookies();

    // If code is provided, this is a verification attempt
    if (code) {
      const response = await bskyAgent.login({
        identifier,
        password: code,
      });

      // Set session cookie
      cookieStore.set("bsky_session", JSON.stringify(response.data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return NextResponse.json({ success: true });
    }

    // Regular login attempt
    try {
      const response = await bskyAgent.login({
        identifier,
        password,
      });

      // Set session cookie
      cookieStore.set("bsky_session", JSON.stringify(response.data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      // Check if this is an email verification error
      if (
        error instanceof Error &&
        error.message?.includes("sign in code has been sent to your email")
      ) {
        return NextResponse.json({
          success: false,
          needsVerification: true,
          message: "Please check your email for the verification code",
        });
      }

      // Handle rate limiting
      if (
        error instanceof Error &&
        error.message?.includes("Rate Limit Exceeded")
      ) {
        const retryAfter = error.message.match(/retry after (\d+)/i)?.[1];
        return NextResponse.json({
          success: false,
          rateLimited: true,
          retryAfter: retryAfter ? parseInt(retryAfter, 10) : 60,
          message: `Too many attempts. Please wait ${
            retryAfter || 60
          } seconds before trying again.`,
        });
      }

      throw error;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Authentication failed",
      },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  // Clear the session cookie
  const cookieStore = cookies();
  cookieStore.delete("bsky_session");
  return NextResponse.json({ success: true });
}
