"use client";

import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent,
} from "react";
import {
  Play,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Phone,
  Clock,
  Youtube,
  Instagram,
  Facebook,
  CheckCircle2,
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

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const categoryLabels: Record<string, string> = {
  news: "소식",
  event: "행사",
  weekly: "주보",
};

const SECTIONS = [
  { label: "환영", ariaLabel: "환영 섹션으로 이동" },
  { label: "설교", ariaLabel: "설교 섹션으로 이동" },
  { label: "비전", ariaLabel: "비전 섹션으로 이동" },
  { label: "예배", ariaLabel: "예배안내 섹션으로 이동" },
  { label: "새가족", ariaLabel: "새가족 섹션으로 이동" },
  { label: "소식", ariaLabel: "소식 섹션으로 이동" },
] as const;

/** Dark section indices — hero(0) and newcomer(4) keep dark backgrounds */
const DARK_SECTIONS = new Set([0, 4]);

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2070",
    title: "신실한 헌신, 긍휼한 사귐",
    subtitle: "Sincere Devotion, Compassionate Fellowship",
  },
  {
    image:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073",
    title: "함께 드리는 예배",
    subtitle: "하나님께 올려드리는 거룩한 찬양과 예배",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070",
    title: "말씀 안에서 자라가는 교회",
    subtitle: "진리의 말씀으로 온전케 되는 공동체",
  },
];

/** Grouped worship card data */
const worshipCards = [
  {
    title: "주일예배",
    titleEn: "SUNDAY SERVICE",
    times: ["1부 07:00", "2부 09:30", "3부 11:30"],
    location: "대예배실",
  },
  {
    title: "새벽기도",
    titleEn: "DAWN PRAYER",
    times: ["월~토 05:00"],
    location: "새벽기도실",
  },
  {
    title: "수요예배",
    titleEn: "WEDNESDAY SERVICE",
    times: ["수 19:30"],
    location: "대예배실",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const REDUCED_INITIAL = { opacity: 1 } as const;
const REDUCED_ANIMATE = { opacity: 1 } as const;
const INSTANT = { duration: 0 } as const;

function useMotionProps(shouldReduceMotion: boolean | null) {
  return useCallback(
    (
      variants: {
        initial: Record<string, number>;
        animate: Record<string, number>;
      },
      delay = 0,
    ) =>
      shouldReduceMotion
        ? {
            initial: REDUCED_INITIAL,
            animate: REDUCED_ANIMATE,
            transition: INSTANT,
          }
        : {
            initial: variants.initial,
            animate: variants.animate,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1] as const,
              delay,
            },
          },
    [shouldReduceMotion],
  );
}

