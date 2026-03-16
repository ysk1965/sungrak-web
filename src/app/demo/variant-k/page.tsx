"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  ArrowDown,
  Play,
  Clock,
  MapPin,
  Youtube,
  Instagram,
  Facebook,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
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

/* ------------------------------------------------------------------ */
/*  Hero slide data                                                    */
/* ------------------------------------------------------------------ */

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2070",
    title: "21세기 다윗의 행렬",
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

/* ------------------------------------------------------------------ */
/*  Worship card data                                                  */
/* ------------------------------------------------------------------ */

const worshipCards = [
  {
    title: "주일예배",
    titleEn: "SUNDAY SERVICE",
    times: ["1부 07:00", "2부 09:30", "3부 11:30"],
    location: "대예배실",
    href: "worship",
  },
  {
    title: "새벽기도",
    titleEn: "DAWN PRAYER",
    times: ["월~토 05:00"],
    location: "새벽기도실",
    href: "worship",
  },
  {
    title: "수요예배",
    titleEn: "WEDNESDAY SERVICE",
    times: ["수 19:30"],
    location: "대예배실",
    href: "worship",
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function VariantKPage() {
  const shouldReduceMotion = useReducedMotion();
  const basePath = useBasePath();
  const [currentSlide, setCurrentSlide] = useState(0);

  const notices = initialNotices.slice(0, 5);
  const latestSermon = initialSermons[0];

  const fadeUp = (delay = 0) =>
    makeFadeInUp(30, delay, 0.7, shouldReduceMotion);

  /* Auto-play slider */
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, nextSlide]);

  return (
    <>
      {/* ============================================================ */}
      {/* 1. HERO SLIDER -- Full-width fade slider (1516 style)        */}
      {/* ============================================================ */}
      <section
        id="variant-k-content"
        className="relative h-screen overflow-hidden"
        aria-label="메인 히어로 슬라이더"
      >
        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt=""
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Hero content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  shouldReduceMotion ? undefined : { opacity: 0, y: -20 }
                }
                transition={{ duration: 0.6 }}
              >
                <p className="text-white/80 text-sm md:text-base font-medium tracking-[0.4em] uppercase mb-6">
                  SUNGRAK CHURCH
                </p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05]">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-white/70 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="이전 슬라이드"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="다음 슬라이드"
        >
          <ChevronRight size={24} />
        </button>

        {/* Pagination bullets */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`슬라이드 ${i + 1}`}
              aria-current={i === currentSlide ? "true" : undefined}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.2 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20"
          aria-hidden="true"
        >
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={20} className="text-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* 2. OUR VISION -- Scripture + vision text (center aligned)     */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-white" aria-label="비전">
        <Container size="md">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-4">
              OUR VISION
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-8 leading-tight">
              {initialChurchInfo.vision.title}
            </h2>
            <motion.p
              variants={fadeUp(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-neutral-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
            >
              {initialChurchInfo.vision.content}
            </motion.p>

            <motion.div
              variants={fadeUp(0.25)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {initialChurchInfo.vision.values.map((value) => (
                <span
                  key={value}
                  className="px-5 py-2 rounded-full border border-neutral-200 text-neutral-600 text-sm"
                >
                  {value}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 3. WORSHIP INFO -- 3-column card grid (1516 style)           */}
      {/* ============================================================ */}
      <section
        className="py-24 md:py-32 bg-neutral-50"
        aria-label="예배 안내"
      >
        <Container size="lg">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
              WORSHIP
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900">
              예배 안내
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {worshipCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp(i * 0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link
                  href={`${basePath}/${card.href}`}
                  className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-100 h-full"
                >
                  <p className="text-neutral-400 text-xs font-medium tracking-[0.2em] uppercase mb-2">
                    {card.titleEn}
                  </p>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6 group-hover:text-neutral-600 transition-colors">
                    {card.title}
                  </h3>

                  <div className="space-y-3 mb-6">
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

                  <div className="flex items-center gap-2 text-neutral-400 text-sm font-medium group-hover:text-neutral-900 group-hover:gap-3 transition-all">
                    더보기
                    <ArrowRight size={16} aria-hidden="true" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 4. NOTICE -- 5-item list with arrows (1516 style)            */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-white" aria-label="공지사항">
        <Container size="lg">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
                NOTICE
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-neutral-900">
                공지사항
              </h2>
            </div>
            <Link href={`${basePath}/news`}>
              <Button
                variant="ghost"
                className="group text-base min-h-[44px] text-neutral-400 hover:text-neutral-900 hover:bg-transparent"
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

          <div className="divide-y divide-neutral-100">
            {notices.map((notice, i) => (
              <motion.div
                key={notice.id}
                variants={fadeUp(i * 0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="group flex items-center justify-between py-5 px-4 -mx-4 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors motion-reduce:transition-none">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-neutral-800 text-base md:text-lg font-medium truncate group-hover:text-neutral-900 transition-colors motion-reduce:transition-none">
                      {notice.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                    <time className="text-neutral-400 text-sm hidden sm:block">
                      {formatDate(notice.createdAt)}
                    </time>
                    <ArrowRight
                      size={16}
                      className="text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all motion-reduce:transition-none"
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
      {/* 5. NEXT VISION -- Image background with text overlay          */}
      {/* ============================================================ */}
      <section
        className="relative py-32 md:py-44 overflow-hidden"
        aria-label="차세대 사역"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1529070538774-1560d23cee93?q=80&w=2070"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <Container size="md" className="relative z-10">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-white/70 text-xs font-medium tracking-[0.3em] uppercase mb-4">
              NEXT GENERATION
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              다음 세대를 위한
              <br />
              비전
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              어린이부터 청년까지, 다음 세대를 세워가는 교육과 양육 사역에
              함께해 주세요.
            </p>
            <Link href={`${basePath}/newcomer`}>
              <Button
                size="lg"
                className="min-h-[44px] h-14 px-8 text-base bg-white text-neutral-900 hover:bg-neutral-100 font-semibold group"
              >
                자세히 보기
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 6. LATEST SERMON -- Featured media                            */}
      {/* ============================================================ */}
      <section
        className="py-24 md:py-32 bg-neutral-50"
        aria-label="최근 설교"
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
              <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
                MEDIA
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-neutral-900">
                최근 설교
              </h2>
            </div>
            <Link href={`${basePath}/sermons`}>
              <Button
                variant="ghost"
                className="group text-base min-h-[44px] text-neutral-400 hover:text-neutral-900 hover:bg-transparent"
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
            {/* Featured sermon */}
            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Link
                href={`${basePath}/sermons`}
                className="group relative block aspect-video rounded-2xl overflow-hidden bg-neutral-200"
                aria-label={`설교 영상: ${latestSermon.title}`}
              >
                <Image
                  src={latestSermon.thumbnailUrl}
                  alt={latestSermon.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors motion-reduce:transition-none" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform motion-reduce:transition-none shadow-lg">
                    <Play
                      size={32}
                      className="text-neutral-900 ml-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-2">
                    최신 설교
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-bold">
                    {latestSermon.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    {latestSermon.preacher} &middot;{" "}
                    {formatDate(latestSermon.publishedAt)}
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Recent sermons list */}
            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              {initialSermons.slice(0, 3).map((sermon) => (
                <div
                  key={sermon.id}
                  className="group flex gap-4 p-4 rounded-xl bg-white border border-neutral-100 hover:border-neutral-300 hover:shadow-sm transition-all motion-reduce:transition-none"
                >
                  <div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={sermon.thumbnailUrl}
                      alt={sermon.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play
                        size={16}
                        className="text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-neutral-800 text-sm font-semibold truncate group-hover:text-neutral-900 transition-colors motion-reduce:transition-none">
                      {sermon.title}
                    </h4>
                    <p className="text-neutral-400 text-xs mt-1">
                      {sermon.preacher}
                    </p>
                    <p className="text-neutral-400 text-xs mt-0.5">
                      {formatDate(sermon.publishedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* 7. SOCIAL & NEWCOMER CTA                                     */}
      {/* ============================================================ */}
      <section
        className="py-24 md:py-32 bg-white"
        aria-label="소셜 미디어 및 새가족 안내"
      >
        <Container size="md">
          {/* Social media */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-6">
              FOLLOW US
            </p>
            <div className="flex justify-center gap-6">
              {[
                { icon: Youtube, label: "YouTube" },
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-14 h-14 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:border-neutral-900 transition-all motion-reduce:transition-none"
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
            <div
              className="absolute inset-0 bg-neutral-900"
              aria-hidden="true"
            />

            <div className="relative z-10 px-8 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                  <Users
                    size={24}
                    className="text-white/50"
                    aria-hidden="true"
                  />
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium">
                    Welcome
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  처음 오셨나요?
                </h3>
                <p className="text-neutral-400 text-base md:text-lg">
                  성락교회는 여러분을 진심으로 환영합니다
                </p>
              </div>

              <Link href={`${basePath}/newcomer`}>
                <Button
                  size="lg"
                  className="bg-white text-neutral-900 hover:bg-neutral-100 shadow-xl group min-h-[44px] h-14 px-8 text-base"
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
