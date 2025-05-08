"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">
          {isVerifying ? "Verify Your Email" : "Login to BlueSky"}
        </h2>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">
              {isVerifying ? "Email" : "Username or Email"}
            </Label>
            <Input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={isVerifying || countdown !== null}
              required
            />
          </div>

          {isVerifying ? (
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                disabled={countdown !== null}
                required
              />
              <Button
                type="button"
                variant="link"
                onClick={handleBackToLogin}
                className="p-0 h-auto"
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={countdown !== null}
                required
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={countdown !== null}
          >
            {countdown !== null
              ? `Please wait ${countdown}s`
              : isVerifying
              ? "Verify"
              : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
