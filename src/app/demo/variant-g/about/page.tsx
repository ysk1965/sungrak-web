"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Heart,
  Users,
  MapPin,
  Phone,
  Printer,
  Sparkles,
  Calendar,
  BookOpen,
  Globe,
  Music,
  Monitor,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Container } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { initialChurchInfo } from "@/mocks/data/initial";

const { greeting, vision, history, location } = initialChurchInfo;

const visionCards = [
  {
    icon: Heart,
    value: vision.values[0],
    description:
      "하나님을 향한 변함없는 헌신과 성실한 믿음으로 예배하며 섬기는 공동체",
    gradient: "from-primary-500/20 to-primary-600/10",
    iconColor: "text-primary-400",
  },
  {
    icon: Users,
    value: vision.values[1],
    description:
      "이웃을 내 몸처럼 사랑하고 아끼며 긍휼의 마음으로 섬기는 공동체",
    gradient: "from-amber-500/20 to-amber-600/10",
    iconColor: "text-amber-400",
  },
];

const ministries = [
  {
    icon: Calendar,
    name: "예배부",
    nameEn: "Worship",
    description: "주일 및 각종 예배의 기획과 진행을 담당합니다.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: BookOpen,
    name: "교육부",
    nameEn: "Education",
    description: "성경 공부와 신앙 교육 프로그램을 운영합니다.",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Globe,
    name: "선교부",
    nameEn: "Mission",
    description: "국내외 선교 활동을 기획하고 지원합니다.",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    icon: Heart,
    name: "봉사부",
    nameEn: "Service",
    description: "지역사회 봉사와 구제 활동을 이끌어갑니다.",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    icon: Music,
    name: "찬양부",
    nameEn: "Praise",
    description: "찬양과 경배를 통해 예배를 인도합니다.",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    icon: Monitor,
    name: "미디어부",
    nameEn: "Media",
    description: "온라인 방송과 미디어 콘텐츠를 제작합니다.",
    gradient: "from-cyan-500 to-cyan-600",
  },
];

const contactItems = [
  { icon: MapPin, label: "주소", value: location.address },
  { icon: Phone, label: "전화", value: location.phone, href: `tel:${location.phone}` },
  { icon: Printer, label: "팩스", value: location.fax || "" },
];

const crossNavPages = [
  { key: "worship", icon: Calendar, label: "예배안내", href: "/demo/variant-g/worship" },
  { key: "sermons", icon: BookOpen, label: "설교", href: "/demo/variant-g/sermons" },
  { key: "newcomer", icon: Users, label: "새가족", href: "/demo/variant-g/newcomer" },
  { key: "news", icon: Heart, label: "소식", href: "/demo/variant-g/news" },
];

