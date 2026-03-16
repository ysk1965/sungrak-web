"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Play,
  ArrowRight,
  Star,
  Moon,
  Sun,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { initialWorships } from "@/mocks/data/initial";

const worshipColors: Record<string, string> = {
  worship_001: "from-blue-500 to-blue-600",
  worship_002: "from-emerald-500 to-emerald-600",
  worship_003: "from-violet-500 to-violet-600",
  worship_004: "from-amber-500 to-amber-600",
  worship_005: "from-rose-500 to-rose-600",
};

const specialServices = [
  {
    name: "금요철야예배",
    time: "매주 금요일 오후 9:00",
    location: "대예배실",
    description: "기도와 찬양으로 드리는 특별한 예배",
    icon: Moon,
    color: "from-indigo-500 to-indigo-600",
    lightBg: "bg-indigo-100",
    textColor: "text-indigo-600",
  },
  {
    name: "특별새벽기도",
    time: "절기별 (사순절/추수감사절)",
    location: "대예배실",
    description: "특별 새벽 연합기도회",
    icon: Sun,
    color: "from-amber-500 to-amber-600",
    lightBg: "bg-amber-100",
    textColor: "text-amber-600",
  },
  {
    name: "부활절/성탄절 예배",
    time: "절기 특별예배",
    location: "대예배실",
    description: "온 성도가 함께하는 감사와 경축 예배",
    icon: Star,
    color: "from-rose-500 to-rose-600",
    lightBg: "bg-rose-100",
    textColor: "text-rose-600",
  },
];

const joinSteps = [
  {
    step: 1,
    title: "교회 방문",
    description: "편안한 마음으로 성락교회를 방문해 주세요",
  },
  {
    step: 2,
    title: "안내 데스크",
    description: "1층 안내 데스크에서 새가족 등록을 해주세요",
  },
  {
    step: 3,
    title: "예배 참여",
    description: "안내에 따라 편안하게 예배에 참여해 주세요",
  },
  {
    step: 4,
    title: "교제",
    description: "예배 후 함께 교제하며 공동체를 경험해 보세요",
  },
];

function formatTime(time: string): string {
  const [hour, minute] = time.split(":");
  const h = parseInt(hour, 10);
  const period = h < 12 ? "오전" : "오후";
  const displayHour = h > 12 ? h - 12 : h;
  return `${period} ${displayHour}:${minute}`;
}

