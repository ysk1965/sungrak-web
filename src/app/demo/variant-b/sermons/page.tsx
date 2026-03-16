"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, Youtube, ArrowRight } from "lucide-react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Container } from "@/components/common";
import { Section, SectionHeader } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SermonCard } from "@/components/home";
import { initialSermons } from "@/mocks/data/initial";
import { instantTransition } from "@/lib/animations";
import type { PlaylistType } from "@/types";

const playlistFilters = [
  { key: "all" as const, label: "전체" },
  { key: "sunday" as const, label: "주일설교" },
  { key: "wednesday" as const, label: "수요예배" },
  { key: "dawn" as const, label: "새벽기도" },
];

export default function VariantBSermonsPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activePlaylist, setActivePlaylist] = useState<"all" | PlaylistType>(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const animateProps = (delay = 0) => ({
    initial: shouldReduceMotion ? false : ({ opacity: 0, y: 20 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
    transition: shouldReduceMotion
      ? instantTransition
      : { delay, duration: 0.6 },
  });

  const filteredSermons = useMemo(() => {
    return initialSermons.filter((sermon) => {
      const matchesPlaylist =
        activePlaylist === "all" || sermon.playlist === activePlaylist;
      const matchesSearch =
        !searchQuery ||
        sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPlaylist && matchesSearch;
    });
  }, [activePlaylist, searchQuery]);

  const featuredSermon = initialSermons[0];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-[50vh] md:h-[60vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="설교 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=2070"
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
              Sermons
            </Badge>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300 font-semibold mb-2 text-lg">
              Sermon Videos
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
              설교 영상
            </h1>
            <p className="text-lg text-white/70 max-w-xl">
              말씀으로 함께 성장하는 은혜로운 시간
            </p>
          </motion.div>
        </Container>
        {/* Decorative pills */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-10">
          {["주일설교", "수요예배", "새벽기도"].map((label, i) => (
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

      {/* Featured Sermon */}
      <Section background="white" padding="lg" aria-label="최신 설교">
        <div className="relative z-20 -mt-20">
          <motion.div {...animateProps(0)}>
            <SermonCard sermon={featuredSermon} variant="featured" />
          </motion.div>
        </div>
      </Section>

      {/* Filter + Sermon List */}
      <Section background="gray" padding="xl" aria-label="설교 목록">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              All Sermons
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader
              title="전체 설교"
              subtitle="재생목록별로 설교를 찾아보세요"
            />
          </motion.div>
        </div>

        {/* Filter Bar */}
        <motion.div
          {...animateProps(0.2)}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          {/* Playlist Filter */}
          <div className="flex flex-wrap gap-2">
            {playlistFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActivePlaylist(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activePlaylist === filter.key
                    ? "bg-primary-500 text-white shadow-md"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary-200 hover:text-primary-600"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-auto sm:min-w-[260px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="설교 검색..."
              className="pl-10 rounded-full border-neutral-200"
            />
          </div>
        </motion.div>

        {/* Sermon Grid */}
        {filteredSermons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((sermon, i) => (
              <motion.div
                key={sermon.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? instantTransition : { delay: i * 0.1 }
                }
              >
                <SermonCard sermon={sermon} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search size={48} className="text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500 text-lg">검색 결과가 없습니다</p>
            <p className="text-neutral-400 text-sm mt-1">
              다른 키워드로 검색해보세요
            </p>
          </div>
        )}
      </Section>

      {/* YouTube CTA */}
      <section
        className="relative py-20 overflow-hidden bg-neutral-900"
        aria-label="유튜브 채널"
      >
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div {...animateProps(0)}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
                  <Youtube size={24} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  YouTube에서 더 많은 설교를 만나보세요
                </h2>
              </div>
              <p className="text-white/60">
                성락교회 공식 YouTube 채널에서 모든 설교를 시청하실 수 있습니다.
              </p>
            </motion.div>
            <motion.div {...animateProps(0.2)}>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition-colors group"
              >
                채널 바로가기
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

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
