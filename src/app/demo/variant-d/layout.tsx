"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { BasePathProvider } from "@/contexts/base-path-context";

const VARIANT_D_BASE = "/demo/variant-d";

export default function VariantDLayout({ children }: { children: ReactNode }) {
  return (
    <BasePathProvider basePath={VARIANT_D_BASE}>
    <div className="min-h-screen bg-white">
      <Header basePath={VARIANT_D_BASE} />

      <main>{children}</main>

      <Footer basePath={VARIANT_D_BASE} />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group min-h-[44px] flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
      >
        <span className="group-hover:-translate-x-1 motion-reduce:transition-none inline-block transition-transform">
          ←
        </span>{" "}
        시안 선택
      </Link>
    </div>
    </BasePathProvider>
  );
}
