"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Pin,
  Eye,
  Calendar,
  Newspaper,
  PartyPopper,
  BookOpen,
  Bell,
  ArrowRight,
  Inbox,
  FileText,
} from "lucide-react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Container } from "@/components/common";
import { Section, SectionHeader } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { NewsCard } from "@/components/home";
import { initialNotices } from "@/mocks/data/initial";
import { instantTransition } from "@/lib/animations";
import { formatDate } from "@/lib/utils";
import type { NoticeCategory } from "@/types";

const categoryFilters = [
  { key: "all" as const, label: "전체" },
  { key: "news" as const, label: "소식" },
  { key: "event" as const, label: "행사" },
  { key: "weekly" as const, label: "주보" },
];

const categoryLabels: Record<NoticeCategory, string> = {
  news: "소식",
  event: "행사",
  weekly: "주보",
};

const categoryIcons: Record<NoticeCategory, typeof Newspaper> = {
  news: Newspaper,
  event: PartyPopper,
  weekly: BookOpen,
};

const categoryGradients: Record<NoticeCategory, string> = {
  news: "from-primary-400 to-amber-500",
  event: "from-rose-400 to-pink-500",
  weekly: "from-sky-400 to-blue-500",
};

const categoryBgColors: Record<NoticeCategory, string> = {
  news: "bg-primary-50 text-primary-600",
  event: "bg-rose-50 text-rose-600",
  weekly: "bg-sky-50 text-sky-600",
};

