"use client";

import { useState } from "react";
import { loginToBlueSky, verifyEmailCode } from "@/lib/bsky-client";

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onLoginError?: (error: Error) => void;
}

export default function LoginForm({
  onLoginSuccess,
  onLoginError,
}: LoginFormProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (needsVerification) {
        const result = await verifyEmailCode(identifier, verificationCode);
        if (result.success) {
          onLoginSuccess?.();
        }
      } else {
        const result = await loginToBlueSky(identifier, password);
        if (result.success) {
          onLoginSuccess?.();
        } else if (result.needsVerification) {
          setNeedsVerification(true);
          setError(result.message);
        }
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      onLoginError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md mx-auto p-6"
    >
      <div>
        <label
          htmlFor="identifier"
          className="block text-sm font-medium text-gray-700"
        >
          Username or Email
        </label>
        <input
          type="text"
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {!needsVerification ? (
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
            required
          />
        </div>
      ) : (
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
            required
            placeholder="Enter the code sent to your email"
          />
        </div>
      )}

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading
          ? "Processing..."
          : needsVerification
          ? "Verify Code"
          : "Login to BlueSky"}
      </button>

      {needsVerification && (
        <button
          type="button"
          onClick={() => setNeedsVerification(false)}
          className="w-full text-sm text-blue-600 hover:text-blue-500"
        >
          Back to Login
        </button>
      )}
    </form>
  );
}
