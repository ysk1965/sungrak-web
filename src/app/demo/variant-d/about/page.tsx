"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Phone,
  Quote,
  Heart,
  Calendar,
  BookOpen,
  Globe,
  Music,
  Monitor,
  Train,
  Bus,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/common";
import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { initialChurchInfo } from "@/mocks/data/initial";

const ministries = [
  {
    icon: Calendar,
    name: "예배부",
    nameEn: "Worship",
    description: "주일 및 각종 예배의 기획과 진행을 담당합니다.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: BookOpen,
    name: "교육부",
    nameEn: "Education",
    description: "성경 공부와 신앙 교육 프로그램을 운영합니다.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Globe,
    name: "선교부",
    nameEn: "Mission",
    description: "국내외 선교 활동을 기획하고 지원합니다.",
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: Heart,
    name: "봉사부",
    nameEn: "Service",
    description: "지역사회 봉사와 구제 활동을 이끌어갑니다.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: Music,
    name: "찬양부",
    nameEn: "Praise",
    description: "찬양과 경배를 통해 예배를 인도합니다.",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: Monitor,
    name: "미디어부",
    nameEn: "Media",
    description: "온라인 방송과 미디어 콘텐츠를 제작합니다.",
    color: "from-cyan-500 to-cyan-600",
  },
];

