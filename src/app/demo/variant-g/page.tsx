"use client";

import { motion, useReducedMotion } from "framer-motion";
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

/** 각 섹션의 메타 정보 (label + id prefix) */
const SECTIONS = [
  { label: "환영", ariaLabel: "환영 섹션으로 이동" },
  { label: "설교", ariaLabel: "설교 섹션으로 이동" },
  { label: "비전", ariaLabel: "비전 섹션으로 이동" },
  { label: "예배", ariaLabel: "예배안내 섹션으로 이동" },
  { label: "새가족", ariaLabel: "새가족 섹션으로 이동" },
  { label: "소식", ariaLabel: "소식 섹션으로 이동" },
] as const;

/** reduced motion 시 즉시 표시되는 static 값 */
const REDUCED_INITIAL = { opacity: 1 } as const;
const REDUCED_ANIMATE = { opacity: 1 } as const;
const INSTANT = { duration: 0 } as const;

/** motion.div 공통: reduced motion 시 즉시 표시 (initial + animate) */
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

/** whileInView 버전 */
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

export default function VariantGPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const shouldReduceMotion = useReducedMotion();
  const getMotionProps = useMotionProps(shouldReduceMotion);
  const getInViewProps = useWhileInViewProps(shouldReduceMotion);

  const featuredSermon = initialSermons[0];
  const recentSermons = initialSermons.slice(1, 4);
  const notices = initialNotices;
  const worships = initialWorships;
  const churchInfo = initialChurchInfo;

  // ------------------------------------------------------------------
  // IntersectionObserver: 현재 보이는 섹션 추적
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
  // 섹션 스크롤 이동
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
  // 도트 네비게이션 키보드: Roving TabIndex (ArrowUp/Down, Home/End, Enter/Space)
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
  // ID 헬퍼
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
      {/* Header - Fixed overlay inside snap container */}
      <Header variant="transparent" />

      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:text-primary-600 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
      >
        본문 바로가기
      </a>

      {/* ===== Side Dot Navigation (role="tablist") ===== */}
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
                  ? "text-white opacity-100"
                  : "text-white/0 group-hover:text-white/60 opacity-0 group-hover:opacity-100",
              )}
            >
              {section.label}
            </span>
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300 block",
                currentSection === i
                  ? "bg-primary-500 scale-125 shadow-lg shadow-primary-500/50"
                  : "bg-white/30 group-hover:bg-white/60",
              )}
              aria-hidden="true"
            />
          </button>
        ))}
      </nav>

      {/* ===== Section 0: Welcome Hero (tabpanel) ===== */}
      <section
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        id={panelId(0)}
        role="tabpanel"
        aria-labelledby={tabId(0)}
        aria-label="환영"
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-neutral-900 via-slate-900 to-neutral-900"
      >
        <span id="main-content" className="absolute" aria-hidden="true" />
        {/* Background Image */}
        <motion.div
          {...(shouldReduceMotion
            ? { initial: { scale: 1 }, animate: { scale: 1 } }
            : {
                initial: { scale: 1.1 },
                animate: { scale: 1 },
                transition: {
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                },
              })}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
            alt="성락교회 배경 이미지"
            fill
            className="object-cover opacity-20"
            priority
          />
        </motion.div>

        {/* Gradient overlays */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-neutral-900/60"
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

          <motion.h1
            {...getMotionProps(
              { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
              0.4,
            )}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          >
            성락교회
          </motion.h1>

          <motion.p
            {...getMotionProps(
              { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
              0.6,
            )}
            className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
              신실한 헌신, 긍휼한 사귐
            </span>
          </motion.p>

          <motion.p
            {...getMotionProps(
              { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
              0.8,
            )}
            className="text-white/60 text-lg md:text-xl mb-10"
          >
            Sincere Devotion, Compassionate Fellowship
          </motion.p>

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
                className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25 h-14 px-8 text-base"
              >
                <Play size={18} className="mr-2" aria-hidden="true" />
                실시간 예배
              </Button>
            </Link>
            <Link href="/demo/variant-g/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white h-14 px-8 text-base"
              >
                교회 소개
              </Button>
            </Link>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        {!shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
            aria-hidden="true"
          >
            <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* ===== Section 1: Featured Sermon (tabpanel) ===== */}
      <section
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        id={panelId(1)}
        role="tabpanel"
        aria-labelledby={tabId(1)}
        aria-label="설교"
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-950 to-slate-900"
      >
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left: Featured Sermon Thumbnail */}
            <motion.div
              {...getInViewProps({
                initial: { opacity: 0, x: -60 },
                animate: { opacity: 1, x: 0 },
              })}
              className="lg:col-span-3"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer">
                <Image
                  src={featuredSermon.thumbnailUrl || "/images/placeholder.jpg"}
                  alt={featuredSermon.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  aria-hidden="true"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors group-hover:bg-primary-500/80"
                  >
                    <Play
                      size={36}
                      className="text-white ml-1"
                      fill="white"
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right: Sermon Info */}
            <motion.div
              {...getInViewProps(
                {
                  initial: { opacity: 0, x: 60 },
                  animate: { opacity: 1, x: 0 },
                },
                0.2,
              )}
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

              {/* Recent Sermons */}
              <div className="space-y-0">
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
                    className={cn(
                      "py-3 cursor-pointer group/item",
                      i < recentSermons.length - 1 &&
                        "border-b border-white/10",
                    )}
                  >
                    <h3 className="text-sm font-medium text-white/80 group-hover/item:text-primary-400 transition-colors line-clamp-1">
                      {sermon.title}
                    </h3>
                    <p className="text-xs text-white/60 mt-1">
                      {formatDate(sermon.publishedAt)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Section 2: Church Vision (tabpanel) ===== */}
      <section
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        id={panelId(2)}
        role="tabpanel"
        aria-labelledby={tabId(2)}
        aria-label="비전"
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-slate-900 to-neutral-900"
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
            <span className="text-[200px] leading-none font-serif text-primary-500/10">
              &ldquo;
            </span>
          </motion.div>

          <motion.h2
            {...getInViewProps(
              { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
              0.2,
            )}
            className="text-4xl md:text-5xl font-bold text-white relative z-10"
          >
            {churchInfo.vision.title}
          </motion.h2>

          <motion.p
            {...getInViewProps(
              { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
              0.4,
            )}
            className="text-lg text-white/60 text-center leading-relaxed mt-6 max-w-prose mx-auto"
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
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/5"
              >
                {value}
              </span>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ===== Section 3: Worship Info (tabpanel) ===== */}
      <section
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        id={panelId(3)}
        role="tabpanel"
        aria-labelledby={tabId(3)}
        aria-label="예배 안내"
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-amber-950/30 to-neutral-900"
      >
        <Container className="relative z-10">
          <div className="text-center mb-12">
            <motion.div
              {...getInViewProps({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              })}
            >
              <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
                <Clock size={12} className="mr-1" aria-hidden="true" />
                Worship
              </Badge>
            </motion.div>
            <motion.h2
              {...getInViewProps(
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                },
                0.1,
              )}
              className="text-4xl font-bold text-white"
            >
              예배 안내
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {worships.map((worship, i) => (
              <motion.article
                key={worship.id}
                {...getInViewProps(
                  {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                  },
                  i * 0.1,
                )}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }
                }
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                tabIndex={0}
              >
                <h3 className="font-medium text-white mb-2">{worship.name}</h3>
                <p className="text-2xl font-bold text-primary-400 mb-1">
                  {worship.time}
                </p>
                <p className="text-white/60 text-sm">{worship.location}</p>
                {worship.description && (
                  <p className="text-white/60 text-xs mt-2">
                    {worship.description}
                  </p>
                )}
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
                className="border-white/20 text-white hover:bg-white/10 group"
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

      {/* ===== Section 4: Newcomer (tabpanel) ===== */}
      <section
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
        id={panelId(4)}
        role="tabpanel"
        aria-labelledby={tabId(4)}
        aria-label="새가족 안내"
        className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-primary-900/50 to-neutral-900"
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-3xl" />
        </div>

        <Container className="relative z-10 text-center">
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
              className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30"
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
            className="text-white/60 text-lg max-w-md mx-auto mb-10"
          >
            성락교회는 여러분을 진심으로 환영합니다.
            <br />
            함께 예배하고 성장하는 공동체가 되길 소망합니다.
          </motion.p>

          <motion.div
            {...getInViewProps(
              { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
              0.6,
            )}
          >
            <Link href="/demo/variant-g/newcomer">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-white/90 shadow-xl h-14 px-10 text-base font-medium group"
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
        </Container>
      </section>

      {/* ===== Section 5: News + Footer (tabpanel) ===== */}
      <section
        ref={(el) => {
          sectionRefs.current[5] = el;
        }}
        id={panelId(5)}
        role="tabpanel"
        aria-labelledby={tabId(5)}
        aria-label="교회 소식"
        className="h-screen snap-start snap-always flex flex-col justify-center relative overflow-hidden bg-gradient-to-b from-neutral-900 to-black"
      >
        {/* Top: News */}
        <div className="flex-1 flex items-center">
          <Container className="relative z-10">
            <div className="text-center mb-8">
              <motion.div
                {...getInViewProps({
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                })}
              >
                <Badge className="bg-white/10 text-white/80 border-white/20 mb-4">
                  News
                </Badge>
              </motion.div>
              <motion.h2
                {...getInViewProps(
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                  },
                  0.1,
                )}
                className="text-3xl font-bold text-white"
              >
                교회 소식
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {notices.map((notice, i) => (
                <motion.article
                  key={notice.id}
                  {...getInViewProps(
                    {
                      initial: { opacity: 0, y: 30 },
                      animate: { opacity: 1, y: 0 },
                    },
                    i * 0.15,
                  )}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 cursor-pointer group transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  tabIndex={0}
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
                  <h3 className="font-medium text-white group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                    {notice.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    <time dateTime={notice.createdAt}>
                      {formatShortDate(notice.createdAt)}
                    </time>
                  </p>
                </motion.article>
              ))}
            </div>

            <motion.div
              {...getInViewProps(
                { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
                0.5,
              )}
              className="text-center mt-6"
            >
              <Link href="/demo/variant-g/news">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 group"
                >
                  전체 소식 보기
                  <ArrowRight
                    size={14}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
            </motion.div>
          </Container>
        </div>

        {/* Bottom: Footer Info */}
        <footer className="pb-8" role="contentinfo">
          <Container>
            <div className="h-px bg-white/10 mb-6" aria-hidden="true" />
            <div className="text-center space-y-2">
              <p className="text-white/60 text-sm font-medium">성락교회</p>
              <address className="not-italic">
                <div className="flex flex-wrap items-center justify-center gap-4 text-white/60 text-xs">
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
              <p className="text-white/50 text-xs">
                &copy; {new Date().getFullYear()} 성락교회. All rights reserved.
              </p>
            </div>
          </Container>
        </footer>
      </section>

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group border border-white/10 min-w-[44px] min-h-[44px] inline-flex items-center"
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
