"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowDown,
  Play,
  Clock,
  MapPin,
  Phone,
  ExternalLink,
  Youtube,
  Instagram,
  Facebook,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  initialSermons,
  initialNotices,
  initialChurchInfo,
  initialWorships,
} from "@/mocks/data/initial";
import { useBasePath } from "@/contexts/base-path-context";
import { formatDate } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Image card data                                                    */
/* ------------------------------------------------------------------ */

const imageCards = [
  {
    title: "말씀",
    subtitle: "SERMONS",
    href: "sermons",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070",
    description: "은혜로운 말씀을 통해 삶의 방향을 찾습니다",
  },
  {
    title: "예배안내",
    subtitle: "WORSHIP",
    href: "worship",
    image:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073",
    description: "하나님께 드리는 거룩한 예배에 함께하세요",
  },
  {
    title: "새가족",
    subtitle: "NEWCOMER",
    href: "newcomer",
    image:
      "https://images.unsplash.com/photo-1529070538774-1560d23cee93?q=80&w=2070",
    description: "처음 오신 분들을 진심으로 환영합니다",
  },
];

/* ------------------------------------------------------------------ */
/*  Social links                                                       */
/* ------------------------------------------------------------------ */

const socialLinks = [
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
];

/* ------------------------------------------------------------------ */
/*  Notice category labels                                             */
/* ------------------------------------------------------------------ */