export default function VariantDAboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.2],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 100],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    shouldReduceMotion ? [1, 1] : [1, 0],
  );

  const { greeting, vision, history, location } = initialChurchInfo;
  const greetingParagraphs = greeting.content.split("\n\n");

  return (
    <>
      {/* Hero Banner */}
      <section
        ref={heroRef}
        className="relative h-[50vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="교회소개 히어로 배너"
      >
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/60 to-neutral-900/30" />
        </motion.div>

        <Container className="relative z-10 h-full flex items-center">
          <motion.div style={{ y: textY, opacity }} className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            >
              <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
                ABOUT US
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 0.3, duration: 0.8 }
              }
              className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            >
              교회소개
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }}
              className="text-lg text-white/70 leading-relaxed max-w-xl"
            >
              신실한 헌신과 긍휼한 사귐으로 하나님과 이웃을 섬기는 공동체,
              성락교회를 소개합니다.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <Section background="white" padding="xl" aria-label="비전과 미션">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="mb-10"
        >
          <Badge className="bg-primary-100 text-primary-600 hover:bg-primary-100">
            Vision &amp; Mission
          </Badge>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
                {vision.title}
              </span>
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              {vision.content}
            </p>
          </motion.div>

          <div className="space-y-4">
            {vision.values.map((value, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.15 }
                }
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              >
                <Card className="border-0 shadow-md rounded-xl overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${i === 0 ? "from-primary-500 to-amber-500" : "from-amber-500 to-primary-500"}`}
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-amber-50 flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <Heart
                          className="text-primary-500"
                          size={26}
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900 text-lg">
                          {value.split(" (")[0]}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {value.match(/\((.+)\)/)?.[1]}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pastor Greeting */}
      <Section background="gray" padding="xl" aria-label="담임목사 인사말">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070"
                alt="담임목사 사진"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl"
              aria-hidden="true"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary-500 flex items-center justify-center">
                  <Heart className="text-white" size={24} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-500">25+</p>
                  <p className="text-sm text-neutral-500">Years of Faith</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
          >
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-100">
              {greeting.title}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              담임목사 인사말
            </h2>

            <figure className="relative pl-6 border-l-4 border-primary-500 mb-6">
              <Quote
                size={24}
                className="absolute -left-4 -top-2 text-primary-200"
                aria-hidden="true"
              />
              <blockquote>
                <p className="text-neutral-600 leading-relaxed italic">
                  {greetingParagraphs[0]}
                </p>
              </blockquote>
            </figure>

            {greetingParagraphs.slice(1).map((paragraph, i) => (
              <p key={i} className="text-neutral-600 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}

            <div className="flex items-center gap-4 pt-4 border-t border-neutral-200 mt-6">
              <div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="text-primary-500 font-bold text-xl">
                  {greeting.pastorName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-bold text-neutral-900 text-lg">
                  {greeting.pastorName}
                </p>
                <p className="text-neutral-500">성락교회</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Church History Timeline */}
      <Section background="white" padding="lg" aria-label="교회 연혁">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="text-center mb-12"
        >
          <Badge className="mb-3 bg-primary-100 text-primary-600 hover:bg-primary-100">
            History
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            교회 연혁
          </h2>
          <p className="text-neutral-500 mt-2">
            성락교회의 발자취를 돌아봅니다
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Center vertical line (md+) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary-300 via-primary-500 to-amber-400"
            aria-hidden="true"
          />

          {history.map((item, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={item.year}
                initial={{
                  opacity: 0,
                  x: shouldReduceMotion
                    ? 0
                    : isLeft
                      ? -30
                      : 30,
                  y: shouldReduceMotion ? 0 : 10,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { delay: i * 0.1, duration: 0.5 }
                }
                className="relative pb-10 last:pb-0"
              >
                {/* Mobile layout (< md) */}
                <div className="flex items-start gap-6 md:hidden">
                  {/* Year */}
                  <div className="w-20 flex-shrink-0 text-right pt-0.5">
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
                      {item.year}
                    </span>
                  </div>

                  {/* Dot & Line */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary-500 border-4 border-primary-100 flex-shrink-0 z-10" />
                    {i < history.length - 1 && (
                      <div
                        className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary-300 via-primary-500 to-amber-400 h-full"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0.5">
                    <p className="text-neutral-700 font-medium">
                      {item.content}
                    </p>
                  </div>
                </div>

                {/* Desktop layout (md+): alternating left/right */}
                <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
                  {/* Left column */}
                  {isLeft ? (
                    <div className="text-right pr-4">
                      <Card className="inline-block border-0 shadow-md rounded-xl overflow-hidden text-left">
                        <CardContent className="p-5 relative">
                          <div
                            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-amber-500"
                            aria-hidden="true"
                          />
                          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
                            {item.year}
                          </span>
                          <p className="text-neutral-700 font-medium mt-1">
                            {item.content}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div />
                  )}

                  {/* Center dot */}
                  <div className="relative flex flex-col items-center pt-1">
                    <div className="w-4 h-4 rounded-full bg-primary-500 border-4 border-primary-100 flex-shrink-0 z-10" />
                  </div>

                  {/* Right column */}
                  {!isLeft ? (
                    <div className="text-left pl-4">
                      <Card className="inline-block border-0 shadow-md rounded-xl overflow-hidden text-left">
                        <CardContent className="p-5 relative">
                          <div
                            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-primary-500"
                            aria-hidden="true"
                          />
                          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
                            {item.year}
                          </span>
                          <p className="text-neutral-700 font-medium mt-1">
                            {item.content}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Organization / Ministries */}
      <Section background="gray" padding="lg" aria-label="조직 및 사역">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="text-center mb-12"
        >
          <Badge className="mb-3 bg-emerald-100 text-emerald-600 hover:bg-emerald-100">
            Ministries
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            조직/사역
          </h2>
          <p className="text-neutral-500 mt-2">
            각 부서가 유기적으로 협력하여 주님의 몸된 교회를 세워갑니다
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {ministries.map((ministry, i) => (
            <motion.div
              key={ministry.name}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
              }
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            >
              <Card className="h-full border-0 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-5 md:p-6 relative">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${ministry.color}`}
                    aria-hidden="true"
                  />
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-neutral-100 flex items-center justify-center mb-4"
                    aria-hidden="true"
                  >
                    <ministry.icon
                      className="text-primary-500"
                      size={24}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-1">
                    {ministry.name}
                  </h3>
                  <p className="text-xs text-primary-500 font-medium mb-2">
                    {ministry.nameEn}
                  </p>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {ministry.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Location */}
      <Section
        background="white"
        padding="xl"
        aria-label="오시는 길"
        className="scroll-mt-20"
      >
        <div id="location" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
            className="text-center mb-12"
          >
            <Badge className="mb-3 bg-primary-100 text-primary-600 hover:bg-primary-100">
              Location
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              오시는 길
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : undefined}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <MapPin
                    className="text-primary-500"
                    size={22}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="font-bold text-neutral-900 mb-1">주소</p>
                  <p className="text-neutral-600">{location.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Phone
                    className="text-primary-500"
                    size={22}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="font-bold text-neutral-900 mb-1">전화</p>
                  <p className="text-neutral-600">{location.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Phone
                    className="text-primary-500"
                    size={22}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="font-bold text-neutral-900 mb-1">팩스</p>
                  <p className="text-neutral-600">{location.fax}</p>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6 space-y-4">
                <h3 className="font-bold text-neutral-900">대중교통 안내</h3>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Train
                      className="text-blue-600"
                      size={18}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">
                      지하철
                    </p>
                    <p className="text-neutral-500 text-sm">
                      1호선 신도림역 1번 출구 도보 5분
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Bus
                      className="text-green-600"
                      size={18}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">버스</p>
                    <p className="text-neutral-500 text-sm">구로 11, 구로 13</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : undefined}
            >
              <div className="rounded-2xl bg-neutral-100 aspect-video flex flex-col items-center justify-center text-neutral-400 shadow-inner">
                <MapPin size={48} className="mb-3" aria-hidden="true" />
                <p className="text-sm font-medium text-neutral-500">
                  {location.address}
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  지도 영역 (Map Placeholder)
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
