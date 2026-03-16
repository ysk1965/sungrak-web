"use client";

import { useState, useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Play, ArrowRight, Eye, Clock } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/common";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { initialSermons } from "@/mocks/data/initial";
import { formatDate, formatDuration } from "@/lib/utils";
import type { Sermon } from "@/types";

// Additional mock sermons for a fuller page
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
const remainingSermons = allSermons.slice(1);

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

export default function VariantDSermonsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [visibleCount, setVisibleCount] = useState(6);

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
    shouldReduceMotion ? [0, 0] : [0, 80],
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.6],
    shouldReduceMotion ? [1, 1] : [1, 0],
  );

  const featuredSermon = allSermons[0];

  const filteredSermons = useMemo(() => {
    if (activeFilter === "all") return remainingSermons;
    return remainingSermons.filter(
      (sermon) => sermon.playlist === activeFilter,
    );
  }, [activeFilter]);

  const visibleSermons = filteredSermons.slice(0, visibleCount);
  const hasMore = filteredSermons.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setVisibleCount(6);
  };

  return (
    <>
      {/* Featured Sermon Hero */}
      <section
        ref={heroRef}
        className="relative h-[70vh] md:h-[75vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="대표 설교"
      >
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/95 via-neutral-900/50 to-neutral-900/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/60 to-transparent" />
        </motion.div>

        {/* Decorative gold radial gradient */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldReduceMotion ? 0.08 : 0.08 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.8 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 100%, rgba(245,158,11,0.3) 0%, transparent 60%)",
            }}
          />
        </div>

        <Container className="relative z-10 h-full flex items-end pb-12 md:pb-16">
          <motion.div
            style={{ y: textY, opacity: heroOpacity }}
            className="max-w-3xl w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            >
              <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
                <Play size={12} className="mr-1" aria-hidden="true" />
                Featured Sermon
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            >
              {featuredSermon.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }}
              className="text-white/60 text-sm md:text-base mb-6 flex flex-wrap items-center gap-x-3 gap-y-1"
            >
              <span>{featuredSermon.preacher}</span>
              <span aria-hidden="true" className="text-white/30">
                |
              </span>
              <span>{formatDate(featuredSermon.publishedAt)}</span>
              <span aria-hidden="true" className="text-white/30">
                |
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} aria-hidden="true" />
                {formatDuration(featuredSermon.duration)}
              </span>
              <span aria-hidden="true" className="text-white/30">
                |
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} aria-hidden="true" />
                {featuredSermon.viewCount.toLocaleString()}회
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.6 }}
              className="text-white/70 text-base leading-relaxed mb-8 max-w-2xl line-clamp-2"
            >
              {featuredSermon.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.7 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href={`https://www.youtube.com/watch?v=${featuredSermon.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${featuredSermon.title} 설교 영상 시청하기`}
              >
                <Button
                  size="lg"
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/10 group min-h-[44px] rounded-full px-8"
                >
                  <Play
                    size={20}
                    className="mr-2"
                    fill="white"
                    aria-hidden="true"
                  />
                  지금 시청하기
                </Button>
              </a>
              <Badge className="bg-white/10 backdrop-blur-sm text-white/80 border-white/10">
                {getPlaylistLabel(featuredSermon.playlist)}
              </Badge>
            </motion.div>
          </motion.div>
        </Container>

        {/* Floating thumbnail preview */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { delay: 0.8, duration: 0.8 }
          }
          className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:block"
          aria-hidden="true"
        >
          <div className="relative w-72 xl:w-80 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src={featuredSermon.thumbnailUrl || "/images/placeholder.jpg"}
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs">
              {formatDuration(featuredSermon.duration)}
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
          aria-hidden="true"
        >
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase">
              Scroll
            </span>
            <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-0.5 h-1.5 bg-white/50 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Page Title Bar */}
      <section
        className="bg-neutral-900 text-white py-5 relative overflow-hidden"
        aria-label="설교 페이지 안내"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-transparent to-primary-900/20"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                <Play
                  size={18}
                  className="text-primary-400"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                    설교
                  </span>
                </h2>
                <p className="text-xs text-white/50">
                  말씀으로 함께 성장합니다
                </p>
              </div>
            </div>
            <p className="text-sm text-white/60">
              전체 {allSermons.length}편의 설교를 시청하실 수 있습니다
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filter Tabs + Sermon Grid */}
      <Section background="white" padding="xl" aria-label="설교 목록">
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="mb-10"
        >
          <div
            role="tablist"
            aria-label="설교 카테고리 필터"
            className="flex flex-wrap gap-2 justify-center"
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
                    (
                    {activeFilter === "all"
                      ? remainingSermons.length
                      : filteredSermons.length}
                    )
                  </span>
                )}
              </button>
            ))}
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
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: i * 0.08, duration: 0.5 }
              }
              whileHover={shouldReduceMotion ? undefined : { y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-neutral-100">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={sermon.thumbnailUrl || "/images/placeholder.jpg"}
                    alt={sermon.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play
                        size={24}
                        className="text-primary-500 ml-1"
                        fill="currentColor"
                        aria-hidden="true"
                      />
                    </motion.div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-xs">
                    {formatDuration(sermon.duration)}
                  </div>
                  {/* Playlist badge */}
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
              해당 카테고리의 설교가 없습니다.
            </p>
          </motion.div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            className="flex justify-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              className="group min-h-[44px] rounded-full px-8 border-neutral-300 hover:border-primary-500 hover:text-primary-600"
              aria-label="더 많은 설교 보기"
            >
              더 보기
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 motion-reduce:transition-none transition-transform"
                aria-hidden="true"
              />
            </Button>
          </motion.div>
        )}
      </Section>

      {/* Bottom CTA - Subscribe/Worship Invite */}
      <section className="relative overflow-hidden" aria-label="예배 초대">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/80 to-neutral-900/70" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.15) 0%, transparent 50%)",
            }}
          />
        </div>

        <Container className="relative z-10 py-20 md:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
            >
              <Badge className="bg-white/10 backdrop-blur-sm text-white/80 border-white/10 mb-6">
                Join Us
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 0.2, duration: 0.8 }
              }
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              말씀과 함께하는
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                은혜로운 예배
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
              className="text-white/60 text-lg mb-8 leading-relaxed"
            >
              매주 말씀을 통해 은혜를 나누고 있습니다.
              <br />
              함께 예배하며 하나님의 사랑을 경험해 보세요.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href={`https://www.youtube.com/watch?v=${featuredSermon.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube에서 최신 설교 시청하기"
              >
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white group shadow-lg shadow-primary-500/25 min-h-[44px]"
                >
                  <Play
                    size={18}
                    className="mr-2"
                    fill="white"
                    aria-hidden="true"
                  />
                  YouTube에서 시청하기
                  <ArrowRight
                    size={18}
                    className="ml-1 group-hover:translate-x-1 motion-reduce:transition-none transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </a>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
