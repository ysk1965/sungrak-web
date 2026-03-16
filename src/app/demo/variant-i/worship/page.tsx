"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Clock,
  MapPin,
  Play,
  ArrowRight,
  Star,
  Moon,
  Sun,
  BookOpen,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { initialWorships } from "@/mocks/data/initial";

const specialServices = [
  {
    name: "금요철야예배",
    time: "매주 금요일 오후 9:00",
    location: "대예배실",
    description: "기도와 찬양으로 드리는 특별한 예배",
    icon: Moon,
  },
  {
    name: "특별새벽기도",
    time: "절기별 (사순절/추수감사절)",
    location: "대예배실",
    description: "특별 새벽 연합기도회",
    icon: Sun,
  },
  {
    name: "부활절/성탄절 예배",
    time: "절기 특별예배",
    location: "대예배실",
    description: "온 성도가 함께하는 감사와 경축 예배",
    icon: Star,
  },
];

const joinSteps = [
  { step: 1, title: "교회 방문", description: "편안한 마음으로 성락교회를 방문해 주세요" },
  { step: 2, title: "안내 데스크", description: "1층 안내 데스크에서 새가족 등록을 해주세요" },
  { step: 3, title: "예배 참여", description: "안내에 따라 편안하게 예배에 참여해 주세요" },
  { step: 4, title: "교제", description: "예배 후 함께 교제하며 공동체를 경험해 보세요" },
];

function formatTime(time: string): string {
  const [hour, minute] = time.split(":");
  const h = parseInt(hour, 10);
  const period = h < 12 ? "오전" : "오후";
  const displayHour = h > 12 ? h - 12 : h;
  return `${period} ${displayHour}:${minute}`;
}

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

