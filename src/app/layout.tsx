import type { Metadata } from "next";
import "../index.css";
import ClarityInit from "../components/ClarityInit";

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
      <body>
        <ClarityInit />
        {children}
      </body>
    </html>
  );
}
