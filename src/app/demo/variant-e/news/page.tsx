"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useCallback, type KeyboardEvent } from "react";
import { ArrowRight, Pin, Minus } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/common/section";
import { Container, CrossNav } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  const shouldReduceMotion = useReducedMotion();
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

  const resolvedTabVariants = shouldReduceMotion
    ? tabVariantsReduced
    : tabVariants;

  return (
    <>
      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[50vh] min-h-[400px] pt-20 flex items-center justify-center overflow-hidden"
        aria-label="교회 소식 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=2071"
          alt="교회 공동체 모임"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.8 }
          }
          className="relative text-center text-white"
        >
          <span className="inline-flex items-center gap-3 text-primary-300 font-medium tracking-[0.3em] mb-4">
            <Minus size={20} aria-hidden="true" />
            NEWS
            <Minus size={20} aria-hidden="true" />
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            교회 소식
          </h1>
          <p className="text-xl text-white/70 font-light tracking-wide">
            성락교회의 소식을 전합니다
          </p>
        </motion.div>

        <div
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30"
          aria-hidden="true"
        />
      </section>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <Section background="white" padding="lg" aria-label="고정 공지">
          <Container size="lg">
            <div className="space-y-4">
              {pinnedNotices.map((notice, i) => (
                <motion.div
                  key={notice.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
                  }
                  className="bg-neutral-50 border border-neutral-100 rounded-3xl p-6 md:p-8 group cursor-pointer hover:shadow-xl transition-all motion-reduce:transition-none relative overflow-hidden"
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-amber-500 rounded-l-3xl"
                    aria-hidden="true"
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-gradient-to-r from-primary-500 to-amber-500 text-white border-0">
                          <Pin size={12} className="mr-1" aria-hidden="true" />
                          고정
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-neutral-100 text-neutral-600"
                        >
                          {categoryLabels[notice.category]}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-neutral-900 text-xl mb-2 group-hover:text-primary-600 transition-colors motion-reduce:transition-none">
                        {notice.title}
                      </h3>
                      <p className="text-sm text-neutral-400">
                        {formatShortDate(notice.createdAt)}
                      </p>
                    </div>
                    <ArrowRight
                      size={24}
                      className="text-neutral-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all motion-reduce:transition-none shrink-0 mt-2"
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Container size="lg">
        <Separator className="bg-neutral-100" aria-hidden="true" />
      </Container>

      {/* Filtered News List */}
      <Section background="white" padding="xl" aria-label="전체 소식">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
                ALL NEWS
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
                전체 소식
              </h2>
            </div>

            {/* Filter Tabs */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all motion-reduce:transition-none duration-300 min-h-[44px] ${
                    activeFilter === tab.key
                      ? "bg-neutral-900 text-white shadow-lg"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredNotices.map((notice, i) => (
                    <motion.div
                      key={notice.id}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, y: 20 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { delay: i * 0.1 }
                      }
                      whileHover={shouldReduceMotion ? undefined : { x: 8 }}
                    >
                      <NewsCard notice={notice} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                    <Pin size={28} className="text-neutral-300" />
                  </div>
                  <p className="text-neutral-400 text-lg">
                    해당 카테고리의 소식이 없습니다
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>

      <CrossNav basePath="/demo/variant-e" currentPage="news" />
    </>
  );
}