export default function VariantIWorshipPage() {
  const rm = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Paper Texture Overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <Header />

      {/* Hero - Editorial (3:2 asymmetric with tilted portrait) */}
      <section
        aria-label="예배안내"
        className="relative min-h-[70vh] bg-[#FAF8F3] mt-16 md:mt-20 overflow-hidden"
      >
        <Container size="xl" className="h-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[calc(70vh-5rem)] py-12 lg:py-0">
            {/* Left side - 60% (3/5) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <motion.p
                variants={makeFadeInUp(20, 0, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-6"
              >
                WORSHIP
              </motion.p>

              <motion.h1
                variants={makeFadeInUp(30, 0.1, 0.8, rm)}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight mb-6"
              >
                예배
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-600">
                  안내
                </span>
              </motion.h1>

              <motion.p
                variants={makeFadeInUp(20, 0.2, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="text-lg text-neutral-500 mb-10 tracking-wide"
              >
                A Holy Time to Worship God
              </motion.p>
            </div>

            {/* Right side - 40% (2/5) — tilted portrait */}
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
              className="lg:col-span-2 order-1 lg:order-2 relative"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform rotate-2">
                <Image
                  src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070"
                  alt="성락교회 예배 모습"
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                />
              </div>

              {/* Decorative element — tilted opposite direction */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-primary-200 -z-10 transform -rotate-1"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Worship Schedule */}
      <section aria-label="주요 예배 안내" className="bg-white py-20">
        <Container size="xl">
          <motion.p
            variants={makeFadeInUp(10, 0, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-3"
          >
            WORSHIP SCHEDULE
          </motion.p>
          <motion.h2
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3"
          >
            주요 예배 안내
          </motion.h2>
          <motion.p
            variants={makeFadeInUp(10, 0.1, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-neutral-500 mb-10"
          >
            성락교회에서 드리는 정기 예배를 안내합니다
          </motion.p>

          <div className="space-y-6">
            {initialWorships.map((worship, i) => (
              <motion.div
                key={worship.id}
                variants={makeFadeInUp(15, i * 0.08, 0.4, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border-l-2 border-primary-500 pl-6 py-2 group hover:border-primary-400 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-8">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-xl group-hover:text-primary-600 transition-colors">
                      {worship.name}
                    </h3>
                    {worship.description && (
                      <p className="text-sm text-neutral-400 mt-0.5">
                        {worship.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-neutral-500">
                    <span className="flex items-center gap-1.5 text-sm">
                      <Clock size={15} aria-hidden="true" className="text-primary-400" />
                      <span className="font-semibold text-neutral-900 text-base">
                        {formatTime(worship.time)}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 text-sm">
                      <MapPin size={15} aria-hidden="true" className="text-primary-400" />
                      {worship.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Special Services */}
      <section aria-label="특별 예배 안내" className="bg-[#F5F0E8] py-20">
        <Container size="xl">
          <motion.p
            variants={makeFadeInUp(10, 0, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-3"
          >
            SPECIAL SERVICES
          </motion.p>
          <motion.h2
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-neutral-900 mb-10"
          >
            특별 예배
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialServices.map((service, i) => (
              <motion.div
                key={service.name}
                variants={makeFadeInUp(20, i * 0.1, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={rm ? undefined : { y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-100"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <service.icon
                    className="text-primary-500"
                    size={24}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-bold text-neutral-900 text-lg mb-3">
                  {service.name}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-neutral-600 mb-1">
                  <Clock size={14} className="shrink-0 text-primary-400" aria-hidden="true" />
                  {service.time}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-neutral-500 mb-3">
                  <MapPin size={14} className="shrink-0 text-primary-400" aria-hidden="true" />
                  {service.location}
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* How to Join */}
      <section aria-label="예배 참여 안내" className="bg-white py-20">
        <Container size="xl">
          <motion.p
            variants={makeFadeInUp(10, 0, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-3"
          >
            HOW TO JOIN
          </motion.p>
          <motion.h2
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3"
          >
            예배 참여 안내
          </motion.h2>
          <motion.p
            variants={makeFadeInUp(10, 0.1, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-neutral-500 mb-12"
          >
            처음 방문하시는 분도 편안하게 참여하실 수 있습니다
          </motion.p>

          <div className="relative">
            {/* Connecting line */}
            <div
              className="hidden lg:block absolute top-10 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 border-t-2 border-dashed border-primary-200"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {joinSteps.map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={makeFadeInUp(20, i * 0.12, 0.5, rm)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
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
        </Container>
      </section>

      {/* Online Worship CTA */}
      <section aria-label="온라인 예배 안내" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700"
        />
        <div aria-hidden="true" className="absolute inset-0 opacity-10">
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
              variants={makeFadeInX(-30, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Play size={12} aria-hidden="true" className="mr-1" />
                Online Worship
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                온라인으로도 함께 예배하세요
              </h2>
              <p className="text-white/80 text-lg max-w-md">
                교회에 직접 오실 수 없는 분들도 YouTube를 통해 실시간으로 예배에
                참여하실 수 있습니다.
              </p>
            </motion.div>

            <motion.div
              variants={makeFadeInX(30, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-white/90 shadow-xl group h-14 px-8 text-base"
                >
                  <Play size={18} aria-hidden="true" />
                  YouTube 예배 보기
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Newcomer CTA */}
      <section aria-label="새가족 안내" className="bg-[#FAF8F3] py-20">
        <Container size="xl">
          <motion.div
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <Badge className="bg-primary-50 text-primary-600 border-primary-100 mb-4">
              <Heart size={12} aria-hidden="true" className="mr-1" />
              New Family
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              처음 오시는 분을 환영합니다
            </h2>
            <p className="text-neutral-500 text-lg mb-8 leading-relaxed">
              성락교회는 처음 방문하시는 모든 분을 따뜻하게 맞이합니다.
              <br />
              새가족 안내를 통해 편안하게 교회 생활을 시작해 보세요.
            </p>
            <Link href="/newcomer">
              <Button
                size="lg"
                className="group shadow-lg shadow-primary-500/20"
              >
                <Heart size={18} aria-hidden="true" />
                새가족 안내 보기
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      <Footer />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group min-h-[44px] inline-flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
      >
        <span
          aria-hidden="true"
          className="group-hover:-translate-x-1 inline-block transition-transform"
        >
          &larr;
        </span>{" "}
        시안 선택
      </Link>
    </div>
  );
}
