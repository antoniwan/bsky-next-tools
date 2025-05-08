import { BskyAgent } from "@atproto/api";

// Create a singleton instance of the BskyAgent
export const bskyAgent = new BskyAgent({
  service: "https://bsky.social",
});

interface LoginResponse {
  success: boolean;
  data?: {
    accessJwt: string;
    refreshJwt: string;
    handle: string;
    did: string;
    email?: string;
    active: boolean;
  };
  needsVerification?: boolean;
  message?: string;
  rateLimited?: boolean;
  retryAfter?: number;
}

// Login function with email verification
export async function loginToBlueSky(
  identifier: string,
  password: string
): Promise<LoginResponse> {
  try {
    // First attempt to login
    const response = await bskyAgent.login({
      identifier,
      password,
    });

    return {
      success: true,
      data: {
        ...response.data,
        active: true,
      },
    };
  } catch (error) {
    // Check if this is an email verification error
    if (
      error instanceof Error &&
      error.message?.includes("sign in code has been sent to your email")
    ) {
      return {
        success: false,
        needsVerification: true,
        message: "Please check your email for the verification code",
      };
    }

    // Handle rate limiting
    if (
      error instanceof Error &&
      error.message?.includes("Rate Limit Exceeded")
    ) {
      const retryAfter = error.message.match(/retry after (\d+)/i)?.[1];
      return {
        success: false,
        rateLimited: true,
        retryAfter: retryAfter ? parseInt(retryAfter, 10) : 60,
        message: `Too many attempts. Please wait ${
          retryAfter || 60
        } seconds before trying again.`,
      };
    }

    // Handle invalid credentials
    if (
      error instanceof Error &&
      error.message?.includes("Invalid identifier or password")
    ) {
      return {
        success: false,
        message: "Invalid username/email or password. Please try again.",
      };
    }

    // Handle other errors
    console.error("Login failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

// Verify email code
export async function verifyEmailCode(
  identifier: string,
  code: string
): Promise<LoginResponse> {
  try {
    const response = await bskyAgent.login({
      identifier,
      password: code,
    });

    return {
      success: true,
      data: {
        ...response.data,
        active: true,
      },
    };
  } catch (error) {
    // Handle rate limiting
    if (
      error instanceof Error &&
      error.message?.includes("Rate Limit Exceeded")
    ) {
      const retryAfter = error.message.match(/retry after (\d+)/i)?.[1];
      return {
        success: false,
        rateLimited: true,
        retryAfter: retryAfter ? parseInt(retryAfter, 10) : 60,
        message: `Too many attempts. Please wait ${
          retryAfter || 60
        } seconds before trying again.`,
      };
    }

    console.error("Verification failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Invalid verification code",
    };
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