const categoryLabels: Record<string, string> = {
  news: "소식",
  event: "행사",
  weekly: "주보",
};

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function VariantJPage() {
  const shouldReduceMotion = useReducedMotion();
  const basePath = useBasePath();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 150],
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    shouldReduceMotion ? [1, 1] : [1, 0],
  );

  const recentSermons = initialSermons.slice(0, 3);
  const latestSermon = initialSermons[0];
  const notices = initialNotices.slice(0, 5);

  /* shorthand variant factories */
  const fadeUp = (delay = 0) =>
    makeFadeInUp(30, delay, 0.7, shouldReduceMotion);
  const fadeLeft = (delay = 0) =>
    makeFadeInX(-40, delay, 0.7, shouldReduceMotion);
  const fadeRight = (delay = 0) =>
    makeFadeInX(40, delay, 0.7, shouldReduceMotion);

  return (
    <>
      {/* ============================================================ */}
      {/* 1. HERO -- Full-screen dark cinematic                        */}
      {/* ============================================================ */}
      <section
        id="variant-j-content"
        ref={heroRef}
        className="relative h-screen flex flex-col overflow-hidden bg-stone-950"
        aria-label="메인 히어로"
      >
        {/* Background image */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2070"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950" />
          {/* Film grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <motion.div
            style={{ y: titleY, opacity: heroOpacity }}
            className="text-center px-4 max-w-4xl mx-auto"
          >
            {/* Label */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.2 }
              }
              className="text-amber-400 text-sm md:text-base font-medium tracking-[0.4em] uppercase mb-6"
              aria-label="성락교회"
            >
              SUNGRAK CHURCH
            </motion.p>

            {/* Main title */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.8, delay: 0.4 }
              }
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1]"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                신실한 헌신,
                <br />
                긍휼한 사귐
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.6 }
              }
              className="text-stone-400 text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto"
            >
              신실한 헌신, 긍휼한 사귐 — Sincere Devotion, Compassionate
              Fellowship
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.8 }
              }
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href={`${basePath}/worship`}>
                <Button
                  size="lg"
                  className="min-h-[44px] min-w-[180px] h-14 text-base bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold shadow-lg shadow-amber-500/20 group"
                >
                  <Play
                    size={20}
                    aria-hidden="true"
                    className="group-hover:scale-110 transition-transform motion-reduce:transition-none"
                  />
                  실시간 예배
                </Button>
              </Link>
              <Link href={`${basePath}/about`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="min-h-[44px] min-w-[180px] h-14 text-base border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 group"
                >
                  교회 소개
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.2 }}
          className="relative z-10 pb-12 text-center"
        >
          <a
            href="#image-cards"
            aria-label="아래로 스크롤"
            className="inline-block"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("image-cards")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-xs tracking-[0.2em] text-stone-500 uppercase">
                Scroll to explore
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-amber-400/60 to-transparent" />
              <ArrowDown size={18} className="text-amber-400/60" />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* 2. 3-COLUMN IMAGE CARDS -- POD21 style                       */}
      {/* ============================================================ */}
      <section
        id="image-cards"
        className="bg-stone-950 py-24 md:py-32"
        aria-label="주요 메뉴 카드"
      >
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {imageCards.map((card, i) => (
              <motion.div
                key={card.href}
                variants={fadeUp(i * 0.15)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link
                  href={`${basePath}/${card.href}`}
                  className="group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-stone-800/50 backdrop-blur border border-stone-700/50"
                  aria-label={`${card.title} 페이지로 이동`}
                >
                  {/* Card image */}
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 motion-reduce:transition-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                  {/* Card text */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <p className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase mb-2">
                      {card.subtitle}
                    </p>
                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                      {card.title}
                    </h3>
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">
                      {card.description}
                    </p>
                    <div className="flex items-center gap-2 text-amber-400 text-sm font-medium group-hover:gap-3 transition-all motion-reduce:transition-none">
                      자세히 보기
                      <ArrowRight size={16} aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 3. WORSHIP TIMES                                             */}
      {/* ============================================================ */}
      <section
        id="worship-times"
        className="bg-stone-900 py-24 md:py-32"
        aria-label="예배 안내"
      >
        <Container size="lg">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <p className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
                WORSHIP
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                예배 안내
              </h2>
            </div>
            <Link href={`${basePath}/worship`}>
              <Button
                variant="ghost"
                className="group text-base min-h-[44px] text-stone-400 hover:text-amber-400 hover:bg-transparent"
              >
                전체 보기
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {initialWorships
              .sort((a, b) => a.order - b.order)
              .map((worship, i) => (
                <motion.div
                  key={worship.id}
                  variants={fadeUp(i * 0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-stone-800/50 backdrop-blur border border-stone-700/50 rounded-xl p-5 hover:border-amber-500/30 transition-colors motion-reduce:transition-none"
                >
                  <h3 className="text-white font-semibold text-sm md:text-base mb-3">
                    {worship.name}
                  </h3>
                  <div className="flex items-center gap-2 text-amber-400 text-sm mb-2">
                    <Clock size={14} aria-hidden="true" />
                    <span>{worship.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-400 text-xs">
                    <MapPin size={14} aria-hidden="true" />
                    <span>{worship.location}</span>
                  </div>
                </motion.div>
              ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 4. FEATURED SERMON (MEDIA)                                   */}
      {/* ============================================================ */}
      <section id="sermons" className="bg-stone-950 py-24 md:py-32" aria-label="최근 설교">
        <Container size="lg">
          {/* Section header */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <p className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
                MEDIA
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                최근 설교
              </h2>
            </div>
            <Link href={`${basePath}/sermons`}>
              <Button
                variant="ghost"
                className="group text-base min-h-[44px] text-stone-400 hover:text-amber-400 hover:bg-transparent"
              >
                MORE
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Featured sermon -- large thumbnail */}
            <motion.div
              variants={fadeLeft(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Link
                href={`${basePath}/sermons`}
                className="group relative block aspect-video rounded-2xl overflow-hidden bg-stone-800"
                aria-label={`설교 영상: ${latestSermon.title}`}
              >
                <Image
                  src={latestSermon.thumbnailUrl}
                  alt={latestSermon.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-colors motion-reduce:transition-none" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-amber-500/90 flex items-center justify-center group-hover:scale-110 transition-transform motion-reduce:transition-none shadow-lg shadow-amber-500/30">
                    <Play
                      size={32}
                      className="text-stone-950 ml-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-950/80 to-transparent">
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-2">
                    최신 설교
                  </Badge>
                  <h3 className="text-white text-xl md:text-2xl font-bold">
                    {latestSermon.title}
                  </h3>
                  <p className="text-stone-400 text-sm mt-1">
                    {latestSermon.preacher} &middot;{" "}
                    {formatDate(latestSermon.publishedAt)}
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Recent sermons list */}
            <motion.div
              variants={fadeRight(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              {recentSermons.map((sermon) => (
                <Link
                  key={sermon.id}
                  href={`${basePath}/sermons`}
                  className="group flex gap-4 p-4 rounded-xl bg-stone-800/50 backdrop-blur border border-stone-700/50 hover:border-amber-500/30 transition-colors motion-reduce:transition-none"
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={sermon.thumbnailUrl}
                      alt={sermon.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-stone-950/30 flex items-center justify-center">
                      <Play
                        size={16}
                        className="text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-semibold truncate group-hover:text-amber-400 transition-colors motion-reduce:transition-none">
                      {sermon.title}
                    </h4>
                    <p className="text-stone-500 text-xs mt-1">
                      {sermon.preacher}
                    </p>
                    <p className="text-stone-500 text-xs mt-0.5">
                      {formatDate(sermon.publishedAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 4. VISION / ABOUT -- Full-width parallax                     */}
      {/* ============================================================ */}
      <section
        id="vision"
        className="relative py-32 md:py-44 overflow-hidden"
        aria-label="비전"
      >
        {/* Background image */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/80" />
        </div>

        {/* Content */}
        <Container size="md" className="relative z-10">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase mb-6">
              OUR VISION
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              {initialChurchInfo.vision.title.split(",").map((part, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {i === 0 ? (
                    part
                  ) : (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                      {part.trim()}
                    </span>
                  )}
                </span>
              ))}
            </h2>
            <motion.p
              variants={fadeUp(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-stone-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
            >
              {initialChurchInfo.vision.content}
            </motion.p>

            {/* Vision values */}
            <motion.div
              variants={fadeUp(0.3)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {initialChurchInfo.vision.values.map((value) => (
                <Badge
                  key={value}
                  className="bg-amber-500/10 text-amber-400 border-amber-500/30 px-5 py-2 text-sm"
                >
                  {value}
                </Badge>
              ))}
            </motion.div>
          </motion.div>
        </Container>

        {/* Decorative corners */}
        <div
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-amber-400/20"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-amber-400/20"
          aria-hidden="true"
        />
      </section>

      {/* ============================================================ */}
      {/* 6. PASTOR GREETING                                           */}
      {/* ============================================================ */}
      <section
        id="pastor"
        className="bg-stone-950 py-24 md:py-32"
        aria-label="담임목사 인사말"
      >
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            {/* Pastor image */}
            <motion.div
              variants={fadeLeft(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-amber-500/20">
                <Image
                  src={initialChurchInfo.greeting.pastorImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070"}
                  alt={initialChurchInfo.greeting.pastorName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />
              </div>
            </motion.div>

            {/* Greeting text */}
            <motion.div
              variants={fadeRight(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <p className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase mb-4">
                PASTOR&apos;S MESSAGE
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {initialChurchInfo.greeting.title}
              </h2>
              <div className="space-y-4 text-stone-400 text-base md:text-lg leading-relaxed mb-8">
                {initialChurchInfo.greeting.content
                  .split("\n\n")
                  .slice(0, 2)
                  .map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
              </div>
              <p className="text-amber-400/80 font-medium mb-8">
                — {initialChurchInfo.greeting.pastorName}
              </p>
              <Link href={`${basePath}/about`}>
                <Button
                  variant="outline"
                  className="group min-h-[44px] border-stone-700 text-stone-300 hover:border-amber-500/50 hover:text-amber-400 hover:bg-transparent"
                >
                  더 알아보기
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 7. NOTICE (공지사항)                                          */}
      {/* ============================================================ */}
      <section id="notices" className="bg-stone-900 py-24 md:py-32" aria-label="공지사항">
        <Container size="lg">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <p className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
                NOTICE
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                공지사항
              </h2>
            </div>
            <Link href={`${basePath}/news`}>
              <Button
                variant="ghost"
                className="group text-base min-h-[44px] text-stone-400 hover:text-amber-400 hover:bg-transparent"
              >
                전체 보기
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                />
              </Button>
            </Link>
          </motion.div>

          <div className="divide-y divide-stone-800">
            {notices.map((notice, i) => (
              <motion.div
                key={notice.id}
                variants={fadeUp(i * 0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="group flex items-center justify-between py-5 px-4 -mx-4 rounded-lg cursor-pointer hover:bg-stone-800/50 transition-colors motion-reduce:transition-none">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {notice.isPinned && (
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] px-2 py-0.5 flex-shrink-0">
                        고정
                      </Badge>
                    )}
                    <Badge className="bg-stone-700/50 text-stone-400 border-stone-600/50 text-[10px] px-2 py-0.5 flex-shrink-0">
                      {categoryLabels[notice.category] || notice.category}
                    </Badge>
                    <h3 className="text-white text-base md:text-lg font-medium truncate group-hover:text-amber-400 transition-colors motion-reduce:transition-none">
                      {notice.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                    <time className="text-stone-500 text-sm hidden sm:block">
                      {formatDate(notice.createdAt)}
                    </time>
                    <ArrowRight
                      size={16}
                      className="text-stone-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 8. CONTACT / LOCATION                                        */}
      {/* ============================================================ */}
      <section
        id="contact"
        className="bg-stone-950 py-24 md:py-32"
        aria-label="오시는 길"
      >
        <Container size="md">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
              CONTACT
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              오시는 길
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Address */}
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-stone-800/50 backdrop-blur border border-stone-700/50 rounded-xl p-6 text-center hover:border-amber-500/30 transition-colors motion-reduce:transition-none"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <MapPin size={20} className="text-amber-400" aria-hidden="true" />
              </div>
              <h3 className="text-white font-semibold mb-2">주소</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                {initialChurchInfo.location.address}
              </p>
            </motion.div>

            {/* Phone */}
            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-stone-800/50 backdrop-blur border border-stone-700/50 rounded-xl p-6 text-center hover:border-amber-500/30 transition-colors motion-reduce:transition-none"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <Phone size={20} className="text-amber-400" aria-hidden="true" />
              </div>
              <h3 className="text-white font-semibold mb-2">전화</h3>
              <p className="text-stone-400 text-sm">
                {initialChurchInfo.location.phone}
              </p>
              {initialChurchInfo.location.fax && (
                <p className="text-stone-500 text-xs mt-1">
                  FAX {initialChurchInfo.location.fax}
                </p>
              )}
            </motion.div>

            {/* Directions */}
            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-stone-800/50 backdrop-blur border border-stone-700/50 rounded-xl p-6 text-center hover:border-amber-500/30 transition-colors motion-reduce:transition-none"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <ExternalLink size={20} className="text-amber-400" aria-hidden="true" />
              </div>
              <h3 className="text-white font-semibold mb-2">길찾기</h3>
              <a
                href={`https://map.naver.com/v5/search/${encodeURIComponent(initialChurchInfo.location.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-400 text-sm hover:text-amber-300 transition-colors"
              >
                네이버 지도에서 보기
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 9. SOCIAL & CTA -- Bottom section                            */}
      {/* ============================================================ */}
      <section
        id="social"
        className="bg-stone-900 py-24 md:py-32"
        aria-label="소셜 미디어 및 새가족 안내"
      >
        <Container size="md">
          {/* Social media icons */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-amber-400 text-xs font-medium tracking-[0.3em] uppercase mb-6">
              FOLLOW US
            </p>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-14 h-14 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all motion-reduce:transition-none"
                >
                  <social.icon size={22} aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Newcomer CTA */}
          <motion.div
            variants={fadeUp(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Amber gradient background */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600"
              aria-hidden="true"
            />
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative z-10 px-8 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                  <Users
                    size={24}
                    className="text-stone-900/70"
                    aria-hidden="true"
                  />
                  <Badge className="bg-stone-900/20 text-stone-900 border-stone-900/30">
                    Welcome
                  </Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-stone-950 mb-2">
                  처음 오셨나요?
                </h3>
                <p className="text-stone-800 text-base md:text-lg">
                  성락교회는 여러분을 진심으로 환영합니다
                </p>
              </div>

              <Link href={`${basePath}/newcomer`}>
                <Button
                  size="lg"
                  className="bg-stone-950 text-amber-400 hover:bg-stone-900 shadow-xl group min-h-[44px] h-14 px-8 text-base"
                >
                  새가족 안내
                  <ArrowRight
                    size={20}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                  />
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
