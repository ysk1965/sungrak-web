"use client";

import { useState, useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Play, ArrowRight, Eye, Clock, Search, X } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { initialSermons } from "@/mocks/data/initial";
import { formatDate, formatDuration } from "@/lib/utils";
import type { Sermon } from "@/types";

const additionalSermons: Sermon[] = [
  {
    id: "sermon_005",
    title: "은혜의 강물 - 에스겔서 강해",
    playlist: "sunday",
    preacher: "담임목사",
    publishedAt: "2024-01-21T10:00:00Z",
    duration: "PT40M00S",
    viewCount: 890,
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    description: "에스겔서를 통해 은혜의 강물을 묵상합니다.",
    createdAt: "2024-01-21T12:00:00Z",
    updatedAt: "2024-01-21T12:00:00Z",
  },
  {
    id: "sermon_006",
    title: "사랑의 계명 - 요한일서",
    playlist: "sunday",
    preacher: "담임목사",
    publishedAt: "2024-01-28T10:00:00Z",
    duration: "PT43M00S",
    viewCount: 756,
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    description: "하나님의 사랑과 이웃 사랑의 계명을 배웁니다.",
    createdAt: "2024-01-28T12:00:00Z",
    updatedAt: "2024-01-28T12:00:00Z",
  },
  {
    id: "sermon_007",
    title: "수요예배 - 감사의 삶",
    playlist: "wednesday",
    preacher: "부목사",
    publishedAt: "2024-01-17T19:30:00Z",
    duration: "PT33M00S",
    viewCount: 345,
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    description: "범사에 감사하는 삶을 살아가는 방법.",
    createdAt: "2024-01-17T21:00:00Z",
    updatedAt: "2024-01-17T21:00:00Z",
  },
  {
    id: "sermon_008",
    title: "새벽기도 - 시편 23편",
    playlist: "dawn",
    preacher: "담임목사",
    publishedAt: "2024-01-22T05:00:00Z",
    duration: "PT22M00S",
    viewCount: 198,
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    description: "시편 23편을 통한 목자의 사랑.",
    createdAt: "2024-01-22T06:00:00Z",
    updatedAt: "2024-01-22T06:00:00Z",
  },
  {
    id: "sermon_009",
    title: "회복의 은혜 - 요엘서",
    playlist: "sunday",
    preacher: "담임목사",
    publishedAt: "2024-02-04T10:00:00Z",
    duration: "PT47M00S",
    viewCount: 678,
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    description: "요엘서를 통해 회복의 은혜를 선포합니다.",
    createdAt: "2024-02-04T12:00:00Z",
    updatedAt: "2024-02-04T12:00:00Z",
  },
  {
    id: "sermon_010",
    title: "수요예배 - 성령의 열매",
    playlist: "wednesday",
    preacher: "부목사",
    publishedAt: "2024-01-24T19:30:00Z",
    duration: "PT36M00S",
    viewCount: 412,
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    description: "갈라디아서의 성령의 열매를 배웁니다.",
    createdAt: "2024-01-24T21:00:00Z",
    updatedAt: "2024-01-24T21:00:00Z",
  },
];

const allSermons: Sermon[] = [...initialSermons, ...additionalSermons];

type FilterType = "all" | "sunday" | "wednesday" | "dawn";

const filterTabs: { value: FilterType; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "sunday", label: "주일설교" },
  { value: "wednesday", label: "수요예배" },
  { value: "dawn", label: "새벽기도" },
];

function getPlaylistLabel(playlist: string): string {
  switch (playlist) {
    case "sunday":
      return "주일설교";
    case "wednesday":
      return "수요예배";
    case "dawn":
      return "새벽기도";
    default:
      return playlist;
  }
}

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

