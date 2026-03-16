import Link from "next/link";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { BasePathProvider } from "@/contexts/base-path-context";

const VARIANT_J_BASE = "/demo/variant-j";

export default function VariantJLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BasePathProvider basePath={VARIANT_J_BASE}>
      <div className="min-h-screen bg-stone-950">
        {/* Noise Texture Overlay */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        <Header basePath={VARIANT_J_BASE} variant="transparent" />

        {/* Skip Navigation */}
        <a
          href="#variant-j-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-amber-500 focus:text-stone-950 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
        >
          본문 바로가기
        </a>

        {children}

        <Footer basePath={VARIANT_J_BASE} variant="dark" />

        {/* Back to Demo Selection */}
        <Link
          href="/"
          className="fixed bottom-6 right-6 z-50 bg-amber-500 text-stone-950 px-4 py-2 rounded-full shadow-lg hover:bg-amber-400 transition-colors motion-reduce:transition-none text-sm font-medium group min-h-[44px] flex items-center"
          aria-label="시안 선택 페이지로 돌아가기"
        >
          <span
            className="group-hover:-translate-x-1 inline-block transition-transform motion-reduce:transition-none"
            aria-hidden="true"
          >
            ←
          </span>{" "}
          시안 선택
        </Link>
      </div>
    </BasePathProvider>
  );
}
