import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LumpSum Pro - Engineering Project Management",
  description:
    "Manage lump sum engineering projects, track budgets, milestones, and change orders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
        {children}
      </body>
    </html>
  );
}
