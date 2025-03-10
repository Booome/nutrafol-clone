import type { Metadata } from "next";
import { Damion } from "next/font/google";
import { Header } from "../components/Header";
import "./globals.css";

const damion = Damion({
  variable: "--font-damion",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${damion.variable} mx-auto flex w-full max-w-[1600px] flex-col antialiased bg-base-200`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
