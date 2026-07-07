import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pasta Life Experience | Graffiti Pasta",
  description:
    "A full Pasta-verse with music, art, merch & more.",
  openGraph: {
    title: "Pasta Life Experience",
    description: "Music. Art. Merch. Rewards. Games. All things Graffiti Pasta.",
    siteName: "Graffiti Pasta",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pasta Life Experience | Graffiti Pasta",
    description: "A full Pasta-verse with music, art, merch & more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} h-full`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full antialiased" style={{ backgroundColor: "#0d0d0d", color: "#f5f5f5" }}>
        {children}
      </body>
    </html>
  );
}
