import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Aegis",
  description:
    "Self-Healing Digital Nervous System for Trade, Logistics and Disaster Resilience"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
