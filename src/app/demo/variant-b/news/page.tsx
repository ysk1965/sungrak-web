"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Pin, Eye, Calendar } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

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

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <Section background="white" padding="lg" aria-label="고정 공지">
          <div className="relative z-20 -mt-20">
            {pinnedNotices.map((notice, i) => (
              <motion.div
                key={notice.id}
                {...animateProps(i * 0.1)}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              >
                <Card className="shadow-xl hover:shadow-2xl transition-all border-none border-l-4 border-l-primary-500 overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-primary-100 text-primary-600 hover:bg-primary-200">
                            <Pin size={12} className="mr-1" />
                            고정
                          </Badge>
                          <Badge variant="secondary">
                            {categoryLabels[notice.category]}
                          </Badge>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2">
                          {notice.title}
                        </h3>
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

        {/* Category Filter */}
        <motion.div
          {...animateProps(0.2)}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {categoryFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveCategory(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === filter.key
                  ? "bg-primary-500 text-white shadow-md"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary-200 hover:text-primary-600"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Notice List */}
        {filteredNotices.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredNotices.map((notice, i) => (
              <motion.div
                key={notice.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? instantTransition : { delay: i * 0.1 }
                }
              >
                <NewsCard notice={notice} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-neutral-500 text-lg">
              해당 카테고리의 소식이 없습니다
            </p>
          </div>
        )}
      </Section>

      <Footer />

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
