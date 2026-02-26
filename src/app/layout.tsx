import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mario Claudius Hadinata | Full Stack Developer",
  description: "Portfolio website showcasing web development projects and skills. Experienced in React, Next.js, TypeScript, and modern web technologies.",
  keywords: ["web developer", "full stack", "react", "next.js", "typescript", "portfolio"],
  authors: [{ name: "Mario Claudius Hadinata" }],
  openGraph: {
    title: "Mario Claudius Hadinata | Full Stack Developer",
    description: "Portfolio website showcasing web development projects and skills.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
