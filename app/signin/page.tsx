"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatch by ensuring component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="flex flex-col gap-8 w-96 mx-auto h-screen justify-center items-center">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-48 mb-8"></div>
          <div className="space-y-4">
            <div className="h-10 bg-slate-200 rounded"></div>
            <div className="h-10 bg-slate-200 rounded"></div>
            <div className="h-10 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      formData.set("flow", flow);
      
      await signIn("password", formData);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 font-inter">
            {flow === "signIn" ? "Sign in to your account" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-lexend">
            Log in to see the numbers
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={flow === "signIn" ? "current-password" : "new-password"}
                required
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600 font-lexend">
                Error {flow === "signIn" ? "signing in" : "signing up"}: {error}
              </p>
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              loading={isLoading}
            >
              {flow === "signIn" ? "Sign in" : "Sign up"}
            </Button>
          </div>

          <div className="text-center">
            <span className="text-sm text-slate-600 font-lexend">
              {flow === "signIn"
                ? "Don't have an account? "
                : "Already have an account? "}
            </span>
            <button
              type="button"
              className="text-sm font-medium text-green-500 hover:text-green-400 transition-colors font-lexend"
              onClick={() => {
                setFlow(flow === "signIn" ? "signUp" : "signIn");
                setError(null);
              }}
              disabled={isLoading}
            >
              {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
