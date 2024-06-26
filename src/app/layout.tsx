import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Convenience store",
  description: "Convenience store app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              border: "2px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
            },
          }}
        />
      </body>
    </html>
  );
}
