"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
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
  FadeInUp,
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

  const reducedTransition = { duration: 0 };

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

      {/* Category Tabs */}
      <Section background="gray" padding="lg" aria-label="소식 분류">
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.4),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.3),transparent_50%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion ? reducedTransition : { duration: 0.6 }
          }
          className="relative"
        >
          <div
            className="flex flex-wrap items-center justify-center gap-3"
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
                    : "bg-white text-neutral-600 hover:bg-neutral-100 shadow-sm"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* News Grid */}
      <Section background="white" padding="xl" aria-label="교회 소식 목록">
        {/* Results count */}
        <FadeInUp>
          <p className="text-sm text-neutral-500 mb-8 text-center">
            총{" "}
            <span className="font-semibold text-primary-600">
              {filteredNotices.length}
            </span>
            건의 소식
          </p>
        </FadeInUp>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
            transition={
              shouldReduceMotion ? reducedTransition : { duration: 0.3 }
            }
          >
            {filteredNotices.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotices.map((notice, i) => (
                  <StaggerItem key={notice.id}>
                    <motion.div
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={
                        shouldReduceMotion
                          ? reducedTransition
                          : { duration: 0.5, delay: (i % 3) * 0.1 }
                      }
                    >
                      <NewsCard notice={notice} />
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="text-center py-20">
                <motion.div
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={
                    shouldReduceMotion
                      ? reducedTransition
                      : { duration: 0.5, ease: "easeOut" }
                  }
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-neutral-100 mb-6"
                >
                  <Newspaper
                    size={36}
                    className="text-neutral-400"
                    aria-hidden="true"
                  />
                </motion.div>
                <p className="text-neutral-500 text-lg font-medium mb-2">
                  해당 카테고리의 소식이 없습니다
                </p>
                <p className="text-neutral-400 text-sm">
                  다른 카테고리를 선택해 보세요
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* Pagination */}
      <Section background="gray" padding="lg" aria-label="페이지 이동">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion ? reducedTransition : { duration: 0.5 }
          }
          className="flex items-center justify-center gap-2"
        >
          <Button
            variant="outline"
            className="min-h-[44px] min-w-[44px] p-0 bg-white text-neutral-600 border-none hover:bg-neutral-100 shadow-sm"
            aria-label="이전 페이지"
          >
            <ChevronLeft size={18} />
          </Button>
          {[1, 2, 3].map((page) => (
            <Button
              key={page}
              variant="outline"
              className={`min-h-[44px] min-w-[44px] p-0 border-none font-medium shadow-sm ${
                page === 1
                  ? "bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            className="min-h-[44px] min-w-[44px] p-0 bg-white text-neutral-600 border-none hover:bg-neutral-100 shadow-sm"
            aria-label="다음 페이지"
          >
            <ChevronRight size={18} />
          </Button>
        </motion.div>
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
