import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import "../styles/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Juan Camilo Ramírez Rátiva",
  description:
    "I am a dedicated Fullstack Developer with extensive expertise in AWS, Python, and TypeScript, committed to delivering innovative, efficient, and high-quality software solutions. I excel in applying advanced design principles and industry best practices to drive impactful results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${montserratAlternates.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
