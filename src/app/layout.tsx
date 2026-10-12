import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "../index.css";
import ClarityInit from "../components/ClarityInit";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "ugalevaibhav00@gmail.com",
  description: "Portfolio of Vaibhav Ugale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoMono.variable} font-sans antialiased`}>
        <ClarityInit />
        {children}
      </body>
    </html>
  );
}
