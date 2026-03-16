"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useCallback, type KeyboardEvent } from "react";
import { ArrowRight, Pin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/common/section";
import { CrossNav } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "@/components/home";
import { initialNotices } from "@/mocks/data/initial";
import { reducedMotionVariants } from "@/lib/animations";
import { formatShortDate } from "@/lib/utils";
import type { NoticeCategory } from "@/types";

const filterTabs = [
  { key: "all" as const, label: "전체" },
  { key: "news" as const, label: "소식" },
  { key: "event" as const, label: "행사" },
  { key: "weekly" as const, label: "주보" },
];

type FilterKey = "all" | NoticeCategory;

const tabVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const tabVariantsReduced = {
  hidden: reducedMotionVariants.initial,
  visible: reducedMotionVariants.animate,
  exit: reducedMotionVariants.exit,
};

const categoryLabels: Record<NoticeCategory, string> = {
  news: "소식",
  event: "행사",
  weekly: "주보",
};

export default function NewsPage() {
  const prefersReducedMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const handleTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (index + 1) % filterTabs.length;
        setActiveFilter(filterTabs[nextIndex].key);
        tabRefs.current[nextIndex]?.focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (index - 1 + filterTabs.length) % filterTabs.length;
        setActiveFilter(filterTabs[prevIndex].key);
        tabRefs.current[prevIndex]?.focus();
      }
    },
    [],
  );

  const pinnedNotices = initialNotices.filter((n) => n.isPinned);
  const filteredNotices =
    activeFilter === "all"
      ? initialNotices
      : initialNotices.filter((n) => n.category === activeFilter);

  const resolvedTabVariants = prefersReducedMotion
    ? tabVariantsReduced
    : tabVariants;

  return (
    <>
      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[45vh] min-h-[360px] pt-16 md:pt-20 overflow-hidden"
        aria-label="교회 소식 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=2071"
          alt="교회 공동체 모임"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }
            }
            className="text-center"
          >
            <p className="text-sm text-primary-400 font-medium mb-3 tracking-widest">
              NEWS
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              교회 소식
            </h1>
            <p className="text-neutral-200 text-lg">
              성락교회의 소식을 전합니다
            </p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { delay: 0.6, duration: 0.5 }
          }
          className="absolute top-24 right-8 md:right-16 hidden md:block"
          aria-hidden="true"
        >
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-white/90">최신 소식</span>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" className="w-full h-8 md:h-12" preserveAspectRatio="none">
            <path d="M0,60 L0,20 Q720,0 1440,20 L1440,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <Section background="white" padding="lg" aria-label="고정 공지">
          <div className="space-y-4">
            {pinnedNotices.map((notice, i) => (
              <motion.div
                key={notice.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                className="bg-gradient-to-r from-primary-50 to-white border border-primary-200 rounded-2xl p-6 md:p-8 group cursor-pointer hover:shadow-xl transition-all relative overflow-hidden"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-amber-500 rounded-l-2xl" aria-hidden="true" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-gradient-to-r from-primary-500 to-amber-500 text-white hover:from-primary-600 hover:to-amber-600 border-0">
                        <Pin size={12} className="mr-1" aria-hidden="true" />
                        고정
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {categoryLabels[notice.category]}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-neutral-900 text-xl mb-2 group-hover:text-primary-600 transition-colors">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {formatShortDate(notice.createdAt)}
                    </p>
                  </div>
                  <ArrowRight
                    size={24}
                    className="text-neutral-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all shrink-0 mt-2"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Filtered News List */}
      <Section background="gray" padding="xl" aria-label="전체 소식">
        <div className="text-center mb-10">
          <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
            ALL NEWS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
            전체 소식
          </h2>

          {/* Filter Tabs */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="inline-flex items-center gap-1 p-1.5 bg-neutral-100 rounded-full"
            role="tablist"
            aria-label="소식 카테고리 필터"
          >
            {filterTabs.map((tab, index) => (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                id={`tab-news-${tab.key}`}
                role="tab"
                aria-selected={activeFilter === tab.key}
                aria-controls={`tabpanel-news-${tab.key}`}
                tabIndex={activeFilter === tab.key ? 0 : -1}
                onClick={() => setActiveFilter(tab.key)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 min-h-[44px] ${
                  activeFilter === tab.key
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            id={`tabpanel-news-${activeFilter}`}
            role="tabpanel"
            aria-labelledby={`tab-news-${activeFilter}`}
            tabIndex={0}
            variants={resolvedTabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredNotices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNotices.map((notice, i) => (
                  <motion.div
                    key={notice.id}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 20 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { delay: i * 0.1 }
                    }
                    whileHover={prefersReducedMotion ? {} : { x: 5 }}
                  >
                    <NewsCard notice={notice} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-neutral-200 flex items-center justify-center mx-auto mb-4">
                  <Pin size={28} className="text-neutral-400" />
                </div>
                <p className="text-neutral-500 font-medium mb-1">
                  해당 카테고리의 소식이 없습니다
                </p>
                <p className="text-neutral-400 text-sm">
                  다른 카테고리를 선택해 주세요
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Section>

      <CrossNav basePath="/demo/variant-c" currentPage="news" />
    </>
  );
}