function useWhileInViewProps(shouldReduceMotion: boolean | null) {
  return useCallback(
    (
      variants: {
        initial: Record<string, number>;
        animate: Record<string, number>;
      },
      delay = 0,
    ) =>
      shouldReduceMotion
        ? {
            initial: REDUCED_INITIAL,
            whileInView: REDUCED_ANIMATE,
            viewport: { once: true } as const,
            transition: INSTANT,
          }
        : {
            initial: variants.initial,
            whileInView: variants.animate,
            viewport: { once: true } as const,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1] as const,
              delay,
            },
          },
    [shouldReduceMotion],
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function VariantGPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const shouldReduceMotion = useReducedMotion();
  const getMotionProps = useMotionProps(shouldReduceMotion);
  const getInViewProps = useWhileInViewProps(shouldReduceMotion);

  const featuredSermon = initialSermons[0];
  const recentSermons = initialSermons.slice(0, 3);
  const notices = initialNotices;
  const churchInfo = initialChurchInfo;

  const isDarkSection = DARK_SECTIONS.has(currentSection);

  // ------------------------------------------------------------------
  // Hero slider auto-play
  // ------------------------------------------------------------------
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!shouldReduceMotion) {
      autoplayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    }
  }, [shouldReduceMotion]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    resetAutoplay();
  }, [resetAutoplay]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
    resetAutoplay();
  }, [resetAutoplay]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [resetAutoplay]);

  // ------------------------------------------------------------------
  // IntersectionObserver: track visible section
  // ------------------------------------------------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(
              entry.target as HTMLElement,
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

  // ------------------------------------------------------------------
  // Section scroll
  // ------------------------------------------------------------------
  const scrollToSection = useCallback(
    (index: number) => {
      sectionRefs.current[index]?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    },
    [shouldReduceMotion],
  );

  // ------------------------------------------------------------------
  // Dot nav keyboard: Roving TabIndex
  // ------------------------------------------------------------------
  const handleDotKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      const count = SECTIONS.length;
      let newIndex = currentSection;
      let handled = true;

      switch (e.key) {
        case "ArrowUp":
          newIndex = (currentSection - 1 + count) % count;
          break;
        case "ArrowDown":
          newIndex = (currentSection + 1) % count;
          break;
        case "Home":
          newIndex = 0;
          break;
        case "End":
          newIndex = count - 1;
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          scrollToSection(currentSection);
          return;
        default:
          handled = false;
      }

      if (handled) {
        e.preventDefault();
        scrollToSection(newIndex);
        dotRefs.current[newIndex]?.focus();
      }
    },
    [currentSection, scrollToSection],
  );

  // ------------------------------------------------------------------
  // ID helpers
  // ------------------------------------------------------------------
  const tabId = (i: number) => `variant-g-tab-${i}`;
  const panelId = (i: number) => `variant-g-panel-${i}`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-screen overflow-y-auto snap-y",
        shouldReduceMotion ? "snap-proximity" : "snap-mandatory",
      )}
    >
      {/* Header — switches between transparent(dark) and default(light) */}
      <Header variant={isDarkSection ? "transparent" : "default"} />

      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:text-primary-600 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
      >
        본문 바로가기
      </a>

      {/* ===== Side Dot Navigation ===== */}
      <nav
        role="tablist"
        aria-label="페이지 섹션 네비게이션"
        aria-orientation="vertical"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
        onKeyDown={handleDotKeyDown}
      >
        {SECTIONS.map((section, i) => (
          <button
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            id={tabId(i)}
            role="tab"
            aria-label={section.ariaLabel}
            aria-selected={currentSection === i}
            aria-controls={panelId(i)}
            tabIndex={currentSection === i ? 0 : -1}
            onClick={() => scrollToSection(i)}
            className="group flex items-center gap-2 min-w-[44px] min-h-[44px] justify-end focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
          >
            <span
              className={cn(
                "text-xs transition-all duration-300",
                currentSection === i
                  ? isDarkSection
                    ? "text-white opacity-100"
                    : "text-neutral-700 opacity-100"
                  : isDarkSection
                    ? "text-white/0 group-hover:text-white/60 opacity-0 group-hover:opacity-100"
                    : "text-neutral-400/0 group-hover:text-neutral-500 opacity-0 group-hover:opacity-100",
              )}
            >
              {section.label}
            </span>
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300 block",
                currentSection === i
                  ? "bg-primary-500 scale-125 shadow-lg shadow-primary-500/50"
                  : isDarkSection
                    ? "bg-white/30 group-hover:bg-white/60"
                    : "bg-neutral-300 group-hover:bg-neutral-400",
              )}
              aria-hidden="true"
            />
          </button>
        ))}
      </nav>

      {/* ===== Section 0: Hero (Dark — Warm tone with image slider) ===== */}
      <section
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        id={panelId(0)}
        role="tabpanel"
        aria-labelledby={tabId(0)}
        aria-label="환영"
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-stone-900 via-amber-950/80 to-stone-900"
      >
        <span id="main-content" className="absolute" aria-hidden="true" />

        {/* Background Image Slider */}
        {heroSlides.map((slide, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ opacity: i === currentSlide ? 1 : 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 1.2 }
            }
            className="absolute inset-0"
            aria-hidden={i !== currentSlide}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              className="object-cover opacity-40"
            />
          </motion.div>
        ))}

        {/* Gradient overlays */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-stone-900/40"
          aria-hidden="true"
        />

        {/* Content */}
        <Container className="relative z-10 text-center">
          <motion.div
            {...getMotionProps(
              { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
              0.2,
            )}
          >
            <LiveBadge className="flex justify-center mb-8" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-white/60 text-lg md:text-xl mb-10">
                {heroSlides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            {...getMotionProps(
              { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
              1.0,
            )}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/demo/variant-g/sermons">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary-500 to-amber-500 hover:from-primary-600 hover:to-amber-600 text-white shadow-lg shadow-primary-500/25 h-14 px-8 text-base"
              >
                <Play size={18} className="mr-2" aria-hidden="true" />
                실시간 예배
              </Button>
            </Link>
            <Link href="/demo/variant-g/about">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-300/40 bg-transparent text-white hover:bg-white/10 hover:text-white h-14 px-8 text-base"
              >
                교회 소개
              </Button>
            </Link>
          </motion.div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentSlide(i);
                  resetAutoplay();
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === currentSlide
                    ? "bg-primary-400 w-8"
                    : "bg-white/30 w-4 hover:bg-white/50",
                )}
                aria-label={`슬라이드 ${i + 1}`}
              />
            ))}
          </div>
        </Container>

        {/* Scroll Indicator */}
        {!shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-primary-300/70">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="w-px h-8 bg-gradient-to-b from-primary-400/60 to-transparent"
            />
          </motion.div>
        )}
      </section>

      {/* ===== Section 1: Featured Sermon (Light) ===== */}
      <section
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        id={panelId(1)}
        role="tabpanel"
        aria-labelledby={tabId(1)}
        aria-label="설교"
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-neutral-50"
      >
        <Container className="relative z-10">
          {/* Section label */}
          <motion.div
            {...getInViewProps({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            })}
            className="mb-8"
          >
            <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-2">
              SERMON
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary-400 to-amber-300" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left: Featured Sermon Thumbnail */}
            <motion.div
              {...getInViewProps({
                initial: { opacity: 0, x: -40 },
                animate: { opacity: 1, x: 0 },
              })}
              className="lg:col-span-3"
            >
              <Link
                href="/demo/variant-g/sermons"
                className="relative aspect-video rounded-2xl overflow-hidden group block shadow-xl shadow-neutral-200/50"
              >
                <Image
                  src={featuredSermon.thumbnailUrl || "/images/placeholder.jpg"}
                  alt={featuredSermon.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
                  aria-hidden="true"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play
                      size={36}
                      className="text-neutral-900 ml-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Bottom info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-2">
                    최신 설교
                  </span>
                  <h3 className="text-white text-xl font-bold">
                    {featuredSermon.title}
                  </h3>
                </div>
              </Link>
            </motion.div>

            {/* Right: Sermon Info */}
            <motion.div
              {...getInViewProps(
                {
                  initial: { opacity: 0, x: 40 },
                  animate: { opacity: 1, x: 0 },
                },
                0.2,
              )}
              className="lg:col-span-2"
            >
              <Badge className="bg-primary-50 text-primary-700 border-primary-200 mb-4">
                Featured Sermon
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3 leading-tight">
                {featuredSermon.title}
              </h2>
              <p className="text-neutral-500 mb-6">
                {featuredSermon.preacher} &middot;{" "}
                {formatDate(featuredSermon.publishedAt)}
              </p>
              <Link href="/demo/variant-g/sermons">
                <Button className="bg-primary-500 hover:bg-primary-600 text-white group mb-8">
                  설교 듣기
                  <ArrowRight
                    size={16}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </Link>

              {/* Recent Sermons with thumbnails */}
              <div className="space-y-3">
                {recentSermons.map((sermon, i) => (
                  <motion.div
                    key={sermon.id}
                    {...getInViewProps(
                      {
                        initial: { opacity: 0, y: 15 },
                        animate: { opacity: 1, y: 0 },
                      },
                      0.4 + i * 0.1,
                    )}
                    className="group/item flex gap-3 p-3 rounded-xl bg-white border border-neutral-100 hover:border-neutral-300 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={sermon.thumbnailUrl || "/images/placeholder.jpg"}
                        alt={sermon.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play size={12} className="text-white" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-neutral-800 group-hover/item:text-primary-600 transition-colors line-clamp-1">
                        {sermon.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        {formatDate(sermon.publishedAt)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Section 2: Church Vision (Light + Warm Glow) ===== */}
      <section
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        id={panelId(2)}
        role="tabpanel"
        aria-labelledby={tabId(2)}
        aria-label="비전"
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-50 via-white to-white"
      >
        <Container className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Decorative Quote Mark */}
          <motion.div
            {...getInViewProps({
              initial: { opacity: 0, scale: 0.5 },
              animate: { opacity: 1, scale: 1 },
            })}
            className="absolute -top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none"
            aria-hidden="true"
          >
            <span className="text-[200px] leading-none font-serif text-primary-200">
              &ldquo;
            </span>
          </motion.div>

          <motion.p
            {...getInViewProps({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            })}
            className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-6 relative z-10"
          >
            OUR VISION
          </motion.p>

          <motion.h2
            {...getInViewProps(
              { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
              0.2,
            )}
            className="text-4xl md:text-5xl font-bold text-neutral-900 relative z-10"
          >
            {churchInfo.vision.title}
          </motion.h2>

          {/* Gold divider */}
          <motion.div
            {...getInViewProps(
              { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 } },
              0.3,
            )}
            className="flex justify-center my-6"
          >
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary-400 to-amber-300 rounded-full" />
          </motion.div>

          <motion.p
            {...getInViewProps(
              { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
              0.4,
            )}
            className="text-lg text-neutral-500 text-center leading-relaxed max-w-prose mx-auto"
          >
            {churchInfo.vision.content}
          </motion.p>

          <motion.div
            {...getInViewProps(
              { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
              0.6,
            )}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            {churchInfo.vision.values.map((value, i) => (
              <span
                key={i}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary-50 text-primary-800 text-sm font-medium border border-primary-200"
              >
                {value}
              </span>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ===== Section 3: Worship Info (Light + Grouped Cards) ===== */}
      <section
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        id={panelId(3)}
        role="tabpanel"
        aria-labelledby={tabId(3)}
        aria-label="예배 안내"
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-neutral-50"
      >
        <Container className="relative z-10">
          <div className="text-center mb-12">
            <motion.div
              {...getInViewProps({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              })}
            >
              <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
                WORSHIP
              </p>
            </motion.div>
            <motion.h2
              {...getInViewProps(
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                },
                0.1,
              )}
              className="text-3xl md:text-5xl font-bold text-neutral-900"
            >
              예배 안내
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {worshipCards.map((card, i) => (
              <motion.article
                key={card.title}
                {...getInViewProps(
                  {
                    initial: { opacity: 0, y: 30, scale: 0.95 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                  },
                  i * 0.12,
                )}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -4 }
                }
                className="bg-white rounded-2xl p-8 border border-neutral-100 border-t-2 border-t-primary-400 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                tabIndex={0}
              >
                <p className="text-neutral-400 text-xs font-medium tracking-[0.2em] uppercase mb-2">
                  {card.titleEn}
                </p>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                  {card.title}
                </h3>

                <div className="space-y-3 mb-4">
                  {card.times.map((time) => (
                    <div key={time} className="flex items-center gap-3">
                      <Clock
                        size={16}
                        className="text-neutral-400 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-neutral-600">{time}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3">
                    <MapPin
                      size={16}
                      className="text-neutral-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-neutral-600">{card.location}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            {...getInViewProps(
              { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
              0.6,
            )}
            className="text-center mt-8"
          >
            <Link href="/demo/variant-g/worship">
              <Button
                variant="outline"
                className="border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 group"
              >
                예배 안내 자세히 보기
                <ArrowRight
                  size={16}
                  className="ml-1 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* ===== Section 4: Newcomer (Dark — Image background) ===== */}
      <section
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
        id={panelId(4)}
        role="tabpanel"
        aria-labelledby={tabId(4)}
        aria-label="새가족 안내"
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1529070538774-1560d23cee93?q=80&w=2070"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Heart Icon */}
            <motion.div
              {...(shouldReduceMotion
                ? {
                    initial: { opacity: 1, scale: 1 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: true },
                    transition: INSTANT,
                  }
                : {
                    initial: { opacity: 0, scale: 0 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: true },
                    transition: { type: "spring", stiffness: 200, damping: 15 },
                  })}
              className="flex justify-center mb-8"
            >
              <motion.div
                {...(shouldReduceMotion
                  ? {}
                  : {
                      animate: { scale: [1, 1.08, 1] },
                      transition: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      },
                    })}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-amber-400 flex items-center justify-center shadow-lg shadow-primary-500/30"
                aria-hidden="true"
              >
                <Heart size={36} className="text-white" fill="white" />
              </motion.div>
            </motion.div>

            <motion.h2
              {...getInViewProps(
                { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
                0.2,
              )}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              처음 오셨나요?
            </motion.h2>

            <motion.p
              {...getInViewProps(
                { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
                0.4,
              )}
              className="text-white/70 text-lg max-w-md mx-auto mb-8"
            >
              성락교회는 여러분을 진심으로 환영합니다.
              <br />
              함께 예배하고 성장하는 공동체가 되길 소망합니다.
            </motion.p>

            {/* Benefit points */}
            <motion.div
              {...getInViewProps(
                { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
                0.5,
              )}
              className="flex flex-col items-center gap-3 mb-10"
            >
              {[
                "편안한 분위기의 예배 안내",
                "새가족 맞이 담당자가 함께합니다",
                "주일 예배 후 새가족 환영 모임",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-white/80 text-sm"
                >
                  <CheckCircle2 size={16} className="text-primary-400 flex-shrink-0" aria-hidden="true" />
                  {text}
                </div>
              ))}
            </motion.div>

            <motion.div
              {...getInViewProps(
                { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
                0.7,
              )}
            >
              <Link href="/demo/variant-g/newcomer">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-white/90 shadow-2xl h-14 px-10 text-base font-medium group"
                >
                  새가족 안내
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Section 5: News + Footer (Light) ===== */}
      <section
        ref={(el) => {
          sectionRefs.current[5] = el;
        }}
        id={panelId(5)}
        role="tabpanel"
        aria-labelledby={tabId(5)}
        aria-label="교회 소식"
        className="h-screen snap-start snap-always flex flex-col justify-center relative overflow-hidden bg-white"
      >
        {/* Top: News */}
        <div className="flex-1 flex items-center">
          <Container className="relative z-10">
            <div className="flex items-end justify-between mb-8">
              <motion.div
                {...getInViewProps({
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                })}
              >
                <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-2">
                  NEWS
                </p>
                <h2 className="text-3xl font-bold text-neutral-900">
                  교회 소식
                </h2>
              </motion.div>
              <Link href="/demo/variant-g/news">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-neutral-400 hover:text-neutral-900 hover:bg-transparent group"
                >
                  전체 보기
                  <ArrowRight
                    size={14}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {notices.map((notice, i) => (
                <motion.article
                  key={notice.id}
                  {...getInViewProps(
                    {
                      initial: { opacity: 0, y: 30, scale: 0.95 },
                      animate: { opacity: 1, y: 0, scale: 1 },
                    },
                    i * 0.12,
                  )}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="bg-white rounded-xl p-5 cursor-pointer group transition-all border border-neutral-100 hover:border-neutral-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  tabIndex={0}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "border-none text-xs",
                        notice.category === "event"
                          ? "bg-amber-50 text-amber-700"
                          : notice.category === "news"
                            ? "bg-primary-50 text-primary-700"
                            : "bg-neutral-100 text-neutral-600",
                      )}
                    >
                      {categoryLabels[notice.category] || notice.category}
                    </Badge>
                    {notice.isPinned && (
                      <Badge className="bg-primary-50 text-primary-600 border-primary-200 text-xs">
                        고정
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-medium text-neutral-800 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                    {notice.title}
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    <time dateTime={notice.createdAt}>
                      {formatShortDate(notice.createdAt)}
                    </time>
                  </p>
                </motion.article>
              ))}
            </div>

            {/* Social media links */}
            <motion.div
              {...getInViewProps(
                { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
                0.5,
              )}
              className="flex justify-center gap-4 mt-10"
            >
              {[
                { icon: Youtube, label: "YouTube" },
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:border-neutral-900 transition-all"
                >
                  <social.icon size={18} aria-hidden="true" />
                </a>
              ))}
            </motion.div>
          </Container>
        </div>

        {/* Bottom: Footer Info */}
        <footer className="pb-8" role="contentinfo">
          <Container>
            <div className="h-px bg-neutral-200 mb-6" aria-hidden="true" />
            <div className="text-center space-y-2">
              <p className="text-neutral-500 text-sm font-medium">성락교회</p>
              <address className="not-italic">
                <div className="flex flex-wrap items-center justify-center gap-4 text-neutral-400 text-xs">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} aria-hidden="true" />
                    {churchInfo.location.address}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Phone size={12} aria-hidden="true" />
                    {churchInfo.location.phone}
                  </span>
                </div>
              </address>
              <p className="text-neutral-300 text-xs">
                &copy; {new Date().getFullYear()} 성락교회. All rights reserved.
              </p>
            </div>
          </Container>
        </footer>
      </section>

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className={cn(
          "fixed bottom-6 right-6 z-50 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transition-colors text-sm group border min-w-[44px] min-h-[44px] inline-flex items-center",
          isDarkSection
            ? "bg-neutral-900/80 text-white hover:bg-neutral-800 border-white/10"
            : "bg-white/90 text-neutral-700 hover:bg-neutral-100 border-neutral-200",
        )}
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
