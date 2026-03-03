import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Nunito } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lasting Mind — Your Life Story, Growing",
  description:
    "Record your life stories, memories, and wisdom. Watch your legacy grow into a beautiful tree of experiences.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lasting Mind",
  },
};

export const viewport: Viewport = {
  themeColor: "#3A6B2A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${dmSerif.variable} ${nunito.variable}`}>
        {children}
      </body>
    </html>
  );
}
