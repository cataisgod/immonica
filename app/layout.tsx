import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./catalog.css";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Immonica — Agenție imobiliară",
  description:
    "Proprietăți atent selectate, în zone căutate, pentru un stil de viață pe măsura ta. Immonica, parte din Inside Global Group.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
