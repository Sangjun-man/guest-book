import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header/Header";
import "@vercel/og";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "YAPP 23rd 성과공유회 방명록",
  description: "2월 24일 성과공유회, 4개월간 정말 고생 많으셨어요!!",
  icons: {
    icon: "./icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta property="og:title" content="YAPP 23rd 성과공유회 방명록" />
        <meta
          property="og:description"
          content="2월 24일 성과공유회, 4개월간 정말 고생 많으셨어요!!"
        />
        <meta property="og:image" content="/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YAPP 23rd 성과공유회 방명록" />
        <meta
          name="twitter:description"
          content="2월 24일 성과공유회, 4개월간 정말 고생 많으셨어요!!"
        />
        <meta name="twitter:image" content="/og.png" />
      </head>
      <body>
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
