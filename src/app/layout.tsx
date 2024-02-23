import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header/Header";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "YAPP 23th 성과공유회 방명록",
  description: "4개월간 정말 고생 많으셨습니다. 끝이다~~",
  icons: {
    icon: "./icon.png",
  },
  openGraph: {
    images: "./opengraph-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
