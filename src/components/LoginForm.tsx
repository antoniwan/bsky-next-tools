"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
      setError(null);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          password: isVerifying ? verificationCode : password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to the original destination or home
        const from = searchParams.get("from") || "/";
        router.push(from);
      } else if (result.needsVerification) {
        setIsVerifying(true);
        setError(result.message);
      } else if (result.rateLimited) {
        setCountdown(result.retryAfter);
        setError(result.message);
      } else {
        setError(result.message ?? "Authentication failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
    }
  };

  const handleBackToLogin = () => {
    setIsVerifying(false);
    setVerificationCode("");
    setError(null);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isVerifying ? "Verify Your Email" : "Login to BlueSky"}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700"
          >
            {isVerifying ? "Email" : "Username or Email"}
          </label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={isVerifying || countdown !== null}
            required
          />
        </div>

        {isVerifying ? (
          <div>
            <label
              htmlFor="verificationCode"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={countdown !== null}
              required
            />
            <button
              type="button"
              onClick={handleBackToLogin}
              className="mt-2 text-sm text-blue-600 hover:text-blue-500"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={countdown !== null}
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={countdown !== null}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {countdown !== null
            ? `Please wait ${countdown}s`
            : isVerifying
            ? "Verify"
            : "Login"}
        </button>
      </form>
    </div>
  );
}
