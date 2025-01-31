import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { categories, subcategories } from "@/globalConsts";
import Link from "next/link";
import SubLinks from "@/components/SubLinks";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Minimercados JS",
  description: "Con pasión by JSquad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SubLinks/>
        {children}
      </body>
    </html>
  );
}
