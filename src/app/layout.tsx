import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../index.css";
import ClarityInit from "../components/ClarityInit";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Vaibhav Ugale — Software Engineer",
  description: "Portfolio of Vaibhav Ugale, Software Engineer specializing in scalable web & mobile apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased text-[#2f3437] bg-white`}>
        <ClarityInit />
        {children}
      </body>
    </html>
  );
}
