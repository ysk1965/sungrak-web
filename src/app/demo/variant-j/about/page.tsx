"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Phone,
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
import { initialChurchInfo } from "@/mocks/data/initial";

const ministries = [
  {
    icon: Calendar,
    name: "예배부",
    nameEn: "Worship",
    description: "주일 및 각종 예배의 기획과 진행을 담당합니다.",
  },
  {
    icon: BookOpen,
    name: "교육부",
    nameEn: "Education",
    description: "성경 공부와 신앙 교육 프로그램을 운영합니다.",
  },
  {
    icon: Globe,
    name: "선교부",
    nameEn: "Mission",
    description: "국내외 선교 활동을 기획하고 지원합니다.",
  },
  {
    icon: Heart,
    name: "봉사부",
    nameEn: "Service",
    description: "지역사회 봉사와 구제 활동을 이끌어갑니다.",
  },
  {
    icon: Music,
    name: "찬양부",
    nameEn: "Praise",
    description: "찬양과 경배를 통해 예배를 인도합니다.",
  },
  {
    icon: Monitor,
    name: "미디어부",
    nameEn: "Media",
    description: "온라인 방송과 미디어 콘텐츠를 제작합니다.",
  },
];

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

const makeFadeInX = (
  xOffset: number,
  delay: number,
  duration: number,
  reduced: boolean | null,
): Variants => ({
  hidden: reduced ? { opacity: 1 } : { opacity: 0, x: xOffset },
  visible: {
    opacity: 1,
    x: 0,
    transition: reduced ? { duration: 0 } : { duration, delay },
  },
});

