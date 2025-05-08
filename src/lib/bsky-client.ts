import { BskyAgent } from "@atproto/api";

// Create a singleton instance of the BskyAgent
export const bskyAgent = new BskyAgent({
  service: "https://bsky.social",
});

// Login function with email verification
export async function loginToBlueSky(identifier: string, password: string) {
  try {
    // First attempt to login
    const response = await bskyAgent.login({
      identifier,
      password,
    });
    return { success: true, data: response };
  } catch (error: any) {
    // Check if this is an email verification error
    if (error.message?.includes("sign in code has been sent to your email")) {
      return {
        success: false,
        needsVerification: true,
        message: "Please check your email for the verification code",
      };
    }
    console.error("Login failed:", error);
    throw error;
  }
}

// Verify email code
export async function verifyEmailCode(identifier: string, code: string) {
  try {
    const response = await bskyAgent.login({
      identifier,
      password: code,
    });
    return { success: true, data: response };
  } catch (error) {
    console.error("Verification failed:", error);
    throw error;
  }
}

// Session management
export function getSession() {
  return bskyAgent.session;
}

export function isAuthenticated() {
  return !!bskyAgent.session;
}

export function logout() {
  // Create a new agent instance to clear the session
  Object.assign(
    bskyAgent,
    new BskyAgent({
      service: "https://bsky.social",
    })
  );
}
