import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SafeClerkProvider } from '@/components/providers/safe-clerk-provider';
import { ThemeProvider } from '@/components/theme/theme-provider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FulQrun - Sales Operations Platform",
  description: "PEAK + MEDDPICC embedded sales operations platform",
  manifest: "/manifest.json",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SafeClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        >
          <ThemeProvider
            defaultTheme="light"
            storageKey="fulqrun-ui-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SafeClerkProvider>
  );
}
