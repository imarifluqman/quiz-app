import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "INFINITY CODE",
  description: "Quiz App INFINITY CODE-Quiz-App",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "utf-8",
  author: "INFINITY CODE",
  keywords: "INFINITY CODE, Quiz App, Quiz, App, Infinity Code",
  creator: "INFINITY CODE",
  publisher: "INFINITY CODE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
