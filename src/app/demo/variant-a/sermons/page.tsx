"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";

import { useBasePath } from "@/contexts/base-path-context";
import { initialSermons } from "@/mocks/data/initial";

import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Section } from "@/components/common/section";
import { PageHero } from "@/components/variant-a/page-hero";
import { Breadcrumb } from "@/components/variant-a/breadcrumb";
import { SermonCard } from "@/components/home/sermon-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";

// Duplicate sermons for a fuller grid
const allSermons = [
  ...initialSermons,
  ...initialSermons.map((s, i) => ({ ...s, id: s.id + "_dup_" + i })),
];

type PlaylistFilter = "all" | "sunday" | "wednesday" | "dawn";

const filterTabs: { label: string; value: PlaylistFilter }[] = [
  { label: "전체", value: "all" },
  { label: "주일설교", value: "sunday" },
  { label: "수요예배", value: "wednesday" },
  { label: "새벽기도", value: "dawn" },
];

export default function SermonsPage() {
  const basePath = useBasePath();
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<PlaylistFilter>("all");

  const reducedTransition = { duration: 0 };

  const filteredSermons =
    activeTab === "all"
      ? allSermons
      : allSermons.filter((sermon) => sermon.playlist === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <Header variant="transparent" basePath={basePath} />

      {/* Hero */}
      <PageHero
        title="설교"
        subtitle="말씀으로 함께 성장합니다"
        backgroundImage="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070"
        backgroundAlt="성경과 강단"
      />

      {/* Breadcrumb */}
      <Section background="white" padding="sm">
        <Breadcrumb items={[{ label: "설교" }]} />
      </Section>

      {/* Filter + Search + Sermon Grid */}
      <Section background="white" padding="xl" aria-label="설교 목록">
        <FadeInUp>
          {/* Filter Tabs + Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            {/* Pill Filter Buttons */}
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="설교 분류 필터"
            >
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={activeTab === tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                    activeTab === tab.value
                      ? "bg-primary-500 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                aria-hidden="true"
              />
              <Input
                type="text"
                placeholder="설교 검색..."
                className="pl-10 min-h-[44px]"
                aria-label="설교 검색"
              />
            </div>
          </div>
        </FadeInUp>

        {/* Sermon Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            transition={
              shouldReduceMotion
                ? reducedTransition
                : { duration: 0.3, ease: "easeInOut" }
            }
          >
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSermons.map((sermon) => (
                <StaggerItem key={sermon.id}>
                  <SermonCard sermon={sermon} variant="default" />
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Empty State */}
            {filteredSermons.length === 0 && (
              <div className="text-center py-16 text-neutral-500">
                <p className="text-lg">해당 분류의 설교가 없습니다.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" className="min-h-[44px] px-8">
            더 보기
          </Button>
        </div>
      </Section>

      <Footer basePath={basePath} />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm font-medium min-h-[44px] flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
      >
        ← 시안 선택
      </Link>
    </div>
  );
}