export default function VariantJAboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroImageX = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const { greeting, vision, history, location } = initialChurchInfo;
  const greetingParagraphs = greeting.content.split("\n\n");

  return (
    <>
      {/* Hero - Editorial Split (3:2 asymmetric) */}
      <section
        id="variant-j-content"
        ref={heroRef}
        aria-label="교회소개"
        className="relative min-h-[70vh] bg-stone-950 mt-16 md:mt-20 overflow-hidden"
      >
        <Container size="xl" className="h-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[calc(70vh-5rem)] py-12 lg:py-0">
            {/* Left side - 60% (3/5) */}
            <motion.div
              style={{ y: rm ? undefined : heroTextY }}
              className="lg:col-span-3 order-2 lg:order-1"
            >
              <motion.p
                variants={makeFadeInUp(20, 0, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-6"
              >
                ABOUT US
              </motion.p>

              <motion.h1
                variants={makeFadeInUp(30, 0.1, 0.8, rm)}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              >
                성락교회를
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  소개합니다
                </span>
              </motion.h1>

              <motion.p
                variants={makeFadeInUp(20, 0.2, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="text-lg text-stone-400 mb-10 tracking-wide"
              >
                Sincere Devotion, Compassionate Fellowship
              </motion.p>
            </motion.div>

            {/* Right side - 40% (2/5) -- tilted portrait */}
            <motion.div
              style={{ x: rm ? undefined : heroImageX }}
              className="lg:col-span-2 order-1 lg:order-2 relative"
            >
              <motion.div
                variants={
                  rm
                    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
                    : {
                        hidden: { opacity: 0, x: 60, rotate: 4 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          rotate: 2,
                          transition: { duration: 1, delay: 0.2 },
                        },
                      }
                }
                initial="hidden"
                animate="visible"
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform rotate-2"
              >
                <Image
                  src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
                  alt="성락교회 예배당 외관"
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                />
              </motion.div>

              {/* Decorative element */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-stone-700 -z-10 transform -rotate-1"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section aria-label="비전과 미션" className="bg-stone-900 py-20">
        <Container size="xl">
          <motion.p
            variants={makeFadeInUp(10, 0, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3"
          >
            VISION & MISSION
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              variants={makeFadeInX(-30, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  {vision.title}
                </span>
              </h2>
              <p className="text-stone-300 leading-relaxed text-lg">
                {vision.content}
              </p>
            </motion.div>

            <div className="space-y-4">
              {vision.values.map((value, i) => (
                <motion.div
                  key={value}
                  variants={makeFadeInX(30, i * 0.1, 0.5, rm)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="border-l-2 border-amber-500 pl-5 py-3 hover:border-amber-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Heart
                      size={16}
                      className="text-amber-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-bold text-white">
                        {value.split(" (")[0]}
                      </p>
                      <p className="text-sm text-stone-500">
                        {value.match(/\((.+)\)/)?.[1]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Pastor Greeting */}
      <section aria-label="담임목사 인사말" className="bg-stone-950 py-24">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              variants={makeFadeInX(-40, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070"
                  alt="담임목사 사진"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-stone-700/50 -z-10 transform -rotate-1"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              variants={makeFadeInX(40, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3">
                GREETING
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                {greeting.title}
              </h2>

              {/* Pull quote */}
              <div className="relative pl-6 border-l-2 border-amber-500 mb-8">
                <span
                  className="absolute -left-3 -top-4 text-6xl text-amber-500/30 font-serif leading-none select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="text-stone-300 leading-relaxed italic text-lg">
                  {greetingParagraphs[0]}
                </p>
              </div>

              {greetingParagraphs.slice(1).map((paragraph, i) => (
                <motion.p
                  key={i}
                  variants={makeFadeInUp(10, 0.1 * (i + 1), 0.5, rm)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-stone-300 leading-relaxed mb-4"
                >
                  {paragraph}
                </motion.p>
              ))}

              <div className="flex items-center gap-4 pt-6 border-t border-stone-700/50 mt-6">
                <div
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-amber-400 font-bold text-xl">
                    {greeting.pastorName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-white text-lg">
                    {greeting.pastorName}
                  </p>
                  <p className="text-stone-500 text-sm">
                    성락교회 담임목사
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Church History Timeline */}
      <section aria-label="교회 연혁" className="bg-stone-900 py-20">
        <Container size="xl">
          <div className="text-center mb-14">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3"
            >
              HISTORY
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              교회 연혁
            </motion.h2>
            <motion.p
              variants={makeFadeInUp(10, 0.1, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-stone-500 mt-2"
            >
              성락교회의 발자취를 돌아봅니다
            </motion.p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Center line */}
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600"
              aria-hidden="true"
            />

            {history.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  variants={makeFadeInX(isLeft ? -30 : 30, i * 0.08, 0.5, rm)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative pb-10 last:pb-0"
                >
                  {/* Mobile layout */}
                  <div className="flex items-start gap-6 md:hidden">
                    <div className="relative flex flex-col items-center pt-1">
                      <div className="w-4 h-4 rounded-full bg-amber-500 border-4 border-stone-900 flex-shrink-0 z-10" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                        {item.year}
                      </span>
                      <p className="text-stone-300 font-medium mt-1">
                        {item.content}
                      </p>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
                    {isLeft ? (
                      <div className="text-right pr-4">
                        <div className="inline-block bg-stone-800/50 backdrop-blur-sm rounded-2xl shadow-md p-5 border border-stone-700/50">
                          <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                            {item.year}
                          </span>
                          <p className="text-stone-300 font-medium mt-1">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                    <div className="relative flex flex-col items-center pt-2">
                      <div className="w-4 h-4 rounded-full bg-amber-500 border-4 border-stone-900 flex-shrink-0 z-10" />
                    </div>
                    {!isLeft ? (
                      <div className="text-left pl-4">
                        <div className="inline-block bg-stone-800/50 backdrop-blur-sm rounded-2xl shadow-md p-5 border border-stone-700/50">
                          <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                            {item.year}
                          </span>
                          <p className="text-stone-300 font-medium mt-1">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Ministries */}
      <section aria-label="조직 및 사역" className="bg-stone-950 py-20">
        <Container size="xl">
          <div className="text-center mb-14">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3"
            >
              MINISTRIES
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              조직/사역
            </motion.h2>
            <motion.p
              variants={makeFadeInUp(10, 0.1, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-stone-500 mt-2"
            >
              각 부서가 유기적으로 협력하여 주님의 몸된 교회를 세워갑니다
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {ministries.map((ministry, i) => (
              <motion.div
                key={ministry.name}
                variants={makeFadeInUp(20, i * 0.08, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={rm ? undefined : { y: -5 }}
                className="bg-stone-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-stone-700/50"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <ministry.icon
                    className="text-amber-400"
                    size={24}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-bold text-white mb-1">
                  {ministry.name}
                </h3>
                <p className="text-xs text-amber-400 font-medium tracking-wider uppercase mb-2">
                  {ministry.nameEn}
                </p>
                <p className="text-sm text-stone-400 leading-relaxed">
                  {ministry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Location */}
      <section aria-label="오시는 길" className="bg-stone-900 py-20">
        <Container size="xl">
          <div className="text-center mb-14">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3"
            >
              LOCATION
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              오시는 길
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              variants={makeFadeInX(-30, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-amber-400" size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-white mb-1">주소</p>
                  <p className="text-stone-300">{location.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-amber-400" size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-white mb-1">전화</p>
                  <p className="text-stone-300">{location.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-amber-400" size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-white mb-1">팩스</p>
                  <p className="text-stone-300">{location.fax}</p>
                </div>
              </div>

              <div className="border-t border-stone-700/50 pt-6 space-y-4">
                <h3 className="font-bold text-white">대중교통 안내</h3>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Train className="text-blue-400" size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">지하철</p>
                    <p className="text-stone-500 text-sm">
                      1호선 신도림역 1번 출구 도보 5분
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Bus className="text-green-400" size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">버스</p>
                    <p className="text-stone-500 text-sm">구로 11, 구로 13</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={makeFadeInX(30, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl bg-stone-800 aspect-video flex flex-col items-center justify-center text-stone-500 shadow-inner border border-stone-700">
                <MapPin size={48} className="mb-3" aria-hidden="true" />
                <p className="text-sm font-medium text-stone-400">
                  {location.address}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  지도 영역 (Map Placeholder)
                </p>
              </div>
              <div
                aria-hidden="true"
                className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-2 border-stone-700/50 -z-10"
              />
            </motion.div>
          </div>
        </Container>
      </section>

    </>
  );
}
