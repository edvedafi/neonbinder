import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Lexend } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neon Binder",
  description: "Your modern card binding application with a beautiful design system",
  icons: {
    icon: "/convex.svg",
  },
};

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-slate-200 rounded w-48"></div>
        <div className="h-10 bg-slate-200 rounded w-64"></div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.png" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${lexend.variable} antialiased`}
          suppressHydrationWarning
        >
          <Theme
            accentColor="green"
            grayColor="sage"
            radius="large"
            appearance="light"
          >
            <Suspense fallback={<LoadingFallback />}>
              <ConvexClientProvider>{children}</ConvexClientProvider>
            </Suspense>
          </Theme>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
