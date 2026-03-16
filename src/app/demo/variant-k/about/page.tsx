"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
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
  { icon: Calendar, name: "예배부", nameEn: "Worship", description: "주일 및 각종 예배의 기획과 진행을 담당합니다." },
  { icon: BookOpen, name: "교육부", nameEn: "Education", description: "성경 공부와 신앙 교육 프로그램을 운영합니다." },
  { icon: Globe, name: "선교부", nameEn: "Mission", description: "국내외 선교 활동을 기획하고 지원합니다." },
  { icon: Heart, name: "봉사부", nameEn: "Service", description: "지역사회 봉사와 구제 활동을 이끌어갑니다." },
  { icon: Music, name: "찬양부", nameEn: "Praise", description: "찬양과 경배를 통해 예배를 인도합니다." },
  { icon: Monitor, name: "미디어부", nameEn: "Media", description: "온라인 방송과 미디어 콘텐츠를 제작합니다." },
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

export default function VariantKAboutPage() {
  const rm = useReducedMotion();
  const { greeting, vision, history, location } = initialChurchInfo;
  const greetingParagraphs = greeting.content.split("\n\n");

  return (
    <>
      {/* Hero */}
      <section
        id="variant-k-content"
        aria-label="교회소개"
        className="relative min-h-[50vh] mt-16 md:mt-20 overflow-hidden"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <Container size="lg" className="relative z-10 flex items-center min-h-[50vh]">
          <motion.div
            initial={rm ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={rm ? { duration: 0 } : { duration: 0.8 }}
            className="py-20"
          >
            <p className="text-white/70 text-sm font-medium tracking-[0.3em] uppercase mb-4">
              ABOUT US
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              성락교회를 소개합니다
            </h1>
            <p className="text-white/60 text-lg tracking-wide">
              Sincere Devotion, Compassionate Fellowship
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Vision */}
      <section aria-label="비전과 미션" className="py-24 bg-white">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              variants={makeFadeInX(-30, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
                VISION & MISSION
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {vision.title}
              </h2>
              <p className="text-neutral-600 leading-relaxed text-lg">
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
                  className="border-l-2 border-neutral-900 pl-5 py-3 hover:bg-neutral-50 transition-colors rounded-r-lg"
                >
                  <div className="flex items-center gap-3">
                    <Heart size={16} className="text-neutral-400 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-neutral-900">{value.split(" (")[0]}</p>
                      <p className="text-sm text-neutral-500">{value.match(/\((.+)\)/)?.[1]}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Pastor Greeting */}
      <section aria-label="담임목사 인사말" className="py-24 bg-neutral-50">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={makeFadeInX(-40, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg relative">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070"
                  alt="담임목사 사진"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              variants={makeFadeInX(40, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
                GREETING
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
                {greeting.title}
              </h2>

              <div className="relative pl-6 border-l-2 border-neutral-300 mb-8">
                <span className="absolute -left-3 -top-4 text-6xl text-neutral-200 font-serif leading-none select-none" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="text-neutral-600 leading-relaxed italic text-lg">
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
                  className="text-neutral-600 leading-relaxed mb-4"
                >
                  {paragraph}
                </motion.p>
              ))}

              <div className="flex items-center gap-4 pt-6 border-t border-neutral-200 mt-6">
                <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center" aria-hidden="true">
                  <span className="text-neutral-900 font-bold text-xl">
                    {greeting.pastorName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-neutral-900 text-lg">{greeting.pastorName}</p>
                  <p className="text-neutral-500 text-sm">성락교회 담임목사</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* History */}
      <section aria-label="교회 연혁" className="py-24 bg-white">
        <Container size="lg">
          <div className="text-center mb-14">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3"
            >
              HISTORY
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-neutral-900"
            >
              교회 연혁
            </motion.h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-0.5 bg-neutral-200"
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
                  <div className="flex items-start gap-6 md:hidden">
                    <div className="relative flex flex-col items-center pt-1">
                      <div className="w-4 h-4 rounded-full bg-neutral-900 border-4 border-white flex-shrink-0 z-10" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <span className="text-lg font-bold text-neutral-900">{item.year}</span>
                      <p className="text-neutral-600 font-medium mt-1">{item.content}</p>
                    </div>
                  </div>

                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
                    {isLeft ? (
                      <div className="text-right pr-4">
                        <div className="inline-block bg-neutral-50 rounded-2xl shadow-sm p-5 border border-neutral-100">
                          <span className="text-lg font-bold text-neutral-900">{item.year}</span>
                          <p className="text-neutral-600 font-medium mt-1">{item.content}</p>
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                    <div className="relative flex flex-col items-center pt-2">
                      <div className="w-4 h-4 rounded-full bg-neutral-900 border-4 border-white flex-shrink-0 z-10" />
                    </div>
                    {!isLeft ? (
                      <div className="text-left pl-4">
                        <div className="inline-block bg-neutral-50 rounded-2xl shadow-sm p-5 border border-neutral-100">
                          <span className="text-lg font-bold text-neutral-900">{item.year}</span>
                          <p className="text-neutral-600 font-medium mt-1">{item.content}</p>
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
      <section aria-label="조직 및 사역" className="py-24 bg-neutral-50">
        <Container size="lg">
          <div className="text-center mb-14">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3"
            >
              MINISTRIES
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-neutral-900"
            >
              조직/사역
            </motion.h2>
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
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-neutral-100"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4" aria-hidden="true">
                  <ministry.icon className="text-neutral-600" size={24} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-1">{ministry.name}</h3>
                <p className="text-xs text-neutral-400 font-medium tracking-wider uppercase mb-2">{ministry.nameEn}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">{ministry.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Location */}
      <section aria-label="오시는 길" className="py-24 bg-white">
        <Container size="lg">
          <div className="text-center mb-14">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3"
            >
              LOCATION
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-neutral-900"
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
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-neutral-600" size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-neutral-900 mb-1">주소</p>
                  <p className="text-neutral-600">{location.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-neutral-600" size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-neutral-900 mb-1">전화</p>
                  <p className="text-neutral-600">{location.phone}</p>
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-6 space-y-4">
                <h3 className="font-bold text-neutral-900">대중교통 안내</h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Train className="text-blue-500" size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800 text-sm">지하철</p>
                    <p className="text-neutral-500 text-sm">1호선 신도림역 1번 출구 도보 5분</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Bus className="text-green-500" size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800 text-sm">버스</p>
                    <p className="text-neutral-500 text-sm">구로 11, 구로 13</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={makeFadeInX(30, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="rounded-2xl bg-neutral-100 aspect-video flex flex-col items-center justify-center text-neutral-400 border border-neutral-200">
                <MapPin size={48} className="mb-3" aria-hidden="true" />
                <p className="text-sm font-medium text-neutral-500">{location.address}</p>
                <p className="text-xs text-neutral-400 mt-1">지도 영역 (Map Placeholder)</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
