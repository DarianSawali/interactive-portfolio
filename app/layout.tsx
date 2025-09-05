import "./globals.css";

export const metadata = {
  title: "Darian Sawali",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
