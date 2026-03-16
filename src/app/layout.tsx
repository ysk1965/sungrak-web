import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "성락교회",
  description: "신실한 헌신, 긍휼한 사귐 - 성락교회에 오신 것을 환영합니다.",
  keywords: ["성락교회", "교회", "예배", "설교"],
  openGraph: {
    title: "성락교회",
    description: "신실한 헌신, 긍휼한 사귐 - 성락교회에 오신 것을 환영합니다.",
    type: "website",
    locale: "ko_KR",
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
        <a href="#main-content" className="skip-navigation">
          본문으로 건너뛰기
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
