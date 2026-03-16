"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Eye, Pin, Calendar, ArrowRight } from "lucide-react";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "@/components/home";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { initialNotices } from "@/mocks/data/initial";
import { formatDate } from "@/lib/utils";
import type { Notice, NoticeCategory } from "@/types";

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

const makeFadeInUp = (
  yOffset: number,
  delay: number,
  duration: number,
  reduced: boolean | null,
): Variants => ({
  hidden: reduced ? { opacity: 1 } : { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: reduced ? { duration: 0 } : { duration, delay },
  },
});

export default function VariantINewsPage() {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rm = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

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

  function handleCategoryChange(cat: CategoryFilter) {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_VISIBLE);
  }

  const featuredNotice = useMemo(
    () => allNotices.find((n) => n.isPinned),
    [],
  );

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;
      if (e.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      else if (e.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") nextIndex = 0;
      else if (e.key === "End") nextIndex = tabs.length - 1;

      if (nextIndex !== null) {
        e.preventDefault();
        tabRefs.current[nextIndex]?.focus();
        handleCategoryChange(tabs[nextIndex].key);
      }
    },
    [],
  );

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Paper Texture Overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <Header />

      {/* Hero */}
      <section
        aria-label="교회 소식"
        className="bg-[#FAF8F3] mt-16 md:mt-20 py-16 md:py-24"
      >
        <Container size="xl">
          <motion.p
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            animate="visible"
            className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-6"
          >
            NEWS
          </motion.p>

          <motion.h1
            variants={makeFadeInUp(30, 0.1, 0.8, rm)}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-bold text-neutral-900 leading-tight mb-4"
          >
            교회{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-600">
              소식
            </span>
          </motion.h1>

          <motion.p
            variants={makeFadeInUp(20, 0.2, 0.6, rm)}
            initial="hidden"
            animate="visible"
            className="text-lg text-neutral-500 mb-10 tracking-wide"
          >
            Stay Connected with Sungrak Church
          </motion.p>
        </Container>
      </section>

      {/* Featured Notice */}
      {featuredNotice && (
        <section aria-label="주요 소식" className="bg-white py-12">
          <Container size="xl">
            <motion.div
              variants={makeFadeInUp(30, 0.1, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <article className="relative overflow-hidden rounded-2xl bg-[#FAF8F3] border border-neutral-100 shadow-md">
                <div className="relative z-10 p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <Badge className="bg-primary-50 text-primary-600 border-primary-100">
                      <Pin size={12} className="mr-1" aria-hidden="true" />
                      Featured
                    </Badge>
                    <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200/50">
                      {categoryLabels[featuredNotice.category]}
                    </Badge>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 leading-snug">
                    {featuredNotice.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-5 text-sm text-neutral-500 mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} aria-hidden="true" />
                      <time dateTime={featuredNotice.createdAt}>
                        {formatDate(featuredNotice.createdAt)}
                      </time>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye size={14} aria-hidden="true" />
                      <span aria-label={`조회수 ${featuredNotice.viewCount}`}>
                        {featuredNotice.viewCount.toLocaleString()}회
                      </span>
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className="group border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-300 rounded-full"
                  >
                    자세히 보기
                    <ArrowRight
                      size={16}
                      className="ml-2 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </article>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Category Tabs + News Grid */}
      <section aria-label="교회 소식 목록" className="bg-white py-12 pb-20">
        <Container size="xl">
          {/* Tabs */}
          <motion.div
            variants={makeFadeInUp(20, 0, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
            <div
              role="tablist"
              aria-label="소식 카테고리 필터"
              className="flex flex-wrap gap-2"
            >
              {tabs.map((tab, index) => {
                const isActive = activeCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleCategoryChange(tab.key)}
                    onKeyDown={(e) => handleTabKeyDown(e, index)}
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

          {/* Pinned */}
          {pinnedNotice && (
            <motion.div
              key={`pinned-${pinnedNotice.id}`}
              variants={makeFadeInUp(20, 0.1, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-10"
            >
              <article className="relative rounded-2xl border border-neutral-100 bg-[#FAF8F3] p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-primary-500">
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge className="bg-primary-50 text-primary-600 border-primary-100">
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

          {/* Grid */}
          {visibleNotices.length > 0 ? (
            <div
              role="tabpanel"
              aria-label={`${tabs.find((t) => t.key === activeCategory)?.label ?? "전체"} 소식 목록`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleNotices.map((notice, i) => (
                <motion.div
                  key={notice.id}
                  variants={makeFadeInUp(20, i * 0.08, 0.5, rm)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={rm ? undefined : { y: -5 }}
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
              variants={makeFadeInUp(10, 0.2, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="min-h-[44px] px-8 group hover:border-primary-300 hover:text-primary-600 transition-colors rounded-full border-2"
              >
                더 보기
              </Button>
            </motion.div>
          )}
        </Container>
      </section>

      <Footer />

      {/* Back to Demo Selection */}
      <a
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group min-h-[44px] inline-flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
      >
        <span
          aria-hidden="true"
          className="group-hover:-translate-x-1 inline-block transition-transform"
        >
          &larr;
        </span>{" "}
        시안 선택
      </a>
    </div>
  );
}
