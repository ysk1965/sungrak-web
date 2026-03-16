"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowDown,
  Play,
  Clock,
  MapPin,
  Phone,
  Minus,
  Quote,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SermonCard, NewsCard } from "@/components/home";
import { initialSermons, initialNotices } from "@/mocks/data/initial";
import { useBasePath } from "@/contexts/base-path-context";

export default function VariantEPage() {
  const shouldReduceMotion = useReducedMotion();
  const basePath = useBasePath();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // reducedMotion 시 스크롤 패럴랙스 비활성화 (즉시 최종값 반환)
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 150],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    shouldReduceMotion ? [1, 1] : [1, 0],
  );

  const recentSermons = initialSermons.slice(0, 3);
  const notices = initialNotices.slice(0, 4);

  return (
    <>
      {/* Hero - Minimal Text Focus Enhanced */}
      <section
        id="main-content"
        ref={heroRef}
        className="min-h-screen pt-20 flex flex-col relative overflow-hidden"
      >
        {/* Background Pattern - decorative, aria-hidden */}
        <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="flex-1 flex items-center">
          <Container size="lg">
            <motion.div
              style={{ y: titleY, opacity }}
              className="max-w-4xl mx-auto text-center py-20"
            >
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }
                }
                className="mb-8"
              >
                <span
                  className="inline-flex items-center gap-3 text-primary-500 font-medium tracking-[0.3em]"
                  aria-label="성락교회"
                >
                  <Minus size={20} aria-hidden="true" />
                  SUNGRAK CHURCH
                  <Minus size={20} aria-hidden="true" />
                </span>
              </motion.div>

              <motion.h1
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.8, delay: 0.1 }
                }
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 mb-8 leading-[1.05]"
              >
                신실한 헌신
                <br />
                {/* bg-[length:200%_auto] is set so animate-gradient can shift background-position */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-amber-500 to-primary-500 bg-[length:200%_auto] animate-gradient">
                  긍휼한 아낌
                </span>
              </motion.h1>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.6, delay: 0.2 }
                }
                className="mb-12"
              >
                <p className="text-xl md:text-2xl text-neutral-500 font-light tracking-wide">
                  Sincere Devotion, Compassionate Fellowship
                </p>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.6, delay: 0.3 }
                }
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href={`${basePath}/worship`}>
                  <Button
                    size="lg"
                    className="min-h-[44px] min-w-[180px] h-14 text-base group shadow-lg shadow-primary-500/20"
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
                    className="min-h-[44px] min-w-[180px] h-14 text-base group border-2"
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
          </Container>
        </div>

        {/* Scroll Indicator - Enhanced */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 1 }}
          className="pb-16 text-center"
          aria-hidden="true"
        >
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs tracking-[0.2em] text-neutral-500 uppercase">
              Scroll to explore
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-neutral-300 to-transparent" />
            <ArrowDown size={20} className="text-neutral-300" />
          </motion.div>
        </motion.div>
      </section>

      {/* Visual Banner - Enhanced */}
      <section
        className="relative h-[60vh] overflow-hidden"
        aria-label="비전 배너"
      >
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2070"
            alt="예배당 전경"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.8 }
            }
            className="text-center text-white max-w-2xl px-6"
          >
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
              className="mb-6"
            >
              <Quote
                size={48}
                className="mx-auto text-white/30"
                aria-hidden="true"
              />
            </motion.div>
            <p className="text-lg md:text-xl mb-4 tracking-wide font-light">
              Our Vision
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Faith, a Relationship
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-amber-200">
                with the Lord
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Decorative Corners */}
        <div
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30"
          aria-hidden="true"
        />
      </section>

      {/* Info Section - Minimal Layout Enhanced */}
      <Section background="white" padding="xl" aria-label="예배 안내 정보">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: Clock,
                label: "예배 시간",
                value: "주일 7:00 · 9:30 · 11:30",
              },
              { icon: MapPin, label: "위치", value: "서울 구로구 신도림" },
              { icon: Phone, label: "연락처", value: "070-7300-6200" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                className="text-center group cursor-pointer p-4 min-h-[44px] rounded-xl"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-primary-100 transition-colors motion-reduce:transition-none">
                  <item.icon
                    size={24}
                    aria-hidden="true"
                    className="text-neutral-500 group-hover:text-primary-500 transition-colors motion-reduce:transition-none"
                  />
                </div>
                <p className="text-sm text-neutral-500 mb-2 tracking-wide uppercase">
                  {item.label}
                </p>
                <p className="text-lg font-medium text-neutral-900 group-hover:text-primary-600 transition-colors motion-reduce:transition-none">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Container size="lg">
        <Separator
          className="bg-neutral-100"
          role="separator"
          aria-hidden="true"
        />
      </Container>

      {/* Sermons - Clean Layout Enhanced */}
      <Section background="white" padding="xl" aria-label="최근 설교">
        <Container size="lg">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-sm text-primary-500 font-medium mb-2 tracking-widest"
              >
                SERMONS
              </motion.p>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
                설교
              </h2>
            </div>
            <Link href={`${basePath}/sermons`}>
              <Button variant="ghost" className="group text-base min-h-[44px]">
                전체 보기
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentSermons.map((sermon, i) => (
              <motion.div
                key={sermon.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.15 }
                }
                whileHover={shouldReduceMotion ? undefined : { y: -10 }}
              >
                <SermonCard sermon={sermon} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Container size="lg">
        <Separator
          className="bg-neutral-100"
          role="separator"
          aria-hidden="true"
        />
      </Container>

      {/* About Preview - Enhanced */}
      <Section background="white" padding="xl" aria-label="교회 소개">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm text-primary-500 font-medium mb-3 tracking-widest"
              >
                ABOUT
              </motion.p>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                성락교회
              </h2>

              <div className="space-y-6 mb-10 max-w-prose">
                <motion.p
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }
                  }
                  className="text-neutral-600 leading-relaxed text-lg"
                >
                  성락교회는 하나님을 사랑하고, 이웃을 사랑하며, 세상을 섬기는
                  공동체입니다.
                </motion.p>
                <motion.p
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }
                  }
                  className="text-neutral-600 leading-relaxed text-lg"
                >
                  예수 그리스도의 사랑 안에서 함께 성장하고, 세상을 변화시키는
                  빛과 소금이 되기를 소망합니다.
                </motion.p>
              </div>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }
                }
              >
                <Link href={`${basePath}/about`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group border-2 min-h-[44px]"
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
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070"
                  alt="성락교회 예배 모습"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }
                }
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl"
              >
                <div className="text-4xl font-bold text-primary-500 mb-1">
                  25+
                </div>
                <div className="text-neutral-500">Years of Faith</div>
              </motion.div>

              <motion.div
                initial={
                  shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }
                }
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg"
                aria-hidden="true"
              >
                <Play
                  size={32}
                  className="text-white ml-1"
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Container size="lg">
        <Separator
          className="bg-neutral-100"
          role="separator"
          aria-hidden="true"
        />
      </Container>

      {/* News - Simple List Enhanced */}
      <Section background="white" padding="xl" aria-label="교회 소식">
        <Container size="lg">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
                NEWS
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
                교회 소식
              </h2>
            </div>
            <Link href={`${basePath}/news`}>
              <Button variant="ghost" className="group text-base min-h-[44px]">
                전체 보기
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notices.map((notice, i) => (
              <motion.div
                key={notice.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                whileHover={shouldReduceMotion ? undefined : { x: 8 }}
              >
                <NewsCard notice={notice} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newcomer - Simple Enhanced */}
      <section className="relative overflow-hidden" aria-label="새가족 안내">
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600"
          aria-hidden="true"
        />
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <Container size="lg" className="relative z-10 py-20 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                Welcome
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                처음 오셨나요?
              </h3>
              <p className="text-white/80 text-lg">
                성락교회는 여러분을 진심으로 환영합니다
              </p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/newcomer">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-white/90 shadow-xl group min-h-[44px] h-14 px-8 text-base"
                >
                  새가족 안내
                  <ArrowRight
                    size={20}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

    </>
  );
}
