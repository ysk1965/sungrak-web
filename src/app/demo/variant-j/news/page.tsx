"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Pin,
  Calendar,
  Youtube,
  Instagram,
  Facebook,
  Eye,
  Tag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { initialNotices } from "@/mocks/data/initial";
import { formatDate } from "@/lib/utils";
import type { Notice, NoticeCategory } from "@/types";

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

const makeFadeInX = (
  xOffset: number,
  delay: number,
  duration: number,
  reduced: boolean | null,
): Variants => ({
  hidden: reduced ? { opacity: 1 } : { opacity: 0, x: xOffset },
  visible: {
    opacity: 1,
    x: 0,
    transition: reduced ? { duration: 0 } : { duration, delay },
  },
});

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
];

const allNotices: Notice[] = [...initialNotices, ...additionalNotices];

const categoryLabels: Record<NoticeCategory, string> = {
  news: "소식",
  event: "행사",
  weekly: "주보",
};

const categoryColors: Record<NoticeCategory, string> = {
  news: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  event: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  weekly: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

type CategoryFilter = "all" | NoticeCategory;

const tabs: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "news", label: "소식" },
  { key: "event", label: "행사" },
  { key: "weekly", label: "주보" },
];

const INITIAL_VISIBLE = 6;

const socialLinks = [
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
];

export default function VariantJNewsPage() {
  const rm = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filteredNotices = useMemo(() => {
    if (activeCategory === "all") return allNotices;
    return allNotices.filter((n) => n.category === activeCategory);
  }, [activeCategory]);

  const pinnedNotices = useMemo(
    () => filteredNotices.filter((n) => n.isPinned),
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

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;
      if (e.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      else if (e.key === "ArrowLeft")
        nextIndex = (index - 1 + tabs.length) % tabs.length;
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
    <>
      {/* ── Hero Banner (50vh) ── */}
      <section
        id="main-content"
        aria-label="교회 소식"
        className="relative h-[50vh] min-h-[400px] mt-16 md:mt-20 overflow-hidden flex items-center"
      >
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070"
          alt=""
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/70 to-stone-950/90"
        />

        <Container size="xl" className="relative z-10">
          <motion.div
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            animate="visible"
          >
            <span className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase">
              NEWS
            </span>
          </motion.div>

          <motion.h1
            variants={makeFadeInUp(30, 0.1, 0.8, rm)}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mt-4 mb-4"
          >
            교회{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              소식
            </span>
          </motion.h1>

          <motion.p
            variants={makeFadeInUp(20, 0.2, 0.6, rm)}
            initial="hidden"
            animate="visible"
            className="text-lg text-stone-300 tracking-wide max-w-lg"
          >
            성락교회의 최신 소식과 행사 안내를 확인하세요
          </motion.p>
        </Container>
      </section>

      {/* ── Pinned Notices ── */}
      {pinnedNotices.length > 0 && (
        <section aria-label="주요 공지" className="bg-stone-950 py-12">
          <Container size="xl">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-6"
            >
              PINNED
            </motion.p>

            <div className="space-y-4">
              {pinnedNotices.map((notice, i) => (
                <motion.article
                  key={`pinned-${notice.id}`}
                  variants={makeFadeInX(-20, i * 0.1, 0.5, rm)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 md:p-8 border-l-4 border-l-amber-500 hover:border-amber-500/30 transition-colors group cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                          <Pin size={12} className="mr-1" aria-hidden="true" />
                          고정
                        </Badge>
                        <Badge className={categoryColors[notice.category]}>
                          {categoryLabels[notice.category]}
                        </Badge>
                      </div>

                      <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug group-hover:text-amber-400 transition-colors">
                        {notice.title}
                      </h2>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} aria-hidden="true" />
                          <time dateTime={notice.createdAt}>
                            {formatDate(notice.createdAt)}
                          </time>
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} aria-hidden="true" />
                          <span aria-label={`조회수 ${notice.viewCount}`}>
                            {notice.viewCount.toLocaleString()}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-amber-400 text-sm font-medium shrink-0">
                      자세히 보기
                      <ArrowRight
                        size={14}
                        className="ml-1 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Category Filter ── */}
      <section
        aria-label="카테고리 필터"
        className="bg-stone-900 border-b border-stone-800 py-4 sticky top-16 md:top-20 z-30"
      >
        <Container size="xl">
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
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900
                    ${
                      isActive
                        ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/25"
                        : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── All Notices List ── */}
      <section aria-label="교회 소식 목록" className="bg-stone-900 py-12 pb-20">
        <Container size="xl">
          {visibleNotices.length > 0 ? (
            <div
              role="tabpanel"
              aria-label={`${tabs.find((t) => t.key === activeCategory)?.label ?? "전체"} 소식 목록`}
              className="space-y-4"
            >
              {visibleNotices.map((notice, i) => (
                <motion.article
                  key={notice.id}
                  variants={makeFadeInUp(20, i * 0.06, 0.5, rm)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-5 md:p-6 hover:border-amber-500/30 hover:translate-x-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge className={categoryColors[notice.category]}>
                          <Tag
                            size={12}
                            className="mr-1"
                            aria-hidden="true"
                          />
                          {categoryLabels[notice.category]}
                        </Badge>
                      </div>

                      <h3 className="font-bold text-white text-lg leading-snug truncate group-hover:text-amber-400 transition-colors">
                        {notice.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 mt-2">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} aria-hidden="true" />
                          <time dateTime={notice.createdAt}>
                            {formatDate(notice.createdAt)}
                          </time>
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} aria-hidden="true" />
                          <span aria-label={`조회수 ${notice.viewCount}`}>
                            {notice.viewCount.toLocaleString()}
                          </span>
                        </span>
                      </div>
                    </div>

                    <ArrowRight
                      size={18}
                      className="text-stone-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-stone-500 text-lg">
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
                className="min-h-[44px] px-8 group border-stone-700 text-stone-300 hover:border-amber-500/50 hover:text-amber-400 transition-colors rounded-full border-2 bg-transparent"
              >
                더 보기
              </Button>
            </motion.div>
          )}
        </Container>
      </section>

      {/* ── Subscribe CTA ── */}
      <section aria-label="소셜 미디어" className="bg-stone-950 py-20">
        <Container size="xl">
          <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-8 md:p-12 text-center">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3"
            >
              STAY CONNECTED
            </motion.p>

            <motion.h2
              variants={makeFadeInUp(20, 0.1, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              소식을 놓치지 마세요
            </motion.h2>

            <motion.p
              variants={makeFadeInUp(15, 0.2, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-stone-400 max-w-md mx-auto mb-10 leading-relaxed"
            >
              성락교회의 SNS를 팔로우하시면 최신 소식과 예배 영상,
              은혜로운 콘텐츠를 가장 빠르게 만나보실 수 있습니다.
            </motion.p>

            <motion.div
              variants={makeFadeInUp(10, 0.3, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4"
            >
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={`${social.label} 페이지로 이동`}
                  className="w-14 h-14 rounded-full bg-stone-700/50 border border-stone-600/50 flex items-center justify-center text-stone-400 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-400 transition-all duration-300"
                >
                  <social.icon size={22} aria-hidden="true" />
                </Link>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
