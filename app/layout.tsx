import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Lexend } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import Head from "next/head";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${lexend.variable} antialiased`}
        >
          <Theme
            accentColor="green"
            grayColor="sage"
            radius="large"
            appearance="light"
          >
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </Theme>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
