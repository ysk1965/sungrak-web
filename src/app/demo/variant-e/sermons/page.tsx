"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useCallback, type KeyboardEvent } from "react";
import { Play, BookOpen, Minus } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/common/section";
import { Container, CrossNav } from "@/components/common";
import { Separator } from "@/components/ui/separator";
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
  const shouldReduceMotion = useReducedMotion();
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

  const resolvedTabVariants = shouldReduceMotion
    ? tabVariantsReduced
    : tabVariants;

  return (
    <>
      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[50vh] min-h-[400px] pt-20 flex items-center justify-center overflow-hidden"
        aria-label="설교 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070"
          alt="성경과 강대상"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.8 }
          }
          className="relative text-center text-white"
        >
          <span className="inline-flex items-center gap-3 text-primary-300 font-medium tracking-[0.3em] mb-4">
            <Minus size={20} aria-hidden="true" />
            SERMONS
            <Minus size={20} aria-hidden="true" />
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            설교
          </h1>
          <p className="text-xl text-white/70 font-light tracking-wide">
            말씀으로 세워가는 믿음의 공동체
          </p>
        </motion.div>

        <div
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30"
          aria-hidden="true"
        />
      </section>

      {/* Featured Sermon */}
      <Section background="white" padding="xl" aria-label="대표 설교">
        <Container size="lg">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
              FEATURED
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              최신{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-amber-500 to-primary-500 bg-[length:200%_auto] animate-gradient">
                설교
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            className="max-w-4xl relative"
          >
            <div
              className="absolute -inset-4 bg-gradient-to-r from-primary-200/30 via-amber-200/20 to-primary-200/30 rounded-3xl blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">
              <SermonCard sermon={featuredSermon} variant="featured" />
            </div>
          </motion.div>
        </Container>
      </Section>

      <Container size="lg">
        <Separator className="bg-neutral-100" aria-hidden="true" />
      </Container>

      {/* Sermon List with Filter */}
      <Section background="white" padding="xl" aria-label="전체 설교 목록">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
                ALL SERMONS
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
                전체 설교
              </h2>
            </div>

            {/* Filter Tabs */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all motion-reduce:transition-none duration-300 min-h-[44px] text-sm ${
                    activeFilter === tab.key
                      ? "bg-neutral-900 text-white shadow-lg"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredSermons.map((sermon, i) => (
                    <motion.div
                      key={sermon.id}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, y: 20 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { delay: i * 0.1 }
                      }
                      whileHover={shouldReduceMotion ? undefined : { y: -10 }}
                    >
                      <SermonCard sermon={sermon} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-neutral-400 text-lg">
                    해당 카테고리의 설교가 없습니다
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>

      <CrossNav basePath="/demo/variant-e" currentPage="sermons" />
    </>
  );
}