export default function VariantBNewsPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<"all" | NoticeCategory>(
    "all",
  );

  const animateProps = (delay = 0) => ({
    initial: shouldReduceMotion ? false : ({ opacity: 0, y: 20 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
    transition: shouldReduceMotion
      ? instantTransition
      : { delay, duration: 0.6 },
  });

  const pinnedNotices = initialNotices.filter((n) => n.isPinned);
  const filteredNotices = useMemo(() => {
    return initialNotices.filter((notice) => {
      return activeCategory === "all" || notice.category === activeCategory;
    });
  }, [activeCategory]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialNotices.length };
    for (const notice of initialNotices) {
      counts[notice.category] = (counts[notice.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header basePath="/demo/variant-b" />

      {/* Hero Section */}
      <section
        className="relative h-[50vh] md:h-[60vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="교회 소식 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070"
          alt=""
          role="presentation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <Container className="relative z-10 h-full flex items-end pb-12 md:pb-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion ? instantTransition : { duration: 0.6 }
            }
          >
            <Badge className="mb-3 bg-white/20 text-white border-none backdrop-blur-sm">
              News
            </Badge>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300 font-semibold mb-2 text-lg">
              Church News
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
              교회 소식
            </h1>
            <p className="text-lg text-white/70 max-w-xl">
              성락교회의 다양한 소식과 행사를 확인하세요
            </p>
          </motion.div>
        </Container>
        {/* Decorative pills */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-10">
          {["소식", "행사", "주보"].map((label, i) => (
            <motion.span
              key={label}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                shouldReduceMotion
                  ? instantTransition
                  : { delay: 0.8 + i * 0.1 }
              }
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm text-center"
            >
              {label}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Stats Summary Bar */}
      <Section background="white" padding="lg" aria-label="소식 요약">
        <div className="relative z-20 -mt-20">
          <motion.div {...animateProps(0)}>
            <Card className="shadow-xl border-none overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-100">
                  {/* Total */}
                  <div className="p-6 md:p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-3">
                      <FileText size={22} className="text-primary-600" />
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">
                      {initialNotices.length}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">전체 게시물</p>
                  </div>
                  {/* News */}
                  <div className="p-6 md:p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
                      <Newspaper size={22} className="text-primary-500" />
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">
                      {categoryCounts["news"] || 0}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">소식</p>
                  </div>
                  {/* Event */}
                  <div className="p-6 md:p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center mx-auto mb-3">
                      <PartyPopper size={22} className="text-rose-500" />
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">
                      {categoryCounts["event"] || 0}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">행사</p>
                  </div>
                  {/* Weekly */}
                  <div className="p-6 md:p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mx-auto mb-3">
                      <BookOpen size={22} className="text-sky-500" />
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">
                      {categoryCounts["weekly"] || 0}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">주보</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <Section background="white" padding="lg" aria-label="고정 공지">
          <div className="mb-8">
            <motion.div {...animateProps(0)}>
              <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
                <Pin size={12} className="mr-1" />
                Pinned
              </Badge>
              <SectionHeader
                title="고정 공지"
                subtitle="중요한 공지사항을 확인하세요"
              />
            </motion.div>
          </div>
          <div className="space-y-4">
            {pinnedNotices.map((notice, i) => (
              <motion.div
                key={notice.id}
                {...animateProps(i * 0.1)}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              >
                <Card className="shadow-xl hover:shadow-2xl transition-all border-none overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Thumbnail gradient */}
                      <div
                        className={`w-full md:w-48 h-32 md:h-auto bg-gradient-to-br ${categoryGradients[notice.category]} flex items-center justify-center shrink-0`}
                      >
                        {(() => {
                          const Icon = categoryIcons[notice.category];
                          return <Icon size={36} className="text-white/80" />;
                        })()}
                      </div>
                      <div className="flex-1 p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-primary-100 text-primary-600 hover:bg-primary-200">
                            <Pin size={12} className="mr-1" />
                            고정
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={categoryBgColors[notice.category]}
                          >
                            {categoryLabels[notice.category]}
                          </Badge>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2">
                          {notice.title}
                        </h3>
                        <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                          {notice.content}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(notice.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={14} />
                            조회 {notice.viewCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Category Filter + Notice List */}
      <Section background="gray" padding="xl" aria-label="소식 목록">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              All News
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader
              title="전체 소식"
              subtitle="카테고리별로 소식을 확인하세요"
            />
          </motion.div>
        </div>

        {/* Category Filter with Counts */}
        <motion.div
          {...animateProps(0.2)}
          className="flex flex-wrap gap-2 mb-10 justify-center"
        >
          {categoryFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveCategory(filter.key)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === filter.key
                  ? "bg-primary-500 text-white shadow-md"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary-200 hover:text-primary-600"
              }`}
            >
              {filter.label}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === filter.key
                    ? "bg-white/20 text-white"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {categoryCounts[filter.key] || 0}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Enhanced Notice List */}
        {filteredNotices.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredNotices.map((notice, i) => {
              const Icon = categoryIcons[notice.category];
              return (
                <motion.div
                  key={notice.id}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 20 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion
                      ? instantTransition
                      : { delay: i * 0.05 }
                  }
                  whileHover={
                    shouldReduceMotion ? undefined : { y: -3 }
                  }
                >
                  <Card className="shadow-md hover:shadow-xl transition-all border-none overflow-hidden group cursor-pointer">
                    <CardContent className="p-0">
                      <div className="flex">
                        {/* Category gradient thumbnail */}
                        <div
                          className={`w-2 md:w-28 shrink-0 bg-gradient-to-b ${categoryGradients[notice.category]} md:flex items-center justify-center hidden`}
                        >
                          <Icon
                            size={28}
                            className="text-white/80 group-hover:scale-110 transition-transform"
                          />
                        </div>
                        {/* Left color bar on mobile */}
                        <div
                          className={`w-1.5 shrink-0 bg-gradient-to-b ${categoryGradients[notice.category]} md:hidden`}
                        />
                        {/* Content */}
                        <div className="flex-1 p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              {notice.isPinned && (
                                <Badge className="bg-primary-100 text-primary-600 hover:bg-primary-200 text-xs">
                                  <Pin size={10} className="mr-0.5" />
                                  고정
                                </Badge>
                              )}
                              <Badge
                                variant="secondary"
                                className={`text-xs ${categoryBgColors[notice.category]}`}
                              >
                                {categoryLabels[notice.category]}
                              </Badge>
                            </div>
                            <h3 className="text-base md:text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors truncate">
                              {notice.title}
                            </h3>
                            <p className="text-neutral-500 text-sm mt-1 line-clamp-1 hidden md:block">
                              {notice.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-xs md:text-sm text-neutral-400 shrink-0">
                            <span className="flex items-center gap-1">
                              <Calendar size={13} />
                              {formatDate(notice.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye size={13} />
                              {notice.viewCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Enhanced Empty State */
          <motion.div
            {...animateProps(0)}
            className="text-center py-20 max-w-md mx-auto"
          >
            <div className="w-20 h-20 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-6">
              <Inbox size={36} className="text-neutral-300" />
            </div>
            <h3 className="text-xl font-bold text-neutral-700 mb-2">
              게시물이 없습니다
            </h3>
            <p className="text-neutral-500 mb-6">
              해당 카테고리의 소식이 아직 등록되지 않았습니다.
              <br />
              다른 카테고리를 확인해보세요.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
            >
              전체 소식 보기
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </Section>

      {/* Newsletter / Subscribe CTA */}
      <section
        className="relative py-20 overflow-hidden bg-neutral-900"
        aria-label="소식 알림"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-amber-900/10" />
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div {...animateProps(0)}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center">
                  <Bell size={24} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  교회 소식을 놓치지 마세요
                </h2>
              </div>
              <p className="text-white/60 max-w-lg">
                매주 새로운 교회 소식과 행사 안내, 주보를 빠르게 확인하실 수
                있습니다. 성락교회 홈페이지를 자주 방문해주세요.
              </p>
            </motion.div>
            <motion.div {...animateProps(0.2)}>
              <Link
                href="/demo/variant-b"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors group"
              >
                홈으로 돌아가기
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer basePath="/demo/variant-b" />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group"
      >
        <span
          className="group-hover:-translate-x-1 inline-block transition-transform"
          aria-hidden="true"
        >
          ←
        </span>{" "}
        시안 선택
      </Link>
    </div>
  );
}
