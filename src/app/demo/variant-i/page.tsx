"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef, useCallback, useId } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Clock,
  MapPin,
  Users,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SermonCard, NewsCard } from "@/components/home";
import {
  initialSermons,
  initialNotices,
  initialWorships,
  initialChurchInfo,
} from "@/mocks/data/initial";

const sermons = initialSermons;
const notices = initialNotices.slice(0, 3);
const worships = initialWorships;
const churchInfo = initialChurchInfo;

// ─────────────────────────────────────────────────────────────────────────────
// Animation variant factories
// ─────────────────────────────────────────────────────────────────────────────

/** Fade-in-up variant for mount animations (initial → animate) */
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

/** Slide-in-x variant for scroll-triggered animations */
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

/** Scale + fade variant */
const makeScaleFadeIn = (
  delay: number,
  duration: number,
  reduced: boolean | null,
): Variants => ({
  hidden: reduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: reduced ? { duration: 0 } : { duration, delay },
  },
});

/** Fade-only variant */
const makeFadeIn = (delay: number, reduced: boolean | null): Variants => ({
  hidden: reduced ? { opacity: 1 } : { opacity: 0 },
  visible: {
    opacity: 1,
    transition: reduced ? { duration: 0 } : { duration: 0.6, delay },
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────────────────────────────────────

export default function VariantIPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const carouselId = useId();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // useTransform hooks must be called unconditionally.
  // Pass undefined to motion.div style props when reduced motion is preferred.
  const heroTextYRaw = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroImageXRaw = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const heroTextY = prefersReducedMotion ? undefined : heroTextYRaw;
  const heroImageX = prefersReducedMotion ? undefined : heroImageXRaw;

  const scrollCarousel = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  /** Keyboard handler for carousel: ArrowLeft / ArrowRight scrolls the track */
  const handleCarouselKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollCarousel("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollCarousel("right");
      }
    },
    [scrollCarousel],
  );

  const greetingParagraphs = churchInfo.greeting.content.split("\n\n");
  const rm = prefersReducedMotion; // shorthand

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Paper Texture Overlay — purely decorative */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <Header />

      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:text-primary-600 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
      >
        본문 바로가기
      </a>

      {/* ===== Editorial Hero (80vh) ===== */}
      <section
        id="main-content"
        ref={heroRef}
        aria-label="성락교회 메인 소개"
        className="relative min-h-[80vh] bg-[#FAF8F3] mt-16 md:mt-20 overflow-hidden"
      >
        <Container size="xl" className="h-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[calc(80vh-5rem)] py-12 lg:py-0">
            {/* Left side - 60% (3/5) */}
            <motion.div
              style={{ y: heroTextY }}
              className="lg:col-span-3 order-2 lg:order-1"
            >
              <motion.p
                variants={makeFadeInUp(20, 0, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-6"
              >
                SUNGRAK CHURCH
              </motion.p>

              <motion.h1
                variants={makeFadeInUp(30, 0.1, 0.8, rm)}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight mb-6"
              >
                신실한 헌신,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-600">
                  긍휼한 사귐
                </span>
              </motion.h1>

              <motion.p
                variants={makeFadeInUp(20, 0.2, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="text-lg text-neutral-500 mb-10 tracking-wide"
              >
                Sincere Devotion, Compassionate Fellowship
              </motion.p>

              <motion.div
                variants={makeFadeInUp(20, 0.3, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/live">
                  <Button
                    size="lg"
                    className="min-w-[160px] h-13 text-base group shadow-lg shadow-primary-500/20"
                  >
                    <Play
                      size={20}
                      aria-hidden="true"
                      className="group-hover:scale-110 transition-transform"
                    />
                    실시간 예배
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="min-w-[160px] h-13 text-base group border-2"
                  >
                    교회 소개
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right side - 40% (2/5) */}
            <motion.div
              style={{ x: heroImageX }}
              className="lg:col-span-2 order-1 lg:order-2 relative"
            >
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
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform rotate-2"
              >
                <Image
                  src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
                  alt="성락교회 예배당 외관"
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                />
              </motion.div>

              {/* Decorative element behind image */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-primary-200 -z-10 transform -rotate-1"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Sermon Horizontal Carousel ===== */}
      <section aria-label="최신 설교" className="bg-white py-20">
        <Container size="xl">
          {/* Header row */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <motion.p
                variants={makeFadeInX(-20, 0, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-2"
              >
                SERMONS
              </motion.p>
              <motion.h2
                variants={makeFadeInUp(20, 0, 0.6, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-neutral-900"
              >
                최신 설교
              </motion.h2>
            </div>
            <div className="flex items-center gap-3">
              {/* Scroll arrows */}
              <button
                type="button"
                onClick={() => scrollCarousel("left")}
                className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-300 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                aria-label="이전 설교로 이동"
                aria-controls={`carousel-${carouselId}`}
              >
                <ArrowLeft
                  size={18}
                  aria-hidden="true"
                  className="text-neutral-600"
                />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel("right")}
                className="w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-300 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                aria-label="다음 설교로 이동"
                aria-controls={`carousel-${carouselId}`}
              >
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="text-neutral-600"
                />
              </button>
              <Link href="/sermons" className="hidden sm:block">
                <Button variant="ghost" className="group text-base">
                  전체 보기
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        {/* Horizontal scroll container — carousel landmark */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="설교 목록"
        >
          <div
            id={`carousel-${carouselId}`}
            ref={scrollContainerRef}
            tabIndex={0}
            onKeyDown={handleCarouselKeyDown}
            className="flex gap-6 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory scrollbar-hide focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
            aria-label="설교 카드 목록 (좌우 화살표 키로 스크롤)"
          >
            {/* Left spacer for alignment with container */}
            <div
              aria-hidden="true"
              className="shrink-0 w-0 lg:w-[calc((100vw-80rem)/2)]"
            />

            {sermons.map((sermon, i) => (
              <motion.div
                key={sermon.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`설교 ${i + 1} / ${sermons.length}: ${sermon.title}`}
                variants={makeFadeInX(40, i * 0.1, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="min-w-[320px] md:min-w-[380px] shrink-0 snap-start"
              >
                <SermonCard sermon={sermon} />
              </motion.div>
            ))}

            {/* Right spacer */}
            <div
              aria-hidden="true"
              className="shrink-0 w-4 lg:w-[calc((100vw-80rem)/2)]"
            />
          </div>
        </div>

        {/* Mobile "View All" link */}
        <div className="sm:hidden mt-6 text-center">
          <Link href="/sermons">
            <Button variant="ghost" className="group text-base">
              전체 보기
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </div>
      </section>

      {/* ===== Pull-Quote Vision Section ===== */}
      <section
        aria-label="교회 비전"
        className="bg-[#F5F0E8] py-24 overflow-hidden"
      >
        <Container size="md">
          <div className="relative max-w-4xl mx-auto text-center px-4">
            {/* Decorative open quote — purely visual */}
            <motion.div
              aria-hidden="true"
              variants={makeScaleFadeIn(0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute -top-8 left-0 md:left-8 select-none pointer-events-none"
            >
              <span className="text-[120px] md:text-[150px] text-primary-200 leading-none font-serif">
                &ldquo;
              </span>
            </motion.div>

            <blockquote cite="/about">
              {/* Vision title */}
              <motion.h2
                variants={makeFadeInUp(30, 0.1, 0.8, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-3xl md:text-4xl italic text-neutral-800 font-bold leading-snug pt-16 md:pt-20 mb-8"
              >
                {churchInfo.vision.title}
              </motion.h2>

              {/* Vision content */}
              <motion.p
                variants={makeFadeInUp(20, 0.2, 0.6, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-10 max-w-3xl mx-auto"
              >
                {churchInfo.vision.content}
              </motion.p>
            </blockquote>

            {/* Values as inline list */}
            <motion.div
              variants={makeFadeInUp(20, 0.3, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {churchInfo.vision.values.map((value, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 text-neutral-700 text-sm font-medium backdrop-blur-sm border border-primary-100"
                >
                  <Heart
                    size={14}
                    aria-hidden="true"
                    className="text-primary-400"
                  />
                  {value}
                </span>
              ))}
            </motion.div>

            {/* Decorative close quote — purely visual */}
            <motion.div
              aria-hidden="true"
              variants={makeScaleFadeIn(0.2, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute -bottom-12 right-0 md:right-8 select-none pointer-events-none"
            >
              <span className="text-[120px] md:text-[150px] text-primary-200 leading-none font-serif">
                &rdquo;
              </span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Church Introduction - Image LEFT, Text RIGHT ===== */}
      <section aria-label="성락교회 소개" className="bg-[#FAF8F3] py-20">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              variants={makeFadeInX(-40, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1964"
                  alt="성락교회 예배당 내부"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative border behind */}
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-primary-200/50 -z-10"
              />
            </motion.div>

            {/* Right - Text */}
            <motion.div
              variants={makeFadeInX(40, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-3">
                ABOUT
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
                성락교회를
                <br />
                소개합니다
              </h2>

              <div className="space-y-4 mb-8">
                {greetingParagraphs.slice(0, 2).map((paragraph, i) => (
                  <motion.p
                    key={i}
                    variants={makeFadeInUp(10, 0.1 * (i + 1), 0.5, rm)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-neutral-600 leading-relaxed text-lg max-w-prose"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Tags */}
              <motion.div
                variants={makeFadeInUp(10, 0.3, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {["예배", "교육", "선교", "교제"].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-4 py-1.5 rounded-full text-sm bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-100"
                  >
                    {tag}
                  </Badge>
                ))}
              </motion.div>

              <motion.div
                variants={makeFadeInUp(10, 0.4, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2 text-base"
                  >
                    자세히 보기
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Worship Info - Text LEFT, Image RIGHT (flipped) ===== */}
      <section aria-label="예배 안내" className="bg-white py-20">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              variants={makeFadeInX(-40, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <p className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-3">
                WORSHIP
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 leading-tight">
                예배 안내
              </h2>

              <div className="space-y-5">
                {worships.map((worship, i) => (
                  <motion.div
                    key={worship.id}
                    variants={makeFadeInUp(15, i * 0.08, 0.4, rm)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="border-l-2 border-primary-500 pl-4 py-1 group hover:border-primary-400 transition-colors"
                  >
                    <h3 className="font-medium text-neutral-900 text-lg group-hover:text-primary-600 transition-colors">
                      {worship.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-neutral-500">
                      <span className="flex items-center gap-1 text-sm">
                        <Clock size={14} aria-hidden="true" />
                        {worship.time}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <MapPin size={14} aria-hidden="true" />
                        {worship.location}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={makeFadeInUp(10, 0.5, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8"
              >
                <Link href="/worship">
                  <Button variant="outline" className="group border-2">
                    예배 안내 전체 보기
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              variants={makeFadeInX(40, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070"
                  alt="성락교회 예배 모습"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative border */}
              <div
                aria-hidden="true"
                className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-2 border-primary-200/50 -z-10"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== News Section ===== */}
      <section aria-label="교회 소식" className="bg-[#FAF8F3] py-20">
        <Container size="xl">
          <div className="text-center mb-12">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-2"
            >
              LATEST NEWS
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-neutral-900"
            >
              교회 소식
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notices.map((notice, i) => (
              <motion.div
                key={notice.id}
                variants={makeFadeInUp(30, i * 0.1, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={rm ? undefined : { y: -5 }}
              >
                <NewsCard notice={notice} />
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={makeFadeIn(0.4, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/news">
              <Button variant="ghost" className="group text-base">
                소식 더 보기
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* ===== Newcomer CTA ===== */}
      <section aria-label="새가족 안내" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700"
        />
        {/* Decorative dot pattern — aria-hidden */}
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              variants={makeFadeInX(-30, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Users size={12} aria-hidden="true" className="mr-1" />
                Welcome
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                처음 오셨나요?
              </h2>
              <p className="text-white/80 text-lg max-w-md">
                성락교회는 여러분을 진심으로 환영합니다. 함께 예배하고 성장하는
                공동체가 되길 소망합니다.
              </p>
            </motion.div>

            <motion.div
              variants={makeFadeInX(30, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link href="/newcomer">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-white/90 shadow-xl group h-14 px-8 text-base"
                >
                  새가족 안내
                  <ArrowRight
                    size={20}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer />

      {/* Back to Demo Selection */}
      <Link
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
      </Link>
    </div>
  );
}