export default function VariantISermonsPage() {
  const rm = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const featuredSermon = allSermons[0];
  const remainingSermons = allSermons.slice(1);

  const filteredSermons = useMemo(() => {
    let sermons = remainingSermons;
    if (activeFilter !== "all") {
      sermons = sermons.filter((s) => s.playlist === activeFilter);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      sermons = sermons.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.preacher.toLowerCase().includes(query) ||
          (s.description && s.description.toLowerCase().includes(query)),
      );
    }
    return sermons;
  }, [activeFilter, searchQuery]);

  const visibleSermons = filteredSermons.slice(0, visibleCount);
  const hasMore = filteredSermons.length > visibleCount;

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setVisibleCount(6);
  };

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

      {/* Featured Sermon Hero */}
      <section
        aria-label="대표 설교"
        className="relative mt-16 md:mt-20 bg-[#FAF8F3] overflow-hidden"
      >
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center py-16 lg:py-20">
            {/* Text 3/5 */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <motion.p
                variants={makeFadeInUp(20, 0, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-4"
              >
                FEATURED SERMON
              </motion.p>

              <motion.h1
                variants={makeFadeInUp(30, 0.1, 0.8, rm)}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-4"
              >
                {featuredSermon.title}
              </motion.h1>

              <motion.div
                variants={makeFadeInUp(20, 0.2, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center gap-x-3 gap-y-1 text-neutral-500 text-sm mb-4"
              >
                <span>{featuredSermon.preacher}</span>
                <span aria-hidden="true" className="text-neutral-300">|</span>
                <span>{formatDate(featuredSermon.publishedAt)}</span>
                <span aria-hidden="true" className="text-neutral-300">|</span>
                <span className="flex items-center gap-1">
                  <Clock size={14} aria-hidden="true" />
                  {formatDuration(featuredSermon.duration)}
                </span>
              </motion.div>

              <motion.p
                variants={makeFadeInUp(20, 0.3, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="text-neutral-600 text-lg leading-relaxed mb-8 max-w-2xl"
              >
                {featuredSermon.description}
              </motion.p>

              <motion.div
                variants={makeFadeInUp(20, 0.4, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${featuredSermon.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${featuredSermon.title} 설교 영상 시청하기`}
                >
                  <Button
                    size="lg"
                    className="group shadow-lg shadow-primary-500/20"
                  >
                    <Play size={20} fill="white" aria-hidden="true" />
                    지금 시청하기
                  </Button>
                </a>
                <Badge className="bg-primary-50 text-primary-600 border-primary-100">
                  {getPlaylistLabel(featuredSermon.playlist)}
                </Badge>
              </motion.div>
            </div>

            {/* Thumbnail 2/5 — tilted like main hero */}
            <motion.div
              variants={
                rm
                  ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
                  : {
                      hidden: { opacity: 0, x: 60, rotate: 4 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        rotate: 2,
                        transition: { duration: 1, delay: 0.2 },
                      },
                    }
              }
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 order-1 lg:order-2 relative"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl transform rotate-2">
                <Image
                  src={featuredSermon.thumbnailUrl || "/images/placeholder.jpg"}
                  alt={featuredSermon.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Play size={28} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs">
                  {formatDuration(featuredSermon.duration)}
                </div>
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-primary-200 -z-10 transform -rotate-1"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Filter + Grid */}
      <section aria-label="설교 목록" className="bg-white py-20">
        <Container size="xl">
          {/* Filter + Search */}
          <motion.div
            variants={makeFadeInUp(20, 0, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
          >
            <div
              role="tablist"
              aria-label="설교 카테고리 필터"
              className="flex flex-wrap gap-2"
            >
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={activeFilter === tab.value}
                  onClick={() => handleFilterChange(tab.value)}
                  className={`
                    px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                    min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-primary-500 focus-visible:ring-offset-2
                    ${
                      activeFilter === tab.value
                        ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }
                  `}
                >
                  {tab.label}
                  {activeFilter === tab.value && (
                    <span className="ml-1.5 text-xs opacity-80">
                      ({activeFilter === "all" ? remainingSermons.length : filteredSermons.length})
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="relative max-w-sm w-full">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="search"
                placeholder="설교 제목, 설교자 검색..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(6);
                }}
                className="w-full pl-11 pr-10 py-2.5 rounded-full border border-neutral-200 bg-white text-sm
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                           min-h-[44px] transition-all"
                aria-label="설교 검색"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  aria-label="검색어 지우기"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Sermon Grid */}
          <div
            role="tabpanel"
            aria-label={`${filterTabs.find((t) => t.value === activeFilter)?.label} 설교 목록`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleSermons.map((sermon, i) => (
              <motion.div
                key={sermon.id}
                variants={makeFadeInUp(20, i * 0.08, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={rm ? undefined : { y: -8 }}
                className="group"
              >
                <div className="bg-[#FAF8F3] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-neutral-100">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={sermon.thumbnailUrl || "/images/placeholder.jpg"}
                      alt={sermon.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play
                          size={24}
                          className="text-primary-500 ml-1"
                          fill="currentColor"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-xs">
                      {formatDuration(sermon.duration)}
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge
                        className={`text-xs backdrop-blur-sm border-0 ${
                          sermon.playlist === "sunday"
                            ? "bg-blue-500/80 text-white"
                            : sermon.playlist === "wednesday"
                              ? "bg-emerald-500/80 text-white"
                              : "bg-amber-500/80 text-white"
                        }`}
                      >
                        {getPlaylistLabel(sermon.playlist)}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-neutral-900 line-clamp-2 group-hover:text-primary-600 transition-colors mb-2 text-base">
                      {sermon.title}
                    </h3>
                    {sermon.description && (
                      <p className="text-sm text-neutral-500 line-clamp-1 mb-3">
                        {sermon.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-neutral-400">
                      <span>{sermon.preacher}</span>
                      <span className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye size={13} aria-hidden="true" />
                          {sermon.viewCount.toLocaleString()}
                        </span>
                        <span>{formatDate(sermon.publishedAt)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredSermons.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center"
                aria-hidden="true"
              >
                <Play size={28} className="text-neutral-300" />
              </div>
              <p className="text-neutral-500 text-lg">
                {searchQuery
                  ? "검색 결과가 없습니다"
                  : "해당 카테고리의 설교가 없습니다."}
              </p>
            </motion.div>
          )}

          {/* Load More */}
          {hasMore && (
            <motion.div
              variants={makeFadeInUp(20, 0.2, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="group min-h-[44px] rounded-full px-8 border-neutral-300 hover:border-primary-500 hover:text-primary-600"
                aria-label="더 많은 설교 보기"
              >
                더 보기
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Button>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Bottom CTA */}
      <section aria-label="예배 초대" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700"
        />
        <div aria-hidden="true" className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <Container size="xl" className="relative z-10 py-20 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              variants={makeFadeInUp(20, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              말씀과 함께하는
              <br />
              은혜로운 예배
            </motion.h2>
            <motion.p
              variants={makeFadeInUp(20, 0.1, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white/80 text-lg mb-8"
            >
              매주 말씀을 통해 은혜를 나누고 있습니다.
              <br />
              함께 예배하며 하나님의 사랑을 경험해 보세요.
            </motion.p>
            <motion.div
              variants={makeFadeInUp(20, 0.2, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <a
                href={`https://www.youtube.com/watch?v=${featuredSermon.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube에서 최신 설교 시청하기"
              >
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-white/90 shadow-xl group h-14 px-8 text-base"
                >
                  <Play size={18} fill="currentColor" aria-hidden="true" />
                  YouTube에서 시청하기
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </a>
            </motion.div>
          </div>
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
