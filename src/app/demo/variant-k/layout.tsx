import Link from "next/link";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { BasePathProvider } from "@/contexts/base-path-context";

const VARIANT_K_BASE = "/demo/variant-k";

export default function VariantKLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BasePathProvider basePath={VARIANT_K_BASE}>
      <div className="min-h-screen bg-white">
        <Header basePath={VARIANT_K_BASE} />

        {/* Skip Navigation */}
        <a
          href="#variant-k-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-neutral-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
        >
          본문 바로가기
        </a>

        {children}

        <Footer basePath={VARIANT_K_BASE} />

        {/* Back to Demo Selection */}
        <Link
          href="/"
          className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-700 transition-colors motion-reduce:transition-none text-sm font-medium group min-h-[44px] flex items-center"
          aria-label="시안 선택 페이지로 돌아가기"
        >
          <span
            className="group-hover:-translate-x-1 inline-block transition-transform motion-reduce:transition-none"
            aria-hidden="true"
          >
            &larr;
          </span>{" "}
          시안 선택
        </Link>
      </div>
    </BasePathProvider>
  );
}
