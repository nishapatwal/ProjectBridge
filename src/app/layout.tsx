import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProjectBridge — Match Client Problems to Student Software Projects",
  description:
    "An enterprise platform connecting real-world business challenges with ambitious student software engineering squads, guided by industry mentors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen font-sans bg-[#080b11] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
