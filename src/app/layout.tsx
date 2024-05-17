import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pokemon App",
  description: "Pokemon App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="min-h-screen bg-background antialiased"
    >
      <body
        className={cn(
          "relative flex min-h-screen flex-col font-sans",
          fontSans.variable
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
