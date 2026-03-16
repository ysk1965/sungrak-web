"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { useBasePath } from "@/contexts/base-path-context";
import {
  Play,
  ArrowRight,
  ChevronDown,
  Clock,
  MapPin,
  Youtube,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Container } from "@/components/common";
import { Section, SectionHeader } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  SermonCard,
  LiveBadge,
  NewsCard,
  NewcomerCTA,
} from "@/components/home";
import {
  initialSermons,
  initialNotices,
  initialWorships,
} from "@/mocks/data/initial";

export default function VariantAPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const basePath = useBasePath();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const featuredSermon = initialSermons[0];
  const recentSermons = initialSermons.slice(1, 4);
  const notices = initialNotices.slice(0, 3);

  // Reduced motion transition — duration 0 to suppress all animation
  const reducedTransition = { duration: 0 };

  return (
    <div className="min-h-screen bg-white">
      <Header variant="transparent" basePath={basePath} />

      {/* Hero Section - 풀스크린 비디오 스타일 */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden"
        aria-label="성락교회 메인 히어로"
      >
        {/* Background with Parallax */}
        <motion.div
          style={shouldReduceMotion ? undefined : { scale }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
            alt="성락교회 예배당 전경"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Animated Overlay Pattern — decorative */}
        <div className="absolute inset-0 z-10 opacity-20" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_50%)]" />
        </div>

        {/* Content */}
        <motion.div
          style={shouldReduceMotion ? undefined : { opacity, y: textY }}
          className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              shouldReduceMotion ? reducedTransition : { duration: 0.5 }
            }
          >
            <LiveBadge className="mb-6" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? reducedTransition
                : { duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
            }
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="block">Sincere Devotion,</span>
            <motion.span
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? reducedTransition
                  : { duration: 1, delay: 0.5 }
              }
              className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500"
            >
              Compassionate Fellowship
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? reducedTransition
                : { duration: 0.8, delay: 0.6 }
            }
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed"
          >
            신실한 헌신, 긍휼한 사귐
            <br />
            성락교회에 오신 것을 환영합니다
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? reducedTransition
                : { duration: 0.8, delay: 0.8 }
            }
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-primary-500 hover:bg-primary-600 text-white group relative overflow-hidden min-h-[44px]"
              aria-label="실시간 예배 참여하기"
              asChild
            >
              <Link href={`${basePath}/worship`}>
                <span className="relative z-10 flex items-center gap-2">
                  <Play size={20} aria-hidden="true" />
                  실시간 예배
                </span>
                <motion.div
                  className="absolute inset-0 bg-primary-400"
                  initial={{ x: "-100%" }}
                  whileHover={shouldReduceMotion ? undefined : { x: 0 }}
                  transition={
                    shouldReduceMotion ? reducedTransition : { duration: 0.3 }
                  }
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm min-h-[44px] group"
              asChild
            >
              <Link href={`${basePath}/about`}>
                교회 소개
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={shouldReduceMotion ? reducedTransition : { delay: 1.2 }}
            className="absolute bottom-32 left-0 right-0 flex justify-center gap-12 text-white/60 text-sm"
            aria-label="교회 주요 현황"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">25+</div>
              <div>Years</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">3</div>
              <div>주일예배</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5AM</div>
              <div>새벽기도</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator — decorative */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? reducedTransition : { delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          aria-hidden="true"
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={
              shouldReduceMotion
                ? reducedTransition
                : { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }
            className="flex flex-col items-center text-white/60"
          >
            <span className="text-xs mb-2 tracking-widest">SCROLL</span>
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Sermon Section */}
      <Section background="white" padding="xl" aria-label="최신 설교">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            shouldReduceMotion ? reducedTransition : { duration: 0.8 }
          }
        >
          <SectionHeader
            title="최신 설교"
            subtitle="말씀으로 함께 성장합니다"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={
              shouldReduceMotion ? reducedTransition : { duration: 0.6 }
            }
          >
            <SermonCard sermon={featuredSermon} variant="featured" />
          </motion.div>

          {/* Recent List */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={
              shouldReduceMotion
                ? reducedTransition
                : { duration: 0.6, delay: 0.2 }
            }
          >
            <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <div
                className="w-1 h-5 bg-primary-500 rounded-full"
                aria-hidden="true"
              />
              최근 설교
            </h3>
            {recentSermons.map((sermon, i) => (
              <motion.div
                key={sermon.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? reducedTransition : { delay: i * 0.1 }
                }
              >
                <SermonCard sermon={sermon} variant="compact" />
              </motion.div>
            ))}
            <Link
              href={`${basePath}/sermons`}
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium mt-4 group min-h-[44px]"
            >
              전체 설교 보기
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* About Preview with Floating Elements */}
      <Section background="gray" padding="xl" aria-label="교회 소개">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={
              shouldReduceMotion ? reducedTransition : { duration: 0.8 }
            }
          >
            <Badge className="mb-4 bg-primary-100 text-primary-700 hover:bg-primary-100">
              About Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
              성락교회를
              <br />
              <span className="text-primary-500">소개합니다</span>
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              성락교회는 &quot;신실한 헌신, 긍휼한 사귐&quot;이라는 비전 아래,
              하나님과 이웃을 섬기는 공동체입니다. 예수 그리스도의 사랑 안에서
              함께 성장하고, 세상을 변화시키는 빛과 소금이 되기를 소망합니다.
            </p>
            <div
              className="flex flex-wrap gap-3 mb-8"
              aria-label="교회 사역 영역"
            >
              {["예배", "교육", "선교", "교제"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion ? reducedTransition : { delay: i * 0.1 }
                  }
                  className="px-4 py-2 rounded-full bg-white border border-neutral-200 text-sm text-neutral-700"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <Link href={`${basePath}/about`}>
              <Button className="group min-h-[44px]">
                자세히 보기
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={
              shouldReduceMotion ? reducedTransition : { duration: 0.8 }
            }
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1964"
                alt="성락교회 내부 예배 공간"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? reducedTransition : { delay: 0.4 }
              }
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl border border-neutral-100"
              aria-label="설립 25년 이상"
            >
              <div className="text-3xl font-bold text-primary-500 mb-1">
                25+
              </div>
              <div className="text-sm text-neutral-600">Years of Faith</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? reducedTransition : { delay: 0.5 }
              }
              className="absolute -top-4 -right-4 bg-primary-500 text-white p-4 rounded-xl shadow-xl"
              aria-label="주일예배 3회"
            >
              <div className="text-sm font-medium">주일예배</div>
              <div className="text-xl font-bold">3회</div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Worship Schedule */}
      <Section background="white" padding="lg" aria-label="예배 안내">
        <SectionHeader title="예배 안내" subtitle="함께 예배드려요" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialWorships.slice(0, 4).map((worship, i) => (
            <motion.div
              key={worship.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? reducedTransition : { delay: i * 0.1 }
              }
            >
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-neutral-200 hover:border-primary-200 overflow-hidden">
                <CardContent className="p-6 text-center relative">
                  <div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    aria-hidden="true"
                  />
                  <Clock
                    className="mx-auto text-primary-500 mb-3"
                    size={28}
                    aria-hidden="true"
                  />
                  <h3 className="font-bold text-neutral-900 mb-1">
                    {worship.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary-500 mb-1">
                    {worship.time}
                  </p>
                  <p className="text-sm text-neutral-500">{worship.location}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* News Section */}
      <Section background="gray" padding="lg" aria-label="교회 소식">
        <SectionHeader
          title="교회 소식"
          subtitle="성락교회의 소식을 전합니다"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {notices.map((notice, i) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? reducedTransition : { delay: i * 0.1 }
              }
            >
              <NewsCard notice={notice} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? reducedTransition : undefined}
          className="text-center mt-8"
        >
          <Link href={`${basePath}/news`}>
            <Button variant="outline" className="group min-h-[44px]">
              전체 소식 보기
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </motion.div>
      </Section>

      {/* Newcomer CTA */}
      <Section background="white" padding="lg" aria-label="새가족 안내">
        <NewcomerCTA />
      </Section>

      {/* Quick Links */}
      <section className="bg-neutral-900 py-12" aria-label="빠른 링크">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Youtube,
                label: "YouTube",
                href: "#",
                color: "text-red-500",
              },
              {
                icon: MapPin,
                label: "오시는 길",
                href: `${basePath}/about#location`,
                color: "text-green-500",
              },
              {
                icon: Clock,
                label: "예배시간",
                href: `${basePath}/worship`,
                color: "text-blue-500",
              },
              {
                icon: ExternalLink,
                label: "문의하기",
                href: `${basePath}/newcomer`,
                color: "text-purple-500",
              },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? reducedTransition : { delay: i * 0.1 }
                }
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white min-h-[44px]"
              >
                <item.icon
                  className={item.color}
                  size={20}
                  aria-hidden="true"
                />
                <span className="font-medium">{item.label}</span>
              </motion.a>
            ))}
          </div>
        </Container>
      </section>

      <Footer basePath={basePath} />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm font-medium min-h-[44px] flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
      >
        ← 시안 선택
      </Link>
    </div>
  );
}
