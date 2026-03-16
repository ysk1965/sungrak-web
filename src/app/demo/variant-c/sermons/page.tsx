"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useCallback, type KeyboardEvent } from "react";
import { Play, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/common/section";
import { CrossNav } from "@/components/common";
import { SermonCard } from "@/components/home";
import { initialSermons } from "@/mocks/data/initial";
import { reducedMotionVariants } from "@/lib/animations";
import type { PlaylistType } from "@/types";

const filterTabs = [
  { key: "all" as const, label: "전체", icon: BookOpen },
  { key: "sunday" as const, label: "주일설교", icon: Play },
  { key: "wednesday" as const, label: "수요예배", icon: Play },
  { key: "dawn" as const, label: "새벽기도", icon: Play },
];

type FilterKey = "all" | PlaylistType;

const tabVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const tabVariantsReduced = {
  hidden: reducedMotionVariants.initial,
  visible: reducedMotionVariants.animate,
  exit: reducedMotionVariants.exit,
};

export default function SermonsPage() {
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
        const prevIndex = (index - 1 + filterTabs.length) % filterTabs.length;
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

  const resolvedTabVariants = prefersReducedMotion
    ? tabVariantsReduced
    : tabVariants;

  return (
    <>
      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[45vh] min-h-[360px] pt-16 md:pt-20 overflow-hidden"
        aria-label="설교 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070"
          alt="성경과 강대상"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }
            }
            className="text-center"
          >
            <p className="text-sm text-primary-400 font-medium mb-3 tracking-widest">
              SERMONS
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              설교
            </h1>
            <p className="text-neutral-200 text-lg">
              말씀으로 세워가는 믿음의 공동체
            </p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { delay: 0.6, duration: 0.5 }
          }
          className="absolute top-24 right-8 md:right-16 hidden md:block"
          aria-hidden="true"
        >
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 text-center">
            <div className="text-2xl font-bold text-primary-400">
              <BookOpen size={24} className="mx-auto" />
            </div>
            <div className="text-xs text-white/80 mt-1">말씀의 능력</div>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { delay: 0.8, duration: 0.5 }
          }
          className="absolute bottom-20 left-8 md:left-16 hidden md:block"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
            <Play size={16} className="text-primary-400" />
            <span className="text-sm text-white/90">매주 새로운 말씀</span>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" className="w-full h-8 md:h-12" preserveAspectRatio="none">
            <path d="M0,60 L0,20 Q720,0 1440,20 L1440,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Featured Sermon */}
      <Section background="white" padding="xl" aria-label="대표 설교">
        <div className="text-center mb-10">
          <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
            FEATURED
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            최신{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
              설교
            </span>
          </h2>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : undefined}
          whileHover={prefersReducedMotion ? {} : { y: -5 }}
          className="max-w-4xl mx-auto relative"
        >
          {/* Decorative glow behind featured card */}
          <div
            className="absolute -inset-4 bg-gradient-to-r from-primary-200/30 via-amber-200/20 to-primary-200/30 rounded-3xl blur-2xl"
            aria-hidden="true"
          />
          <div className="relative">
            <SermonCard sermon={featuredSermon} variant="featured" />
          </div>
        </motion.div>
      </Section>

      {/* Sermon List with Filter */}
      <Section background="gray" padding="xl" aria-label="전체 설교 목록">
        <div className="text-center mb-10">
          <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
            ALL SERMONS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
            전체 설교
          </h2>

          {/* Filter Tabs */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="inline-flex items-center gap-1 p-1.5 bg-neutral-100 rounded-full"
            role="tablist"
            aria-label="설교 카테고리 필터"
          >
            {filterTabs.map((tab, index) => (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                id={`tab-sermon-${tab.key}`}
                role="tab"
                aria-selected={activeFilter === tab.key}
                aria-controls={`tabpanel-sermon-${tab.key}`}
                tabIndex={activeFilter === tab.key ? 0 : -1}
                onClick={() => setActiveFilter(tab.key)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 min-h-[44px] text-sm ${
                  activeFilter === tab.key
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                    : "text-neutral-600 hover:text-neutral-900"
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
            id={`tabpanel-sermon-${activeFilter}`}
            role="tabpanel"
            aria-labelledby={`tab-sermon-${activeFilter}`}
            tabIndex={0}
            variants={resolvedTabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredSermons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSermons.map((sermon, i) => (
                  <motion.div
                    key={sermon.id}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 20 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { delay: i * 0.1 }
                    }
                    whileHover={prefersReducedMotion ? {} : { y: -8 }}
                  >
                    <SermonCard sermon={sermon} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-neutral-500">
                  해당 카테고리의 설교가 없습니다
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Section>

      <CrossNav basePath="/demo/variant-c" currentPage="sermons" />
    </>
  );
}