export default function VariantGAboutPage() {
  const prefersReducedMotion = useReducedMotion();
  const greetingParagraphs = greeting.content.split("\n\n");

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header variant="transparent" />

      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[50vh] min-h-[400px] overflow-hidden"
        aria-label="교회소개 히어로"
      >
        <motion.div
          {...(prefersReducedMotion
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
            alt="성락교회 배경"
            fill
            className="object-cover opacity-30"
            priority
          />
        </motion.div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
              ABOUT US
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              교회소개
            </h1>
            <p className="text-white/60 text-lg md:text-xl">
              신실한 헌신, 긍휼한 아낌
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pastor Greeting */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-neutral-900 to-slate-900"
        aria-label="담임목사 인사말"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
                  alt="담임목사"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent"
                  aria-hidden="true"
                />
              </div>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3 }}
                className="absolute -top-4 -right-4 bg-gradient-to-br from-primary-500 to-amber-500 text-white p-4 rounded-2xl shadow-xl"
                aria-hidden="true"
              >
                <Sparkles size={28} />
              </motion.div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
            >
              <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
                GREETING
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {greeting.title}
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                {greetingParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-8 text-lg font-medium text-primary-400 italic">
                — {greeting.pastorName}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-slate-900 to-neutral-900"
        aria-label="비전 및 핵심가치"
      >
        <Container className="max-w-4xl mx-auto">
          {/* Decorative Quote Mark */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="absolute -top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none"
            aria-hidden="true"
          >
            <span className="text-[200px] leading-none font-serif text-primary-500/10">
              &ldquo;
            </span>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="text-center mb-12 relative z-10"
          >
            <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
              VISION
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                {vision.title}
              </span>
            </h2>
            <p className="text-white/60 leading-relaxed max-w-2xl mx-auto">
              {vision.content}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visionCards.map((card, i) => (
              <motion.div
                key={card.value}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.15 }
                }
                whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mx-auto mb-4`}
                  aria-hidden="true"
                >
                  <card.icon className={card.iconColor} size={32} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">
                  {card.value}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* History Timeline */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-neutral-900 to-slate-900"
        aria-label="교회 연혁"
      >
        <Container className="max-w-3xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="text-center mb-12"
          >
            <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
              HISTORY
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              교회 연혁
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-primary-400/30 to-primary-500/50 md:-translate-x-px"
              aria-hidden="true"
            />

            <div className="space-y-8">
              {history.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, x: i % 2 === 0 ? -30 : 30 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { delay: i * 0.1 }
                  }
                  className={`relative flex items-center gap-6 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Year Circle */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-amber-500 text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-primary-500/30">
                      {item.year.slice(2)}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "md:pr-4" : "md:pl-4 md:ml-auto"
                    }`}
                  >
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                      <span className="text-primary-400 font-bold text-lg">
                        {item.year}
                      </span>
                      <p className="text-white/70 mt-1">{item.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Ministries */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-slate-900 to-neutral-900"
        aria-label="조직 및 사역"
      >
        <Container>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="text-center mb-12"
          >
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 mb-4">
              MINISTRIES
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              조직/사역
            </h2>
            <p className="text-white/50 mt-2">
              각 부서가 유기적으로 협력하여 주님의 몸된 교회를 세워갑니다
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {ministries.map((ministry, i) => (
              <motion.div
                key={ministry.name}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/10 transition-colors group"
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${ministry.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  aria-hidden="true"
                >
                  <ministry.icon className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-white mb-1">{ministry.name}</h3>
                <p className="text-xs text-primary-400 font-medium mb-2">
                  {ministry.nameEn}
                </p>
                <p className="text-sm text-white/50 leading-relaxed">
                  {ministry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Location */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-neutral-900 to-black"
        aria-label="오시는 길"
      >
        <Container>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="text-center mb-12"
          >
            <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
              LOCATION
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              오시는 길
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl aspect-video flex flex-col items-center justify-center text-white/40">
                <MapPin size={48} className="mb-3 text-primary-400" aria-hidden="true" />
                <p className="font-medium text-white/60">지도 영역</p>
                <p className="text-sm mt-1">{location.address}</p>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
              className="space-y-4"
            >
              {contactItems
                .filter((item) => item.value)
                .map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={
                      prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                    }
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <item.icon className="text-primary-400" size={22} />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-bold text-white hover:text-primary-400 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-bold text-white">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Cross Navigation */}
      <section
        className="py-16 bg-black/50 border-t border-white/5"
        aria-label="다른 페이지 둘러보기"
      >
        <Container>
          <div className="text-center mb-8">
            <p className="text-sm text-primary-400 font-medium tracking-widest mb-2">
              EXPLORE
            </p>
            <h2 className="text-2xl font-bold text-white">더 둘러보기</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {crossNavPages.map((page, i) => (
              <motion.div
                key={page.key}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
              >
                <Link
                  href={page.href}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <page.icon size={24} className="text-primary-400" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {page.label}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-white/30 group-hover:text-primary-400 group-hover:translate-x-1 transition-all"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10" role="contentinfo">
        <Container>
          <div className="text-center space-y-2">
            <p className="text-white/60 text-sm font-medium">성락교회</p>
            <address className="not-italic">
              <div className="flex flex-wrap items-center justify-center gap-4 text-white/40 text-xs">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} aria-hidden="true" />
                  {location.address}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Phone size={12} aria-hidden="true" />
                  {location.phone}
                </span>
              </div>
            </address>
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} 성락교회. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>

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
