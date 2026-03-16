"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Section } from "@/components/common/section";
import { PageHero } from "@/components/variant-a/page-hero";
import { Breadcrumb } from "@/components/variant-a/breadcrumb";
import { useBasePath } from "@/contexts/base-path-context";
import { NewsCard } from "@/components/home/news-card";
import { Button } from "@/components/ui/button";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import { initialNotices } from "@/mocks/data/initial";
import type { NoticeCategory } from "@/types";

const allNotices = [
  ...initialNotices,
  ...initialNotices.map((n, i) => ({ ...n, id: n.id + "_dup_" + i })),
];

type FilterKey = "all" | NoticeCategory;

const categoryTabs: { key: FilterKey; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "event", label: "행사" },
  { key: "weekly", label: "주보" },
  { key: "news", label: "소식" },
];

export default function VariantANewsPage() {
  const basePath = useBasePath();
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<FilterKey>("all");

  const filteredNotices = (() => {
    const base =
      activeCategory === "all"
        ? allNotices
        : allNotices.filter((n) => n.category === activeCategory);

    // Sort pinned items first
    return [...base].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  })();

  return (
    <div className="min-h-screen bg-white">
      <Header variant="transparent" basePath={basePath} />

      {/* Page Hero */}
      <PageHero
        title="교회 소식"
        subtitle="성락교회의 소식을 전합니다"
        backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=2071"
        backgroundAlt="교회 공동체 모임"
      />

      {/* Breadcrumb */}
      <Section background="white" padding="sm">
        <Breadcrumb items={[{ label: "소식" }]} />
      </Section>

      {/* Category Tabs + News Grid */}
      <Section background="white" padding="xl" aria-label="교회 소식 목록">
        {/* Category Tabs */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          role="tablist"
          aria-label="소식 분류 필터"
        >
          {categoryTabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeCategory === tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 min-h-[44px] ${
                activeCategory === tab.key
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }
            }
          >
            {filteredNotices.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotices.map((notice) => (
                  <StaggerItem key={notice.id}>
                    <NewsCard notice={notice} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="text-center py-16">
                <p className="text-neutral-500">
                  해당 카테고리의 소식이 없습니다
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination UI (visual only) */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <Button
            variant="outline"
            className="min-h-[44px] min-w-[44px] p-0 bg-neutral-100 text-neutral-600 border-none hover:bg-neutral-200"
            aria-label="이전 페이지"
          >
            <ChevronLeft size={18} />
          </Button>
          {[1, 2, 3].map((page) => (
            <Button
              key={page}
              variant="outline"
              className={`min-h-[44px] min-w-[44px] p-0 border-none font-medium ${
                page === 1
                  ? "bg-primary-500 text-white hover:bg-primary-600"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            className="min-h-[44px] min-w-[44px] p-0 bg-neutral-100 text-neutral-600 border-none hover:bg-neutral-200"
            aria-label="다음 페이지"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </Section>

      <Footer basePath={basePath} />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm font-medium min-h-[44px] flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
      >
        ← 시안 선택
      </Link>
    </div>
  );
}
