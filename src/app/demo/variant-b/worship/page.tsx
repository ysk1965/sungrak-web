"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  MapPin,
  BookOpen,
  Heart,
  Sun,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Container } from "@/components/common";
import { Section, SectionHeader } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { initialWorships } from "@/mocks/data/initial";
import { instantTransition } from "@/lib/animations";

const dayLabels: Record<string, string> = {
  sunday: "주일",
  monday: "월요일",
  tuesday: "화요일",
  wednesday: "수요일",
  thursday: "목요일",
  friday: "금요일",
  saturday: "토요일",
};

const worshipCategories = [
  {
    key: "sunday",
    title: "주일예배",
    icon: BookOpen,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-400",
    desc: "주일 말씀과 찬양의 예배",
  },
  {
    key: "wednesday",
    title: "수요예배",
    icon: Heart,
    color: "bg-emerald-500",
    gradient: "from-emerald-500 to-teal-400",
    desc: "수요 말씀 묵상 예배",
  },
  {
    key: "dawn",
    title: "새벽기도",
    icon: Sun,
    color: "bg-amber-500",
    gradient: "from-amber-500 to-orange-400",
    desc: "매일 새벽 기도 모임",
  },
];

export default function VariantBWorshipPage() {
  const shouldReduceMotion = useReducedMotion();

  const animateProps = (delay = 0) => ({
    initial: shouldReduceMotion ? false : ({ opacity: 0, y: 20 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
    transition: shouldReduceMotion
      ? instantTransition
      : { delay, duration: 0.6 },
  });

  const sundayWorships = initialWorships.filter((w) => w.day === "sunday");
  const otherWorships = initialWorships.filter((w) => w.day !== "sunday");

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-[50vh] md:h-[60vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="예배안내 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1964"
          alt=""
          role="presentation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <Container className="relative z-10 h-full flex items-end pb-12 md:pb-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion ? instantTransition : { duration: 0.6 }
            }
          >
            <Badge className="mb-3 bg-white/20 text-white border-none backdrop-blur-sm">
              Worship
            </Badge>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300 font-semibold mb-2 text-lg">
              Worship Service
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
              예배안내
            </h1>
            <p className="text-lg text-white/70 max-w-xl">
              하나님을 예배하는 기쁨, 함께 나누는 은혜
            </p>
          </motion.div>
        </Container>
        {/* Decorative pills */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-10">
          {["주일", "수요", "새벽"].map((label, i) => (
            <motion.span
              key={label}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                shouldReduceMotion
                  ? instantTransition
                  : { delay: 0.8 + i * 0.1 }
              }
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm text-center"
            >
              {label}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Worship Summary Cards - Overlapping Hero */}
      <Section background="white" padding="lg" aria-label="예배 요약">
        <div className="relative z-20 -mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {worshipCategories.map((cat, i) => {
              const worships =
                cat.key === "sunday"
                  ? sundayWorships
                  : cat.key === "wednesday"
                    ? initialWorships.filter((w) => w.day === "wednesday")
                    : initialWorships.filter(
                        (w) => w.day !== "sunday" && w.day !== "wednesday",
                      );

              return (
                <motion.div
                  key={cat.key}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion ? instantTransition : { delay: i * 0.1 }
                  }
                  whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                >
                  <Card className="shadow-xl hover:shadow-2xl transition-all border-none h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-5">
                        <div
                          className={`w-14 h-14 rounded-xl ${cat.color} flex items-center justify-center`}
                        >
                          <cat.icon size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900">
                            {cat.title}
                          </h3>
                          <p className="text-sm text-neutral-500">{cat.desc}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {worships.map((w) => (
                          <div
                            key={w.id}
                            className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0"
                          >
                            <span className="font-medium text-neutral-700 text-sm">
                              {w.name}
                            </span>
                            <div className="flex items-center gap-2 text-sm text-neutral-500">
                              <Clock size={14} />
                              <span>{w.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Detailed Worship Schedule */}
      <Section background="gray" padding="xl" aria-label="상세 예배 정보">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              Schedule
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader
              title="예배 시간 안내"
              subtitle="각 예배별 상세 정보를 확인하세요"
            />
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {initialWorships.map((worship, i) => {
            const category = worshipCategories.find(
              (c) =>
                c.key ===
                (worship.day === "sunday"
                  ? "sunday"
                  : worship.day === "wednesday"
                    ? "wednesday"
                    : "dawn"),
            );

            return (
              <motion.div
                key={worship.id}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? instantTransition : { delay: i * 0.1 }
                }
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              >
                <Card className="shadow-md hover:shadow-lg transition-all border-none overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Color Bar */}
                      <div
                        className={`w-1.5 bg-gradient-to-b ${category?.gradient || "from-primary-500 to-amber-400"}`}
                      />
                      <div className="flex-1 p-5 flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${category?.color || "bg-primary-500"} flex items-center justify-center shrink-0`}
                        >
                          {category?.icon && (
                            <category.icon size={20} className="text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-neutral-900">
                            {worship.name}
                          </h4>
                          {worship.description && (
                            <p className="text-sm text-neutral-500 mt-0.5">
                              {worship.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-6 text-sm shrink-0">
                          <div className="flex items-center gap-2 text-neutral-600">
                            <Clock size={16} className="text-neutral-400" />
                            <span className="font-semibold">
                              {worship.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-600 hidden sm:flex">
                            <MapPin size={16} className="text-neutral-400" />
                            <span>{worship.location}</span>
                          </div>
                          <Badge
                            variant="secondary"
                            className="hidden md:inline-flex"
                          >
                            {dayLabels[worship.day]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Newcomer CTA Section */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        aria-label="새가족 안내"
      >
        <Image
          src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070"
          alt=""
          role="presentation"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/85" />
        <Container className="relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p
              {...animateProps(0)}
              className="text-primary-400 tracking-widest text-sm font-semibold mb-4 uppercase"
            >
              Welcome
            </motion.p>
            <motion.h2
              {...animateProps(0.1)}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              처음 오시는 분을 환영합니다
            </motion.h2>
            <motion.p
              {...animateProps(0.2)}
              className="text-lg text-white/70 leading-relaxed mb-8"
            >
              편안한 마음으로 방문해 주세요. 따뜻한 교제와 은혜로운 예배가
              여러분을 기다립니다.
            </motion.p>
            <motion.div {...animateProps(0.3)}>
              <Link href="/demo/variant-b/newcomer">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-8 group"
                >
                  새가족 안내
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
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
        <span
          className="group-hover:-translate-x-1 inline-block transition-transform"
          aria-hidden="true"
        >
          ←
        </span>{" "}
        시안 선택
      </Link>
    </div>
  );
}
