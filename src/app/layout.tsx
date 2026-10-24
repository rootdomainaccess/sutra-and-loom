import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sutra & Loom | Minimalist Indian Handloom & Ethnic Wear",
  description: "Exquisite handwoven sarees, organic Chanderi dresses, and regal festive lehengas crafted by master artisans.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F0ECE3] text-[#596E79] min-h-screen flex flex-col antialiased selection:bg-[#C7B198] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
