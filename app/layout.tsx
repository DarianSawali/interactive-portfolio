import "./globals.css";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Darian Sawali",
  description: "Portfolio of Darian Sawali, a software developer based in Vancouver, BC.",
  openGraph: {
    title: "Darian Sawali | Software Developer",
    description: "Selected projects, skills, and contact information for Darian Sawali.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Darian Sawali | Software Developer",
    description: "Selected projects, skills, and contact information for Darian Sawali.",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetbrainsMono.className} bg-black text-white`}>{children}</body>
    </html>
  );
}
