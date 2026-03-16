"use client";

import { useState, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Eye, Pin } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/common";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "@/components/home";
import { initialNotices } from "@/mocks/data/initial";
import { formatDate } from "@/lib/utils";
import type { Notice, NoticeCategory } from "@/types";

/* ------------------------------------------------------------------ */
/*  Additional mock notices                                           */
/* ------------------------------------------------------------------ */

const additionalNotices: Notice[] = [
  {
    id: "notice_004",
    title: "2024년 교회 사역 계획 안내",
    content: "<p>2024년 교회 사역 계획을 안내드립니다.</p>",
    category: "news",
    isPinned: false,
    viewCount: 450,
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "notice_005",
    title: "2월 주보",
    content: "<p>2월 첫째주 주보입니다.</p>",
    category: "weekly",
    isPinned: false,
    viewCount: 290,
    createdAt: "2024-02-04T08:00:00Z",
    updatedAt: "2024-02-04T08:00:00Z",
  },
  {
    id: "notice_006",
    title: "봄 바자회 안내",
    content: "<p>봄 바자회가 3월에 진행됩니다.</p>",
    category: "event",
    isPinned: false,
    viewCount: 380,
    createdAt: "2024-02-10T10:00:00Z",
    updatedAt: "2024-02-10T10:00:00Z",
  },
  {
    id: "notice_007",
    title: "새벽기도회 특별 기간 안내",
    content: "<p>사순절 특별 새벽기도회를 안내드립니다.</p>",
    category: "news",
    isPinned: false,
    viewCount: 210,
    createdAt: "2024-02-15T09:00:00Z",
    updatedAt: "2024-02-15T09:00:00Z",
  },
  {
    id: "notice_008",
    title: "부활절 특별예배 안내",
    content: "<p>부활절 특별예배가 있습니다.</p>",
    category: "event",
    isPinned: false,
    viewCount: 520,
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "notice_009",
    title: "3월 주보",
    content: "<p>3월 첫째주 주보입니다.</p>",
    category: "weekly",
    isPinned: false,
    viewCount: 180,
    createdAt: "2024-03-03T08:00:00Z",
    updatedAt: "2024-03-03T08:00:00Z",
  },
  {
    id: "notice_010",
    title: "선교헌금 보고",
    content: "<p>2024년 1분기 선교헌금 사용 보고입니다.</p>",
    category: "news",
    isPinned: false,
    viewCount: 340,
    createdAt: "2024-03-10T09:00:00Z",
    updatedAt: "2024-03-10T09:00:00Z",
  },
];

const allNotices: Notice[] = [...initialNotices, ...additionalNotices];

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const categoryLabels: Record<NoticeCategory, string> = {
  news: "소식",
  event: "행사",
  weekly: "주보",
};

type CategoryFilter = "all" | NoticeCategory;

const tabs: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "news", label: "소식" },
  { key: "event", label: "행사" },
  { key: "weekly", label: "주보" },
];

const INITIAL_VISIBLE = 6;

/* ------------------------------------------------------------------ */
/*  Page Component                                                    */
/* ------------------------------------------------------------------ */

export default function VariantDNewsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  /* ----- parallax ----- */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.15],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 60],
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    shouldReduceMotion ? [1, 1] : [1, 0],
  );

  /* ----- derived data ----- */
  const filteredNotices = useMemo(() => {
    if (activeCategory === "all") return allNotices;
    return allNotices.filter((n) => n.category === activeCategory);
  }, [activeCategory]);

  const pinnedNotice = useMemo(
    () => filteredNotices.find((n) => n.isPinned),
    [filteredNotices],
  );

  const unpinnedNotices = useMemo(
    () => filteredNotices.filter((n) => !n.isPinned),
    [filteredNotices],
  );

  const visibleNotices = unpinnedNotices.slice(0, visibleCount);
  const hasMore = unpinnedNotices.length > visibleCount;

  /* ----- handlers ----- */
  function handleCategoryChange(cat: CategoryFilter) {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_VISIBLE);
  }

  function handleLoadMore() {
    setVisibleCount((prev) => prev + 6);
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                          */
  /* ---------------------------------------------------------------- */

  return (
    <>
      {/* ============================================================ */}
      {/* Hero Banner                                                  */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative h-[35vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="교회 소식 히어로 배너"
      >
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <Image
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/60 to-neutral-900/40" />
        </motion.div>

        {/* Decorative radial glow */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldReduceMotion ? 0.1 : 0.1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.6 }}
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.25) 0%, transparent 50%)",
            }}
          />
        </div>

        <Container className="relative z-10 h-full flex flex-col justify-center">
          <motion.div style={{ y: textY, opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            >
              <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
                NEWS
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 0.3, duration: 0.8 }
              }
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              교회{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                소식
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }}
              className="text-base md:text-lg text-white/70 mt-3 max-w-xl"
            >
              성락교회의 다양한 소식과 행사를 확인하세요.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* Category Tabs + Pinned Notice + News Grid                    */}
      {/* ============================================================ */}
      <Section background="white" padding="xl" aria-label="교회 소식 목록">
        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
          className="mb-10"
        >
          <div
            role="tablist"
            aria-label="소식 카테고리 필터"
            className="flex flex-wrap gap-2"
          >
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(tab.key)}
                  className={`
                    px-5 py-2.5 rounded-full text-sm font-medium
                    transition-all duration-200 min-h-[44px] min-w-[44px]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
                    ${
                      isActive
                        ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Pinned Notice */}
        {pinnedNotice && (
          <motion.div
            key={`pinned-${pinnedNotice.id}`}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.15 }}
            className="mb-10"
          >
            <article className="relative rounded-2xl border border-neutral-100 bg-white p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-primary-500">
              {/* Glass morphism accent */}
              <div
                className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary-50 to-transparent rounded-bl-full opacity-60"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className="bg-primary-100 text-primary-600 hover:bg-primary-100">
                    <Pin size={12} className="mr-1" aria-hidden="true" />
                    고정
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {categoryLabels[pinnedNotice.category]}
                  </Badge>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3 leading-snug">
                  {pinnedNotice.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                  <time dateTime={pinnedNotice.createdAt}>
                    {formatDate(pinnedNotice.createdAt)}
                  </time>
                  <span className="flex items-center gap-1">
                    <Eye size={14} aria-hidden="true" />
                    <span aria-label={`조회수 ${pinnedNotice.viewCount}`}>
                      {pinnedNotice.viewCount.toLocaleString()}
                    </span>
                  </span>
                </div>
              </div>
            </article>
          </motion.div>
        )}

        {/* News Grid */}
        {visibleNotices.length > 0 ? (
          <div
            role="tabpanel"
            aria-label={`${tabs.find((t) => t.key === activeCategory)?.label ?? "전체"} 소식 목록`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleNotices.map((notice, i) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.08 }
                }
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              >
                <NewsCard notice={notice} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-neutral-400 text-lg">
              해당 카테고리의 소식이 없습니다.
            </p>
          </motion.div>
        )}

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            className="flex justify-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              className="min-h-[44px] px-8 group hover:border-primary-300 hover:text-primary-600 transition-colors"
            >
              더 보기
            </Button>
          </motion.div>
        )}
      </Section>
    </>
  );
}
