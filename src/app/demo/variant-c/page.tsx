"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Play,
  ArrowRight,
  MapPin,
  Heart,
  ChevronRight,
  Clock,
  Phone,
  Sparkles,
  Quote,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SermonCard, LiveBadge, NewsCard } from "@/components/home";
import { NewcomerCTA } from "@/components/home/newcomer-cta";
import {
  initialSermons,
  initialNotices,
  initialChurchInfo,
} from "@/mocks/data/initial";

export default function VariantCPage() {
  const prefersReducedMotion = useReducedMotion();

  const featuredSermon = initialSermons[0];
  const recentSermons = initialSermons.slice(1, 4);
  const notices = initialNotices.slice(0, 4);
  const pinnedNotice = notices[0];
  const restNotices = notices.slice(1);
  const { greeting, vision, location } = initialChurchInfo;

  return (
    <>
      {/* ===== 1. Hero Section — Simplified ===== */}
      <section
        id="main-content"
        className="min-h-screen pt-16 md:pt-20"
        aria-label="히어로 - 성락교회 소개"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
          {/* Left - Content */}
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 lg:py-0 bg-white order-2 lg:order-1 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }
              }
              className="max-w-xl relative z-10"
            >
              <motion.div
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: 0.2 }
                }
              >
                <LiveBadge className="mb-6" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                신실한 헌신,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
                  긍휼한 사귐
                </span>
              </h1>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: 0.3 }
                }
                className="text-lg text-neutral-600 mb-10 leading-relaxed"
              >
                Sincere Devotion, Compassionate Fellowship
                <br />
                성락교회에 오신 것을 환영합니다
              </motion.p>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: 0.4 }
                }
                className="flex flex-wrap gap-4"
              >
                <Link href="/demo/variant-c/sermons">
                  <Button
                    size="lg"
                    className="bg-primary-500 hover:bg-primary-600 group shadow-lg shadow-primary-500/25"
                  >
                    <Play
                      size={20}
                      className="group-hover:scale-110 transition-transform"
                      aria-hidden="true"
                    />
                    실시간 예배
                  </Button>
                </Link>
                <Link href="/demo/variant-c/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2"
                  >
                    교회 소개
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Featured Video/Image */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.8, delay: 0.2 }
            }
            className="relative order-1 lg:order-2"
          >
            <div className="relative h-full min-h-[50vh] lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
                alt="성락교회 예배당 전경"
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-l lg:from-black/60 lg:via-black/30 lg:to-transparent"
                aria-hidden="true"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  className="relative group min-w-[44px] min-h-[44px]"
                  aria-label="예배 영상 재생"
                >
                  <div
                    className="absolute inset-0 bg-white/30 rounded-full blur-xl scale-150 group-hover:scale-175 transition-transform"
                    aria-hidden="true"
                  />
                  <div className="relative w-24 h-24 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-2xl">
                    <Play
                      size={36}
                      className="text-primary-500 ml-1"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  </div>
                </motion.button>
              </div>

              {/* Bottom Info - Latest Sermon Card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion ? { duration: 0 } : { delay: 0.6 }
                  }
                  whileHover={prefersReducedMotion ? {} : { y: -5 }}
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-5 lg:p-6 shadow-xl cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2 bg-primary-100 text-primary-600 hover:bg-primary-100">
                        <Sparkles
                          size={12}
                          className="mr-1"
                          aria-hidden="true"
                        />
                        최신 설교
                      </Badge>
                      <h3 className="font-bold text-neutral-900 text-lg mb-1 group-hover:text-primary-600 transition-colors">
                        {featuredSermon.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {featuredSermon.preacher} ·{" "}
                        {featuredSermon.publishedAt}
                      </p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center group-hover:scale-110 transition-transform"
                      aria-hidden="true"
                    >
                      <Play size={20} className="text-white ml-0.5" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. Quick Info Bar ===== */}
      <section
        className="bg-neutral-900 text-white py-4"
        aria-label="교회 기본 정보"
      >
        <Container>
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-sm">
            {[
              { icon: Clock, text: "주일예배 7:00 / 9:30 / 11:30" },
              { icon: MapPin, text: location.address },
              { icon: Phone, text: location.phone },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                className="flex items-center gap-2 group cursor-pointer"
              >
                <item.icon
                  size={16}
                  className="text-primary-400 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                <span className="group-hover:text-primary-400 transition-colors">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== 3. Sermon Section — Featured + Compact ===== */}
      <Section
        background="white"
        padding="xl"
        aria-label="설교 영상"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
          >
            <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
              SERMON
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              설교 영상
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Featured Sermon - Large */}
          <motion.div
            className="lg:col-span-3"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
          >
            <SermonCard sermon={featuredSermon} variant="featured" />
          </motion.div>

          {/* Recent Sermons - Compact List */}
          <div className="lg:col-span-2 flex flex-col gap-5 justify-center">
            {recentSermons.map((sermon, i) => (
              <motion.div
                key={sermon.id}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { delay: i * 0.1 }
                }
              >
                <SermonCard sermon={sermon} variant="compact" />
              </motion.div>
            ))}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { delay: 0.4 }
              }
              className="pt-2"
            >
              <Link href="/demo/variant-c/sermons">
                <Button variant="outline" className="group w-full">
                  전체 설교 보기
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ===== 4. Pastor Greeting + Vision Section ===== */}
      <Section background="gray" padding="xl" aria-label="교회 소개">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Pastor Photo */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987"
                alt="담임목사님"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Decorative quote icon */}
            <motion.div
              initial={
                prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { delay: 0.3 }
              }
              className="absolute -top-4 -right-4 bg-gradient-to-br from-primary-500 to-amber-500 text-white p-4 rounded-2xl shadow-xl"
              aria-hidden="true"
            >
              <Quote size={28} />
            </motion.div>
          </motion.div>

          {/* Right - Greeting & Vision */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
          >
            <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
              OUR CHURCH
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              {greeting.title}
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8 whitespace-pre-line max-w-prose">
              {greeting.content}
            </p>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                교회 비전
              </h3>
              <p className="text-primary-600 font-medium mb-3 italic">
                {vision.title}
              </p>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                {vision.content}
              </p>
              <div className="flex flex-wrap gap-2">
                {vision.values.map((value) => (
                  <Badge
                    key={value}
                    variant="outline"
                    className="border-primary-200 text-primary-600 bg-primary-50"
                  >
                    {value}
                  </Badge>
                ))}
              </div>
            </div>

            <Link href="/demo/variant-c/about">
              <Button size="lg" variant="outline" className="group border-2">
                교회 소개 자세히 보기
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ===== 5. News Section — Enhanced with Pinned Highlight ===== */}
      <Section background="white" padding="xl" aria-label="교회 소식">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
              NEWS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              교회 소식
            </h2>
            <p className="text-neutral-500 mt-2">성락교회의 소식을 전합니다</p>
          </div>
          <Link href="/demo/variant-c/news">
            <Button variant="ghost" className="group">
              전체 보기
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </div>

        {/* Pinned Notice - Full Width */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : undefined}
          className="mb-4"
        >
          <div className="rounded-2xl bg-primary-50 border border-primary-100 overflow-hidden">
            <NewsCard notice={pinnedNotice} />
          </div>
        </motion.div>

        {/* Rest Notices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {restNotices.map((notice, i) => (
            <motion.div
              key={notice.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
              }
              whileHover={prefersReducedMotion ? {} : { x: 5 }}
            >
              <NewsCard notice={notice} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ===== 6. Newcomer Welcome CTA ===== */}
      <Section background="gray" padding="xl" aria-label="새가족 안내">
        <NewcomerCTA />
      </Section>

      {/* ===== 7. Directions / Location Section ===== */}
      <Section background="white" padding="xl" aria-label="오시는 길">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Location Info */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
          >
            <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
              LOCATION
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
              오시는 길
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary-500" size={22} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">주소</p>
                  <p className="font-medium text-neutral-900">
                    {location.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                  <Phone className="text-primary-500" size={22} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">전화</p>
                  <p className="font-medium text-neutral-900">
                    {location.phone}
                  </p>
                  <p className="text-sm text-neutral-500 mt-0.5">
                    FAX {location.fax}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                  <Clock className="text-primary-500" size={22} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">예배 시간</p>
                  <p className="font-medium text-neutral-900">
                    주일예배 7:00 / 9:30 / 11:30
                  </p>
                  <p className="text-sm text-neutral-500 mt-0.5">
                    수요예배 19:30 · 새벽기도 05:30
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={`https://map.naver.com/v5/search/${encodeURIComponent(location.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="group border-2">
                  네이버 지도에서 보기
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right - Map Placeholder */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-neutral-100 relative">
              <Image
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.coordinates.lat},${location.coordinates.lng}&zoom=16&size=800x600&scale=2&markers=color:red%7C${location.coordinates.lat},${location.coordinates.lng}&key=PLACEHOLDER`}
                alt="성락교회 위치 지도"
                fill
                className="object-cover"
                unoptimized
              />
              {/* Fallback overlay for placeholder */}
              <div className="absolute inset-0 bg-neutral-100 flex flex-col items-center justify-center text-neutral-400">
                <MapPin size={48} className="mb-3 text-primary-300" />
                <p className="text-lg font-medium text-neutral-500">
                  성락교회
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  {location.address}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
