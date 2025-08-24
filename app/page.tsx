"use client";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import SetSelector from "../components/SetSelector";
import Image from "next/image";
import NeonButton from "../components/NeonButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
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
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();
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
