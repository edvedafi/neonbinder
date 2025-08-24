"use client";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import SetSelector from "../components/SetSelector";
import Image from "next/image";
import NeonButton from "../components/NeonButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse space-y-4 text-center">
        <div className="h-8 bg-slate-200 rounded w-64 mx-auto"></div>
        <div className="h-4 bg-slate-200 rounded w-48 mx-auto"></div>
        <div className="flex gap-4 justify-center">
          <div className="h-10 bg-slate-200 rounded w-24"></div>
          <div className="h-10 bg-slate-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) {
    return <LoadingState />;
  }

  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4 flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Neon Binder" width={40} height={40} />
          <span className="neon-header">Neon Binder</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/design-system">
            <Button variant="outline">
              Design System
            </Button>
          </Link>
          <SignOutButton />
        </div>
      </header>
      <main className="p-8 flex flex-col gap-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4 font-inter">
              Welcome to Neon Binder
            </h1>
            <p className="text-lg text-slate-600 font-lexend mb-6">
              Your modern card binding application with a beautiful design system
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg">
                Get Started
              </Button>
              <Link href="/design-system">
                <Button variant="outline" size="lg">
                  View Design System
                </Button>
              </Link>
            </div>
          </div>
          <SetSelector />
        </div>
      </main>
    </>
  );
}

function SignOutButton() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render until mounted and not loading
  if (!isMounted || isLoading) {
    return (
      <div className="h-10 w-20 bg-slate-200 animate-pulse rounded"></div>
    );
  }

  return (
    <>
      {isAuthenticated && (
        <NeonButton
          cancel
          onClick={() =>
            void signOut().then(() => {
              router.push("/signin");
            })
          }
        >
          Sign out
        </NeonButton>
      )}
    </>
  );
}
