"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Pin, Calendar, Eye } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/common";
import { initialNotices } from "@/mocks/data/initial";
import { formatDate } from "@/lib/utils";

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

const categoryLabels: Record<string, string> = {
  all: "전체",
  event: "행사",
  weekly: "주보",
  news: "소식",
};

export default function VariantKNewsPage() {
  const rm = useReducedMotion();
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? initialNotices
      : initialNotices.filter((n) => n.category === filter);

  return (
    <>
      {/* Hero */}
      <section
        id="variant-k-content"
        className="relative min-h-[50vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="공지사항"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <Container size="lg" className="relative z-10 flex items-center min-h-[50vh]">
          <motion.div
            initial={rm ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={rm ? { duration: 0 } : { duration: 0.8 }}
            className="py-20"
          >
            <p className="text-white/70 text-sm font-medium tracking-[0.3em] uppercase mb-4">
              NOTICE
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              공지사항
            </h1>
            <p className="text-white/60 text-lg">
              교회 소식과 공지사항을 확인하세요
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Notices */}
      <section aria-label="공지 목록" className="py-24 bg-white">
        <Container size="lg">
          {/* Filter tabs */}
          <motion.div
            variants={makeFadeInUp(10, 0, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === key
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

          {/* Notice list */}
          <div className="divide-y divide-neutral-100">
            {filtered.map((notice, i) => (
              <motion.div
                key={notice.id}
                variants={makeFadeInUp(15, i * 0.06, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="group flex items-start gap-6 py-6 cursor-pointer hover:bg-neutral-50 -mx-4 px-4 rounded-lg transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      {notice.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-900 text-white text-xs">
                          <Pin size={10} aria-hidden="true" />
                          고정
                        </span>
                      )}
                      <span className="inline-block px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 text-xs">
                        {categoryLabels[notice.category] || notice.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors truncate">
                      {notice.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-neutral-400 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} aria-hidden="true" />
                        {formatDate(notice.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={14} aria-hidden="true" />
                        {notice.viewCount}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all flex-shrink-0 mt-4"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-neutral-400">
              <p>해당 카테고리의 공지사항이 없습니다.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
