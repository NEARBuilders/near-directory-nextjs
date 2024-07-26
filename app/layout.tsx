import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TagsModal from "@/components/modals/tags";

const manrope = Manrope({ subsets: ["latin"] });

const BASE_URL = "localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "NEAR Landscape",
    template: "%s - NEAR Landscape",
  },
  description: "Generated by create next app",
  metadataBase: new URL(BASE_URL),
  keywords: [
    "NEAR",
    "Landscape",
    "NEAR Landscape",
    "NEAR Ecosystem",
    "NEAR Ecosystem Support",
    "NEAR Community",
    "NEAR Community Support",
    "NEAR DAO",
    "NEAR DAO Support",
  ],
  authors: [
    {
      name: "NEAR Landscape",
      url: BASE_URL,
    },
  ],
  creator: "@near",
  manifest: "/manifest.webmanifest",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${manrope.className} flex min-h-screen flex-col antialiased`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <TagsModal />
      </body>
    </html>
  );
}