export default function WorshipPage() {
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
    shouldReduceMotion ? [0, 0] : [0, 80],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    shouldReduceMotion ? [1, 1] : [1, 0],
  );

  return (
    <>
      {/* Hero Banner */}
      <section
        ref={heroRef}
        className="relative h-[40vh] min-h-[300px] mt-16 md:mt-20 overflow-hidden"
        aria-label="예배안내 히어로 배너"
      >
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <Image
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/60 to-neutral-900/30" />
        </motion.div>

        <Container className="relative z-10 h-full flex items-center justify-center">
          <motion.div style={{ y: textY, opacity }} className="text-center">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            >
              <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
                <Calendar size={12} className="mr-1" aria-hidden="true" />
                WORSHIP
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
              className="text-4xl md:text-5xl font-bold text-white"
            >
              예배안내
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }}
              className="text-white/70 text-lg mt-3"
            >
              하나님을 예배하는 거룩한 시간
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Section 1: 주요 예배 안내 */}
      <Section background="white" padding="xl" aria-label="주요 예배 안내">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="mb-10"
        >
          <Badge className="mb-3 bg-emerald-100 text-emerald-600 hover:bg-emerald-100">
            <Calendar size={12} className="mr-1" aria-hidden="true" />
            Worship Schedule
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            주요 예배 안내
          </h2>
          <p className="text-neutral-500 mt-2">
            성락교회에서 드리는 정기 예배를 안내합니다
          </p>
        </motion.div>

        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialWorships.map((worship, i) => (
            <motion.div
              key={worship.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
              }
              whileHover={
                shouldReduceMotion ? undefined : { y: -5, scale: 1.02 }
              }
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md rounded-xl h-full">
                <CardContent className="p-6 relative">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${worshipColors[worship.id] ?? "from-primary-500 to-primary-600"}`}
                    aria-hidden="true"
                  />
                  <div
                    className="w-14 h-14 mx-auto mb-4 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:scale-110 motion-reduce:transform-none transition-transform"
                    aria-hidden="true"
                  >
                    <Calendar
                      className="text-primary-500"
                      size={26}
                      aria-hidden="true"
                    />
                  </div>
                  <dt className="font-bold text-neutral-900 text-lg mb-2">
                    {worship.name}
                  </dt>
                  <dd className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500 mb-1">
                    {formatTime(worship.time)}
                  </dd>
                  <dd className="text-sm text-neutral-500 flex items-center justify-center gap-1">
                    <MapPin size={14} aria-hidden="true" />
                    {worship.location}
                  </dd>
                  {worship.description && (
                    <dd className="text-sm text-neutral-400 mt-2">
                      {worship.description}
                    </dd>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </dl>
      </Section>

      {/* Section 2: 특별 예배 */}
      <Section background="gray" padding="lg" aria-label="특별 예배 안내">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="mb-10"
        >
          <Badge className="mb-3 bg-violet-100 text-violet-600 hover:bg-violet-100">
            <Star size={12} className="mr-1" aria-hidden="true" />
            Special Services
          </Badge>
          <h2 className="text-3xl font-bold text-neutral-900">특별 예배</h2>
          <p className="text-neutral-500 mt-1">
            절기와 특별한 시간에 드리는 예배
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialServices.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
              }
              whileHover={
                shouldReduceMotion ? undefined : { y: -5, scale: 1.02 }
              }
            >
              <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md rounded-xl h-full">
                <CardContent className="p-6 relative">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`}
                    aria-hidden="true"
                  />
                  <div
                    className={`w-12 h-12 rounded-xl ${service.lightBg} flex items-center justify-center mb-4 group-hover:scale-110 motion-reduce:transform-none transition-transform`}
                    aria-hidden="true"
                  >
                    <service.icon
                      className={service.textColor}
                      size={24}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-bold text-neutral-900 text-lg mb-2">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-neutral-600 mb-1">
                    <Clock size={14} className="shrink-0" aria-hidden="true" />
                    {service.time}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-neutral-500 mb-3">
                    <MapPin size={14} className="shrink-0" aria-hidden="true" />
                    {service.location}
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Section 3: 예배 참여 안내 */}
      <Section background="white" padding="lg" aria-label="예배 참여 안내">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="mb-10"
        >
          <Badge className="mb-3 bg-blue-100 text-blue-600 hover:bg-blue-100">
            <BookOpen size={12} className="mr-1" aria-hidden="true" />
            How to Join
          </Badge>
          <h2 className="text-3xl font-bold text-neutral-900">
            예배 참여 안내
          </h2>
          <p className="text-neutral-500 mt-1">
            처음 방문하시는 분도 편안하게 참여하실 수 있습니다
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting dotted line (desktop only) */}
          <div
            className="hidden lg:block absolute top-10 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 border-t-2 border-dashed border-primary-200"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {joinSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.15 }
                }
                className="text-center relative"
              >
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-500 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-lg shadow-primary-500/25">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-neutral-900 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed max-w-[200px]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Section 4: 온라인 예배 CTA */}
      <section className="py-16 md:py-24" aria-label="온라인 예배 안내">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0" aria-hidden="true">
              <Image
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070"
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-500/80" />
            </div>

            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }
                  }
                >
                  <div
                    className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6"
                    aria-hidden="true"
                  >
                    <Play size={32} className="text-white ml-1" />
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }
                  }
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  온라인으로도 함께 예배하세요
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }
                  }
                  className="text-white/80 text-lg mb-8 leading-relaxed"
                >
                  교회에 직접 오실 수 없는 분들도
                  <br />
                  YouTube를 통해 실시간으로 예배에 참여하실 수 있습니다.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }
                  }
                >
                  <Link
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="bg-white text-primary-600 hover:bg-white/90 shadow-lg group min-h-[44px]"
                    >
                      <Play size={18} aria-hidden="true" />
                      YouTube 예배 보기
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 motion-reduce:transition-none transition-transform"
                        aria-hidden="true"
                      />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Decorative */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
              aria-hidden="true"
            />
          </motion.div>
        </Container>
      </section>
    </>
  );
}
