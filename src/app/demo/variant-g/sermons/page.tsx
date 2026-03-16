"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useCallback, type KeyboardEvent } from "react";
import {
  Play,
  BookOpen,
  ArrowRight,
  Calendar,
  Users,
  Heart,
  Eye,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Container } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { initialSermons } from "@/mocks/data/initial";
import { formatDate } from "@/lib/utils";
import type { PlaylistType } from "@/types";

const filterTabs = [
  { key: "all" as const, label: "전체", icon: BookOpen },
  { key: "sunday" as const, label: "주일설교", icon: Play },
  { key: "wednesday" as const, label: "수요예배", icon: Play },
  { key: "dawn" as const, label: "새벽기도", icon: Play },
];

type FilterKey = "all" | PlaylistType;

const crossNavPages = [
  { key: "about", icon: Heart, label: "교회소개", href: "/demo/variant-g/about" },
  { key: "worship", icon: Calendar, label: "예배안내", href: "/demo/variant-g/worship" },
  { key: "newcomer", icon: Users, label: "새가족", href: "/demo/variant-g/newcomer" },
  { key: "news", icon: BookOpen, label: "소식", href: "/demo/variant-g/news" },
];

export default function VariantGSermonsPage() {
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

  const featuredSermon = initialSermons[0];
  const filteredSermons =
    activeFilter === "all"
      ? initialSermons
      : initialSermons.filter((s) => s.playlist === activeFilter);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header variant="transparent" />

      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[50vh] min-h-[400px] overflow-hidden"
        aria-label="설교 히어로"
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
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070"
            alt="성경과 강대상"
            fill
            className="object-cover opacity-25"
            priority
          />
        </motion.div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-indigo-950/60 via-neutral-900/40 to-neutral-900"
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
            <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
              SERMONS
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              설교
            </h1>
            <p className="text-white/60 text-lg md:text-xl">
              말씀으로 세워가는 믿음의 공동체
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Sermon */}
      <section
        className="py-24 md:py-32 bg-gradient-to-br from-indigo-950 to-slate-900"
        aria-label="대표 설교"
      >
        <Container>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="text-center mb-12"
          >
            <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
              FEATURED
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              최신{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                설교
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              {/* Thumbnail */}
              <div className="lg:col-span-3">
                <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer">
                  <Image
                    src={
                      featuredSermon.thumbnailUrl ||
                      "/images/placeholder.jpg"
                    }
                    alt={featuredSermon.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={
                        prefersReducedMotion ? undefined : { scale: 1.1 }
                      }
                      className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors group-hover:bg-primary-500/80"
                    >
                      <Play
                        size={36}
                        className="text-white ml-1"
                        fill="white"
                        aria-hidden="true"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="lg:col-span-2">
                <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-3">
                  Featured Sermon
                </Badge>
                <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                  {featuredSermon.title}
                </h3>
                <p className="text-white/50 text-sm mb-2">
                  {featuredSermon.preacher} &middot;{" "}
                  {formatDate(featuredSermon.publishedAt)}
                </p>
                {featuredSermon.description && (
                  <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-3">
                    {featuredSermon.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-white/30 text-xs mb-6">
                  <span className="inline-flex items-center gap-1">
                    <Eye size={14} aria-hidden="true" />
                    {featuredSermon.viewCount?.toLocaleString()}
                  </span>
                </div>
                <Button className="bg-primary-500 hover:bg-primary-600 text-white group">
                  설교 듣기
                  <ArrowRight
                    size={16}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* All Sermons with Filter */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-slate-900 to-neutral-900"
        aria-label="전체 설교 목록"
      >
        <Container>
          <div className="text-center mb-12">
            <Badge className="bg-white/10 text-white/70 border-white/20 mb-4">
              ALL SERMONS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              전체 설교
            </h2>

            {/* Filter Tabs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
              className="inline-flex items-center gap-1 p-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
              role="tablist"
              aria-label="설교 카테고리 필터"
            >
              {filterTabs.map((tab, index) => (
                <button
                  key={tab.key}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={`tab-g-sermon-${tab.key}`}
                  role="tab"
                  aria-selected={activeFilter === tab.key}
                  aria-controls={`tabpanel-g-sermon-${tab.key}`}
                  tabIndex={activeFilter === tab.key ? 0 : -1}
                  onClick={() => setActiveFilter(tab.key)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 min-h-[44px] text-sm ${
                    activeFilter === tab.key
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <tab.icon size={16} aria-hidden="true" />
                  {tab.label}
                </button>
              ))}
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              id={`tabpanel-g-sermon-${activeFilter}`}
              role="tabpanel"
              aria-labelledby={`tab-g-sermon-${activeFilter}`}
              tabIndex={0}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }
              }
            >
              {filteredSermons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSermons.map((sermon, i) => (
                    <motion.article
                      key={sermon.id}
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
                        prefersReducedMotion ? undefined : { y: -5 }
                      }
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={
                            sermon.thumbnailUrl ||
                            "/images/placeholder.jpg"
                          }
                          alt={sermon.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                          aria-hidden="true"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-14 h-14 rounded-full bg-primary-500/80 flex items-center justify-center">
                            <Play
                              size={24}
                              className="text-white ml-0.5"
                              fill="white"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                          {sermon.title}
                        </h3>
                        <p className="text-white/50 text-sm">
                          {sermon.preacher} &middot;{" "}
                          {formatDate(sermon.publishedAt)}
                        </p>
                        {sermon.viewCount && (
                          <div className="flex items-center gap-1 text-white/30 text-xs mt-2">
                            <Eye size={12} aria-hidden="true" />
                            {sermon.viewCount.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-white/50">
                    해당 카테고리의 설교가 없습니다
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
