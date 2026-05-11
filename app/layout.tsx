import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sina Street Food — Narvik",
  description:
    "Burgere, sushi, pizza og mer — lokal street food i Narvik. Bestill, ring eller finn veien til oss.",
  openGraph: {
    title: "Sina Street Food",
    description: "Street food i Narvik — burgere, sushi, pizza og mer.",
    locale: "nb_NO",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body
        className={`${jakarta.variable} m-0 min-h-screen p-0 font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
