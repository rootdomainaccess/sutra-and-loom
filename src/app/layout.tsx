import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Factory Asset Engine | Sutra & Loom",
  description: "Atomic asset ingestion and sequential SKU renaming pipeline for handloom and ethnic wear enterprises.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-factory-900 text-slate-100 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
