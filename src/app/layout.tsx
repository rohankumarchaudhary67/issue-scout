import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Issue Scout | GSOC Issue Tracker",
  description: "GSoC Issue Tracker is a simple, open-source tool for managing project tasks, tracking issues, supporting collaboration, and real-time updates for open-source contributions and development.",
  icons: {
    icon: "/logo/logo-wbg.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
