"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useCallback, type KeyboardEvent } from "react";
import {
  ArrowRight,
  Pin,
  Calendar,
  Users,
  Heart,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Container } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { initialNotices } from "@/mocks/data/initial";
import { formatShortDate } from "@/lib/utils";
import type { NoticeCategory } from "@/types";

const filterTabs = [
  { key: "all" as const, label: "전체" },
  { key: "news" as const, label: "소식" },
  { key: "event" as const, label: "행사" },
  { key: "weekly" as const, label: "주보" },
];

type FilterKey = "all" | NoticeCategory;

const categoryLabels: Record<NoticeCategory, string> = {
  news: "소식",
  event: "행사",
  weekly: "주보",
};

const crossNavPages = [
  { key: "about", icon: Heart, label: "교회소개", href: "/demo/variant-g/about" },
  { key: "worship", icon: Calendar, label: "예배안내", href: "/demo/variant-g/worship" },
  { key: "sermons", icon: BookOpen, label: "설교", href: "/demo/variant-g/sermons" },
  { key: "newcomer", icon: Users, label: "새가족", href: "/demo/variant-g/newcomer" },
];

export default function VariantGNewsPage() {
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
        const prevIndex =
          (index - 1 + filterTabs.length) % filterTabs.length;
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

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header variant="transparent" />

      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[50vh] min-h-[400px] overflow-hidden"
        aria-label="교회 소식 히어로"
      >
        <motion.div
          {...(prefersReducedMotion
            ? { initial: { scale: 1 }, animate: { scale: 1 } }
            : {
                initial: { scale: 1.1 },
                animate: { scale: 1 },
                transition: {
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                },
              })}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=2071"
            alt="교회 공동체 모임"
            fill
            className="object-cover opacity-25"
            priority
          />
        </motion.div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }
            className="text-center"
          >
            <Badge className="bg-white/10 text-white/80 border-white/20 mb-4">
              NEWS
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              교회 소식
            </h1>
            <p className="text-white/60 text-lg md:text-xl">
              성락교회의 소식을 전합니다
            </p>
          </motion.div>
        </div>

        {/* Live indicator */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: 0.6, duration: 0.5 }
          }
          className="absolute top-24 right-8 md:right-16 hidden md:block"
          aria-hidden="true"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-white/70">최신 소식</span>
          </div>
        </motion.div>
      </section>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <section
          className="py-12 bg-gradient-to-b from-neutral-900 to-neutral-900"
          aria-label="고정 공지"
        >
          <Container>
            <div className="space-y-4">
              {pinnedNotices.map((notice, i) => (
                <motion.div
                  key={notice.id}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 20 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { delay: i * 0.1 }
                  }
                  className="bg-gradient-to-r from-primary-500/10 to-white/5 border border-primary-500/20 rounded-2xl p-6 md:p-8 group cursor-pointer hover:border-primary-500/40 transition-all relative overflow-hidden"
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-amber-500 rounded-l-2xl"
                    aria-hidden="true"
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-gradient-to-r from-primary-500 to-amber-500 text-white border-0">
                          <Pin
                            size={12}
                            className="mr-1"
                            aria-hidden="true"
                          />
                          고정
                        </Badge>
                        <Badge className="bg-white/10 text-white/60 border-white/20 text-xs">
                          {categoryLabels[notice.category]}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-white text-xl mb-2 group-hover:text-primary-400 transition-colors">
                        {notice.title}
                      </h3>
                      <p className="text-sm text-white/40">
                        <time dateTime={notice.createdAt}>
                          {formatShortDate(notice.createdAt)}
                        </time>
                      </p>
                    </div>
                    <ArrowRight
                      size={24}
                      className="text-white/20 group-hover:text-primary-400 group-hover:translate-x-1 transition-all shrink-0 mt-2"
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Filtered News List */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-neutral-900 to-black"
        aria-label="전체 소식"
      >
        <Container>
          <div className="text-center mb-12">
            <Badge className="bg-white/10 text-white/70 border-white/20 mb-4">
              ALL NEWS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              전체 소식
            </h2>

            {/* Filter Tabs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
              className="inline-flex items-center gap-1 p-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
              role="tablist"
              aria-label="소식 카테고리 필터"
            >
              {filterTabs.map((tab, index) => (
                <button
                  key={tab.key}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={`tab-g-news-${tab.key}`}
                  role="tab"
                  aria-selected={activeFilter === tab.key}
                  aria-controls={`tabpanel-g-news-${tab.key}`}
                  tabIndex={activeFilter === tab.key ? 0 : -1}
                  onClick={() => setActiveFilter(tab.key)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 min-h-[44px] text-sm ${
                    activeFilter === tab.key
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                      : "text-white/60 hover:text-white"
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
              id={`tabpanel-g-news-${activeFilter}`}
              role="tabpanel"
              aria-labelledby={`tab-g-news-${activeFilter}`}
              tabIndex={0}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }
              }
            >
              {filteredNotices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredNotices.map((notice, i) => (
                    <motion.article
                      key={notice.id}
                      initial={
                        prefersReducedMotion
                          ? false
                          : { opacity: 0, y: 20 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { delay: i * 0.1 }
                      }
                      whileHover={
                        prefersReducedMotion ? undefined : { x: 5 }
                      }
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 cursor-pointer group hover:bg-white/10 transition-all"
                      tabIndex={0}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-white/10 text-white/60 border-white/20 text-xs">
                              {categoryLabels[notice.category]}
                            </Badge>
                            {notice.isPinned && (
                              <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 text-xs">
                                고정
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-medium text-white group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                            {notice.title}
                          </h3>
                          <p className="text-white/40 text-sm">
                            <time dateTime={notice.createdAt}>
                              {formatShortDate(notice.createdAt)}
                            </time>
                          </p>
                        </div>
                        <ArrowRight
                          size={18}
                          className="text-white/20 group-hover:text-primary-400 group-hover:translate-x-1 transition-all shrink-0 mt-2"
                          aria-hidden="true"
                        />
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <Pin size={28} className="text-white/30" />
                  </div>
                  <p className="text-white/50 font-medium mb-1">
                    해당 카테고리의 소식이 없습니다
                  </p>
                  <p className="text-white/30 text-sm">
                    다른 카테고리를 선택해 주세요
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* Cross Navigation */}
      <section
        className="py-16 bg-black/50 border-t border-white/5"
        aria-label="다른 페이지 둘러보기"
      >
        <Container>
          <div className="text-center mb-8">
            <p className="text-sm text-primary-400 font-medium tracking-widest mb-2">
              EXPLORE
            </p>
            <h2 className="text-2xl font-bold text-white">더 둘러보기</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {crossNavPages.map((page, i) => (
              <motion.div
                key={page.key}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
              >
                <Link
                  href={page.href}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <page.icon
                      size={24}
                      className="text-primary-400"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {page.label}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-white/30 group-hover:text-primary-400 group-hover:translate-x-1 transition-all"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10" role="contentinfo">
        <Container>
          <div className="text-center space-y-2">
            <p className="text-white/60 text-sm font-medium">성락교회</p>
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} 성락교회. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group border border-white/10 min-w-[44px] min-h-[44px] inline-flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
      >
        <span
          className="group-hover:-translate-x-1 inline-block transition-transform"
          aria-hidden="true"
        >
          &larr;
        </span>{" "}
        시안 선택
      </Link>
    </div>
  );
}
