"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Play,
  Heart,
  ChevronDown,
  ArrowRight,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LiveBadge } from "@/components/home";
import {
  initialSermons,
  initialNotices,
  initialWorships,
  initialChurchInfo,
} from "@/mocks/data/initial";
import { cn, formatDate, formatShortDate } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  news: "소식",
  event: "행사",
  weekly: "주보",
};

export default function VariantGPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionLabels = ["환영", "설교", "비전", "예배", "새가족", "소식"];

  const featuredSermon = initialSermons[0];
  const recentSermons = initialSermons.slice(1, 4);
  const notices = initialNotices;
  const worships = initialWorships;
  const churchInfo = initialChurchInfo;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(
              entry.target as HTMLDivElement,
            );
            if (index !== -1) setCurrentSection(index);
          }
        });
      },
      { root: containerRef.current, threshold: 0.5 },
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory"
    >
      {/* Header - Fixed overlay inside snap container */}
      <Header variant="transparent" />

      {/* Side Dot Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sectionLabels.map((label, i) => (
          <button
            key={i}
            onClick={() =>
              sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-2"
          >
            <span
              className={cn(
                "text-xs transition-all duration-300",
                currentSection === i
                  ? "text-white opacity-100"
                  : "text-white/0 group-hover:text-white/60 opacity-0 group-hover:opacity-100",
              )}
            >
              {label}
            </span>
            <div
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                currentSection === i
                  ? "bg-primary-500 scale-125 shadow-lg shadow-primary-500/50"
                  : "bg-white/30 hover:bg-white/60",
              )}
            />
          </button>
        ))}
      </div>

      {/* ===== Section 0: Welcome Hero ===== */}
      <div
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-neutral-900 via-slate-900 to-neutral-900"
      >
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
            alt="Church"
            fill
            className="object-cover opacity-20"
            priority
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-neutral-900/60" />

        {/* Content */}
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <LiveBadge className="flex justify-center mb-8" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          >
            성락교회
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
              신실한 헌신, 긍휼한 아낌
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white/60 text-lg md:text-xl mb-10"
          >
            Faith, a Relationship with the Lord
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/sermons">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25 h-14 px-8 text-base"
              >
                <Play size={18} className="mr-2" />
                예배 실황
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-base"
              >
                교회 소개
              </Button>
            </Link>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>

      {/* ===== Section 1: Featured Sermon ===== */}
      <div
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-950 to-slate-900"
      >
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left: Featured Sermon Thumbnail */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer">
                <Image
                  src={featuredSermon.thumbnailUrl || "/images/placeholder.jpg"}
                  alt={featuredSermon.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors group-hover:bg-primary-500/80"
                  >
                    <Play size={36} className="text-white ml-1" fill="white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right: Sermon Info */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
                Featured Sermon
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                {featuredSermon.title}
              </h2>
              <p className="text-white/60 mb-6">
                {featuredSermon.preacher} &middot;{" "}
                {formatDate(featuredSermon.publishedAt)}
              </p>
              <Link href="/sermons">
                <Button className="bg-primary-500 hover:bg-primary-600 text-white group mb-8">
                  설교 듣기
                  <ArrowRight
                    size={16}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>

              {/* Recent Sermons */}
              <div className="space-y-0">
                {recentSermons.map((sermon, i) => (
                  <motion.div
                    key={sermon.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className={cn(
                      "py-3 cursor-pointer group/item",
                      i < recentSermons.length - 1 &&
                        "border-b border-white/10",
                    )}
                  >
                    <h4 className="text-sm font-medium text-white/80 group-hover/item:text-primary-400 transition-colors line-clamp-1">
                      {sermon.title}
                    </h4>
                    <p className="text-xs text-white/40 mt-1">
                      {formatDate(sermon.publishedAt)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* ===== Section 2: Church Vision ===== */}
      <div
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-slate-900 to-neutral-900"
      >
        <Container className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Decorative Quote Mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none"
          >
            <span className="text-[200px] leading-none font-serif text-primary-500/10">
              &ldquo;
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white relative z-10"
          >
            {churchInfo.vision.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-white/60 text-center leading-relaxed mt-6 max-w-2xl mx-auto"
          >
            {churchInfo.vision.content}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            {churchInfo.vision.values.map((value, i) => (
              <span
                key={i}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/5"
              >
                {value}
              </span>
            ))}
          </motion.div>
        </Container>
      </div>

      {/* ===== Section 3: Worship Info ===== */}
      <div
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-amber-950/30 to-neutral-900"
      >
        <Container className="relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
                <Clock size={12} className="mr-1" />
                Worship
              </Badge>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-white"
            >
              예배 안내
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {worships.map((worship, i) => (
              <motion.div
                key={worship.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10 cursor-pointer"
              >
                <h3 className="font-semibold text-white mb-2">
                  {worship.name}
                </h3>
                <p className="text-2xl font-bold text-primary-400 mb-1">
                  {worship.time}
                </p>
                <p className="text-white/50 text-sm">{worship.location}</p>
                {worship.description && (
                  <p className="text-white/40 text-xs mt-2">
                    {worship.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* ===== Section 4: Newcomer ===== */}
      <div
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-primary-900/50 to-neutral-900"
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-3xl" />
        </div>

        <Container className="relative z-10 text-center">
          {/* Heart Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30"
            >
              <Heart size={36} className="text-white" fill="white" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            처음 오셨나요?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/60 text-lg max-w-md mx-auto mb-10"
          >
            성락교회는 여러분을 진심으로 환영합니다.
            <br />
            함께 예배하고 성장하는 공동체가 되길 소망합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/newcomer">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-white/90 shadow-xl h-14 px-10 text-base font-semibold group"
              >
                새가족 안내
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </div>

      {/* ===== Section 5: News + Footer ===== */}
      <div
        ref={(el) => {
          sectionRefs.current[5] = el;
        }}
        className="h-screen snap-start snap-always flex flex-col justify-center relative overflow-hidden bg-gradient-to-b from-neutral-900 to-black"
      >
        {/* Top: News */}
        <div className="flex-1 flex items-center">
          <Container className="relative z-10">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="bg-white/10 text-white/80 border-white/20 mb-4">
                  News
                </Badge>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold text-white"
              >
                교회 소식
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {notices.map((notice, i) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 cursor-pointer group transition-colors hover:bg-white/10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white/70 border-none text-xs"
                    >
                      {categoryLabels[notice.category] || notice.category}
                    </Badge>
                    {notice.isPinned && (
                      <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 text-xs">
                        고정
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-medium text-white group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                    {notice.title}
                  </h4>
                  <p className="text-white/40 text-sm">
                    {formatShortDate(notice.createdAt)}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </div>

        {/* Bottom: Footer Info */}
        <div className="pb-8">
          <Container>
            <div className="h-px bg-white/10 mb-6" />
            <div className="text-center space-y-2">
              <p className="text-white/50 text-sm font-medium">성락교회</p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-white/40 text-xs">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} />
                  {churchInfo.location.address}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Phone size={12} />
                  {churchInfo.location.phone}
                </span>
              </div>
              <p className="text-white/30 text-xs">
                &copy; {new Date().getFullYear()} 성락교회. All rights reserved.
              </p>
            </div>
          </Container>
        </div>
      </div>

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group border border-white/10"
      >
        <span className="group-hover:-translate-x-1 inline-block transition-transform">
          &larr;
        </span>{" "}
        시안 선택
      </Link>
    </div>
  );
}
