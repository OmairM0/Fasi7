import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const suisseIntl = localFont({
  src: [
    {
      path: "../assets//fonts/SuisseIntl/Suisse_Intl_Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets//fonts/SuisseIntl/SuisseIntl-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets//fonts/SuisseIntl/Suisse_Intl_Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets//fonts/SuisseIntl/Suisse_Intl_Bold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-suisse",
  display: "swap",
});

export const metadata: Metadata = {
  title: "فصيح",
  description: "موقع يجمع المهتمين بالعربية الفصحى",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className={`${suisseIntl.variable} antialiased`}>{children}</body>
    </html>
  );
}
