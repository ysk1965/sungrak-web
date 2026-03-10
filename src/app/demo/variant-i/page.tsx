"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
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

export default function VariantIPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroImageX = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const greetingParagraphs = churchInfo.greeting.content.split("\n\n");

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Paper Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100]"
        style={{
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <Header />

      {/* ===== Editorial Hero (80vh) ===== */}
      <section
        ref={heroRef}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-6"
              >
                SUNGRAK CHURCH
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight mb-6"
              >
                신실한 헌신,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-600">
                  긍휼한 아낌
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-neutral-500 mb-10 tracking-wide"
              >
                Sincere Devotion, Compassionate Fellowship
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/about">
                  <Button
                    size="lg"
                    className="min-w-[160px] h-13 text-base group shadow-lg shadow-primary-500/20"
                  >
                    교회 소개
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
                <Link href="/newcomer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="min-w-[160px] h-13 text-base group border-2"
                  >
                    새가족 안내
                    <ChevronRight
                      size={18}
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
                initial={{ opacity: 0, x: 60, rotate: 4 }}
                animate={{ opacity: 1, x: 0, rotate: 2 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform rotate-2"
              >
                <Image
                  src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
                  alt="Church"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Decorative element behind image */}
              <div className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-primary-200 -z-10 transform -rotate-1" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Sermon Horizontal Carousel ===== */}
      <section className="bg-white py-20">
        <Container size="xl">
          {/* Header row */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-2"
              >
                SERMONS
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-neutral-900"
              >
                최신 설교
              </motion.h2>
            </div>
            <div className="flex items-center gap-3">
              {/* Scroll arrows */}
              <button
                onClick={() => scrollCarousel("left")}
                className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
                aria-label="이전 설교"
              >
                <ArrowLeft size={18} className="text-neutral-600" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
                aria-label="다음 설교"
              >
                <ArrowRight size={18} className="text-neutral-600" />
              </button>
              <Link href="/sermons" className="hidden sm:block">
                <Button variant="ghost" className="group text-base">
                  전체 보기
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        {/* Horizontal scroll container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Left spacer for alignment with container */}
            <div className="shrink-0 w-0 lg:w-[calc((100vw-80rem)/2)]" />

            {sermons.map((sermon, i) => (
              <motion.div
                key={sermon.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[320px] md:min-w-[380px] shrink-0 snap-start"
              >
                <SermonCard sermon={sermon} />
              </motion.div>
            ))}

            {/* Right spacer */}
            <div className="shrink-0 w-4 lg:w-[calc((100vw-80rem)/2)]" />
          </div>
        </div>

        {/* Mobile "View All" link */}
        <div className="sm:hidden mt-6 text-center">
          <Link href="/sermons">
            <Button variant="ghost" className="group text-base">
              전체 보기
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </div>
      </section>

      {/* ===== Pull-Quote Vision Section ===== */}
      <section className="bg-[#F5F0E8] py-24 overflow-hidden">
        <Container size="md">
          <div className="relative max-w-4xl mx-auto text-center px-4">
            {/* Decorative open quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute -top-8 left-0 md:left-8 select-none pointer-events-none"
            >
              <span className="text-[120px] md:text-[150px] text-primary-200 leading-none font-serif">
                &ldquo;
              </span>
            </motion.div>

            {/* Vision title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-4xl italic text-neutral-800 font-bold leading-snug pt-16 md:pt-20 mb-8"
            >
              {churchInfo.vision.title}
            </motion.h2>

            {/* Vision content */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-10 max-w-3xl mx-auto"
            >
              {churchInfo.vision.content}
            </motion.p>

            {/* Values as inline list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {churchInfo.vision.values.map((value, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 text-neutral-700 text-sm font-medium backdrop-blur-sm border border-primary-100"
                >
                  <Heart size={14} className="text-primary-400" />
                  {value}
                </span>
              ))}
            </motion.div>

            {/* Decorative close quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
      <section className="bg-[#FAF8F3] py-20">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1964"
                  alt="Church interior"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative border behind */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-primary-200/50 -z-10" />
            </motion.div>

            {/* Right - Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * (i + 1) }}
                    className="text-neutral-600 leading-relaxed text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
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
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
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
      <section className="bg-white py-20">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border-l-2 border-primary-500 pl-4 py-1 group hover:border-primary-400 transition-colors"
                  >
                    <h3 className="font-semibold text-neutral-900 text-lg group-hover:text-primary-600 transition-colors">
                      {worship.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-neutral-500">
                      <span className="flex items-center gap-1 text-sm">
                        <Clock size={14} />
                        {worship.time}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <MapPin size={14} />
                        {worship.location}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link href="/worship">
                  <Button variant="outline" className="group border-2">
                    예배 안내 전체 보기
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070"
                  alt="Worship"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative border */}
              <div className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-2 border-primary-200/50 -z-10" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== News Section ===== */}
      <section className="bg-[#FAF8F3] py-20">
        <Container size="xl">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-2"
            >
              LATEST NEWS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <NewsCard notice={notice} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link href="/news">
              <Button variant="ghost" className="group text-base">
                소식 더 보기
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* ===== Newcomer CTA ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700" />
        <div className="absolute inset-0 opacity-10">
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
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Users size={12} className="mr-1" />
                Welcome
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                처음 오셨나요?
              </h3>
              <p className="text-white/80 text-lg max-w-md">
                성락교회는 여러분을 진심으로 환영합니다. 함께 예배하고 성장하는
                공동체가 되길 소망합니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
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
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group"
      >
        <span className="group-hover:-translate-x-1 inline-block transition-transform">
          &larr;
        </span>{" "}
        시안 선택
      </Link>

      {/* Hide scrollbar globally for this page */}
      <style jsx global>{`
        .snap-x::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
