"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Play,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  ChevronRight,
  Youtube,
  Users,
  Heart,
  BookOpen,
  Pause,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Container } from "@/components/common";
import { Section, SectionHeader } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  SermonCard,
  LiveBadge,
  NewsCard,
  NewcomerCTA,
} from "@/components/home";
import { initialSermons, initialNotices } from "@/mocks/data/initial";
import { reducedMotionVariants, instantTransition } from "@/lib/animations";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073",
    title: "신실한 헌신",
    subtitle: "Sincere Devotion",
    description: "하나님을 향한 진실된 마음으로 예배합니다",
    accent: "from-primary-500 to-amber-400",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1964",
    title: "긍휼한 사귐",
    subtitle: "Compassionate Fellowship",
    description: "서로를 사랑으로 섬기는 공동체입니다",
    accent: "from-rose-500 to-pink-400",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070",
    title: "함께 성장",
    subtitle: "Growing Together",
    description: "말씀 안에서 함께 자라갑니다",
    accent: "from-emerald-500 to-teal-400",
  },
];

const SLIDE_DURATION = 6000;

export default function VariantBPage() {
  const shouldReduceMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  // prefers-reduced-motion 시 자동 재생 초기값을 일시정지로 설정
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLElement>(null);

  // prefers-reduced-motion 활성화 시 자동 재생 중지
  useEffect(() => {
    if (shouldReduceMotion) {
      setIsPaused(true);
    }
  }, [shouldReduceMotion]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
    setProgress(0);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  const togglePause = useCallback(() => {
    // reduced-motion 환경에서는 토글 불가
    if (shouldReduceMotion) return;
    setIsPaused((prev) => !prev);
  }, [shouldReduceMotion]);

  // 키보드 화살표로 슬라이드 전환
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 슬라이더 영역이 포커스를 포함하거나 슬라이더 내 요소가 포커스됐을 때만 처리
      const slider = sliderRef.current;
      if (!slider) return;
      if (
        !slider.contains(document.activeElement) &&
        document.activeElement !== slider
      )
        return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isPaused, nextSlide]);

  const featuredSermon = initialSermons[0];
  const recentSermons = initialSermons.slice(0, 4);
  const notices = initialNotices.slice(0, 3);

  // 슬라이드 이미지 전환 모션 variants
  const slideImageVariants = shouldReduceMotion
    ? reducedMotionVariants
    : {
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0 },
      };

  const slideContentVariants = shouldReduceMotion
    ? reducedMotionVariants
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
      };

  const slideImageTransition = shouldReduceMotion
    ? instantTransition
    : { duration: 1.2 };

  const slideContentTransition = shouldReduceMotion
    ? instantTransition
    : { duration: 0.5 };

  return (
    <div className="min-h-screen bg-white">
      <Header basePath="/demo/variant-b" />

      {/* Hero Section - Enhanced Image Slider */}
      <section
        ref={sliderRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="히어로 슬라이더"
        className="relative h-[90vh] mt-16 md:mt-20 overflow-hidden"
        onMouseEnter={() => {
          if (!shouldReduceMotion) setIsPaused(true);
        }}
        onMouseLeave={() => {
          if (!shouldReduceMotion) setIsPaused(false);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideImageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={slideImageTransition}
            className="absolute inset-0"
            aria-label={`${currentSlide + 1} of ${heroSlides.length}`}
            aria-roledescription="slide"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt={`${heroSlides[currentSlide].title} - ${heroSlides[currentSlide].description}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <Container className="relative z-10 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                shouldReduceMotion ? instantTransition : { delay: 0.3 }
              }
            >
              <LiveBadge className="mb-6" />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={slideContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={slideContentTransition}
              >
                <motion.p
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${heroSlides[currentSlide].accent} font-semibold mb-3 text-lg`}
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  {heroSlides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion ? instantTransition : { delay: 0.5 }
              }
              className="flex gap-4"
            >
              <Link href="/demo/variant-b/sermons">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 group"
                >
                  <Play
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  예배 영상
                </Button>
              </Link>
              <Link href="/demo/variant-b/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  교회 소개
                  <ChevronRight size={18} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>

        {/* Slide Progress Bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20"
          role="progressbar"
          aria-label="슬라이드 진행률"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="h-full bg-primary-500"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>

        {/* Enhanced Slide Controls */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-6">
          {/* Slide Counter */}
          <div
            className="text-white/60 text-sm font-medium"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="sr-only">현재 슬라이드:</span>
            <span className="text-white text-lg">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <span className="mx-1" aria-hidden="true">
              /
            </span>
            <span>{String(heroSlides.length).padStart(2, "0")}</span>
            <span className="sr-only">총 {heroSlides.length}개</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="이전 슬라이드"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>

            {/* 자동 재생 일시정지/재개 버튼 */}
            <button
              onClick={togglePause}
              aria-label={
                isPaused
                  ? "슬라이드 자동 재생 재개"
                  : "슬라이드 자동 재생 일시정지"
              }
              aria-pressed={isPaused}
              disabled={!!shouldReduceMotion}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPaused ? (
                <Play size={18} aria-hidden="true" />
              ) : (
                <Pause size={18} aria-hidden="true" />
              )}
            </button>

            <div
              className="flex gap-2"
              role="tablist"
              aria-label="슬라이드 선택"
            >
              {heroSlides.map((slide, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === currentSlide}
                  aria-label={`슬라이드 ${i + 1}: ${slide.title}`}
                  onClick={() => goToSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 min-w-[8px] min-h-[8px] ${
                    i === currentSlide
                      ? "w-10 bg-primary-500"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="다음 슬라이드"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? instantTransition : { delay: 1 }}
          className="absolute top-1/2 right-8 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-4"
          aria-hidden="true"
        >
          {["예배", "말씀", "교제"].map((text, i) => (
            <motion.div
              key={text}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                shouldReduceMotion
                  ? instantTransition
                  : { delay: 1.2 + i * 0.1 }
              }
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-sm"
            >
              {text}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Quick Info Cards - Enhanced */}
      <Section
        background="white"
        padding="md"
        className="-mt-20 relative z-20"
        aria-label="교회 기본 정보"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Clock,
              title: "예배 시간",
              content: "주일 7:00 / 9:30 / 11:30",
              color: "bg-blue-500",
              link: "/demo/variant-b/worship",
            },
            {
              icon: MapPin,
              title: "오시는 길",
              content: "서울시 구로구 신도림로 56-24",
              color: "bg-emerald-500",
              link: "/demo/variant-b/about#location",
            },
            {
              icon: Phone,
              title: "연락처",
              content: "070-7300-6200",
              color: "bg-amber-500",
              link: "/demo/variant-b/newcomer",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? instantTransition : { delay: i * 0.1 }
              }
            >
              <Link href={item.link}>
                <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-6 flex items-center gap-4 relative">
                    <div
                      className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon
                        className="text-white"
                        size={26}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-neutral-500 mb-0.5">
                        {item.title}
                      </p>
                      <p className="font-semibold text-neutral-900">
                        {item.content}
                      </p>
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-neutral-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
                      aria-hidden="true"
                    />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Stats Section */}
      <Section background="gray" padding="lg" aria-label="교회 현황">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: Users,
              value: "1,500+",
              label: "성도",
              color: "text-blue-500",
            },
            {
              icon: BookOpen,
              value: "25+",
              label: "년 역사",
              color: "text-primary-500",
            },
            {
              icon: Heart,
              value: "20+",
              label: "사역팀",
              color: "text-rose-500",
            },
            {
              icon: Play,
              value: "500+",
              label: "설교 영상",
              color: "text-emerald-500",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? instantTransition : { delay: i * 0.1 }
              }
              className="text-center"
            >
              <motion.div
                whileHover={
                  shouldReduceMotion ? undefined : { scale: 1.1, rotate: 5 }
                }
                className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-white shadow-md flex items-center justify-center ${stat.color}`}
                aria-hidden="true"
              >
                <stat.icon size={28} />
              </motion.div>
              <div className="text-3xl font-bold text-neutral-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Sermons Section - Enhanced */}
      <Section background="white" padding="xl" aria-label="설교">
        <div className="flex items-end justify-between mb-10">
          <div>
            <Badge className="mb-3 bg-primary-100 text-primary-600 hover:bg-primary-200">
              Sermons
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              설교
            </h2>
            <p className="text-neutral-500 mt-2">말씀으로 함께 성장합니다</p>
          </div>
          <Link href="/demo/variant-b/sermons">
            <Button variant="outline" className="group">
              전체 보기
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentSermons.map((sermon, i) => (
            <motion.div
              key={sermon.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? instantTransition : { delay: i * 0.1 }
              }
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            >
              <SermonCard sermon={sermon} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Vision Section - Enhanced */}
      <section
        className="relative py-28 md:py-36 overflow-hidden"
        aria-label="비전"
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070"
            alt=""
            role="presentation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-neutral-900/85" />
        </div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }
            }
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary-400 font-medium mb-4 tracking-widest"
            >
              OUR VISION
            </motion.p>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Sincere Devotion,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                Compassionate Fellowship
              </span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              주님과의 관계 안에서 믿음으로 살아가는 교회. 우리는 하나님을
              사랑하고, 이웃을 사랑하며, 세상을 섬기는 공동체입니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["신실한 헌신", "긍휼한 사귐", "함께 성장"].map((text, i) => (
                <motion.div
                  key={text}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }
                  }
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion
                      ? instantTransition
                      : { delay: 0.2 + i * 0.1 }
                  }
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-primary-400/50 transition-colors"
                >
                  {text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* News & Newcomer - Enhanced */}
      <Section background="gray" padding="xl" aria-label="교회 소식 및 새가족">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Badge className="mb-2 bg-neutral-200 text-neutral-600 hover:bg-neutral-200">
                  News
                </Badge>
                <h2 className="text-2xl font-bold text-neutral-900">
                  교회 소식
                </h2>
              </div>
              <Link href="/demo/variant-b/news">
                <Button variant="ghost" size="sm">
                  전체 보기
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {notices.map((notice, i) => (
                <motion.div
                  key={notice.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion ? instantTransition : { delay: i * 0.1 }
                  }
                >
                  <NewsCard notice={notice} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Newcomer CTA */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <NewcomerCTA variant="minimal" />
            </motion.div>

            {/* YouTube Link - Enhanced */}
            <motion.a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="성락교회 YouTube 채널 바로가기 (새 창)"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              className="block p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white overflow-hidden relative group"
            >
              <div
                className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition-opacity"
                aria-hidden="true"
              >
                <Youtube size={120} />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={24} fill="white" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">YouTube</p>
                  <p className="text-sm text-neutral-400">
                    성락교회 채널 바로가기
                  </p>
                </div>
                <ArrowRight
                  size={20}
                  className="text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all"
                  aria-hidden="true"
                />
              </div>
            </motion.a>

            {/* Quick Links */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white shadow-md"
            >
              <h3 className="font-bold text-neutral-900 mb-4">바로가기</h3>
              <div className="space-y-2">
                {[
                  { label: "예배 안내", href: "/demo/variant-b/worship" },
                  {
                    label: "오시는 길",
                    href: "/demo/variant-b/about#location",
                  },
                  { label: "교회 소개", href: "/demo/variant-b/about" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
                  >
                    <span className="text-neutral-600 group-hover:text-neutral-900">
                      {link.label}
                    </span>
                    <ChevronRight
                      size={18}
                      className="text-neutral-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      <Footer basePath="/demo/variant-b" />

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
