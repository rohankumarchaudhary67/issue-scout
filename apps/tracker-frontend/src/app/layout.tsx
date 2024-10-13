import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import RecoilProvider from "@/providers/recoil-provider";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Issue Scout | GSoC Issue Tracker",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RecoilProvider>
            {children}
            <Toaster />
          </RecoilProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
