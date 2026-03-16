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
  ArrowRight,
  Play,
  Youtube,
  Star,
  Gift,
  TreePine,
  Sparkles,
  Phone,
  Car,
  Baby,
  HandHeart,
  Navigation,
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

const specialWorships = [
  {
    icon: Sparkles,
    emoji: "✝️",
    title: "부활절 예배",
    description: "예수 그리스도의 부활을 기념하는 특별 감사예배",
    date: "매년 4월 (부활절 주일)",
    gradient: "from-primary-50 to-amber-50",
    border: "border-primary-200",
  },
  {
    icon: TreePine,
    emoji: "🎄",
    title: "성탄절 예배",
    description: "구주 예수 그리스도의 탄생을 축하하는 특별예배",
    date: "12월 25일",
    gradient: "from-emerald-50 to-green-50",
    border: "border-emerald-200",
  },
  {
    icon: Gift,
    emoji: "🍂",
    title: "감사절 예배",
    description: "한 해의 은혜를 감사하며 드리는 추수감사 예배",
    date: "11월 셋째 주일",
    gradient: "from-orange-50 to-amber-50",
    border: "border-orange-200",
  },
  {
    icon: Star,
    emoji: "🌅",
    title: "송구영신 예배",
    description: "지난 해를 보내고 새해를 맞이하는 송구영신 예배",
    date: "12월 31일 밤 11시",
    gradient: "from-indigo-50 to-blue-50",
    border: "border-indigo-200",
  },
];

const worshipGuidelines = [
  {
    icon: Clock,
    title: "예배 시작 10분 전 입장",
    description: "경건한 마음으로 예배를 준비할 수 있도록 미리 입장해 주세요.",
  },
  {
    icon: Phone,
    title: "핸드폰은 진동/무음으로",
    description: "예배 중 휴대전화는 진동 또는 무음 모드로 설정해 주세요.",
  },
  {
    icon: BookOpen,
    title: "주보는 입구에서 배부",
    description: "예배당 입구에서 주보를 받으신 후 자리에 착석해 주세요.",
  },
  {
    icon: HandHeart,
    title: "헌금은 예배 중 수거",
    description: "헌금은 예배 순서에 따라 헌금위원이 수거합니다.",
  },
  {
    icon: Car,
    title: "주차 안내",
    description: "교회 지하주차장을 이용하시고, 만차 시 인근 주차장을 이용해 주세요.",
  },
  {
    icon: Baby,
    title: "유아실 운영 안내",
    description: "1층 유아실에서 영유아 돌봄 서비스를 운영하고 있습니다.",
  },
];

const worshipAtmosphere = [
  {
    image:
      "https://images.unsplash.com/photo-1510025024243-4cc8e1e8e4d4?q=80&w=2070",
    title: "찬양과 경배",
    subtitle: "Praise & Worship",
    description: "온 마음을 다해 주님께 찬양을 올려드립니다",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070",
    title: "말씀 선포",
    subtitle: "Proclamation",
    description: "살아있는 하나님의 말씀을 선포합니다",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070",
    title: "기도와 교제",
    subtitle: "Prayer & Fellowship",
    description: "기도로 하나 되고 사랑으로 교제합니다",
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
      <Header basePath="/demo/variant-b" />

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

      {/* Live Worship Banner */}
      <Section background="white" padding="md" aria-label="실시간 예배">
        <motion.div
          {...animateProps(0)}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-none shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-primary-500 to-amber-500 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                      <Play size={24} className="text-white ml-0.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          실시간 예배
                        </h3>
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                          <motion.span
                            className="w-2 h-2 rounded-full bg-red-400 inline-block"
                            animate={
                              shouldReduceMotion
                                ? undefined
                                : {
                                    scale: [1, 1.4, 1],
                                    opacity: [1, 0.6, 1],
                                  }
                            }
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            aria-hidden="true"
                          />
                          LIVE
                        </span>
                      </div>
                      <p className="text-white/90 text-sm md:text-base mb-1">
                        온라인으로 함께 예배하세요
                      </p>
                      <div className="flex items-center gap-4 text-white/70 text-sm mt-2">
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          주일 1부 오전 9:00 | 2부 오전 11:00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 md:shrink-0">
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="lg"
                        className="bg-white text-primary-600 hover:bg-white/90 rounded-full px-6 font-semibold group w-full sm:w-auto"
                      >
                        <Youtube size={18} className="mr-2" />
                        YouTube 시청
                        <ArrowRight
                          size={16}
                          className="ml-2 group-hover:translate-x-1 transition-transform"
                        />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
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

      {/* Special Worship / Seasonal Events */}
      <Section background="white" padding="xl" aria-label="특별예배 안내">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              Special
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader
              title="특별예배 안내"
              subtitle="절기에 따라 드려지는 특별 예배를 안내합니다"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {specialWorships.map((item, i) => (
            <motion.div
              key={item.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? instantTransition
                  : { delay: i * 0.1, duration: 0.5 }
              }
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            >
              <Card
                className={`h-full border ${item.border} shadow-md hover:shadow-xl transition-all overflow-hidden`}
              >
                <CardContent className="p-0">
                  <div
                    className={`bg-gradient-to-br ${item.gradient} p-5 text-center`}
                  >
                    <span
                      className="text-4xl block mb-2"
                      role="img"
                      aria-label={item.title}
                    >
                      {item.emoji}
                    </span>
                    <h4 className="font-bold text-neutral-900 text-lg">
                      {item.title}
                    </h4>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-primary-600 font-medium">
                      <Clock size={13} />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Worship Guidelines */}
      <Section background="gray" padding="xl" aria-label="예배 안내 사항">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              Guide
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader
              title="예배 안내 사항"
              subtitle="은혜로운 예배를 위해 아래 사항을 참고해 주세요"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {worshipGuidelines.map((item, i) => (
            <motion.div
              key={item.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? instantTransition
                  : { delay: i * 0.08, duration: 0.5 }
              }
            >
              <Card className="border-none shadow-sm hover:shadow-md transition-all h-full bg-white">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Worship Atmosphere */}
      <Section background="white" padding="xl" aria-label="예배 분위기">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              Atmosphere
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader
              title="예배의 은혜"
              subtitle="성락교회의 예배 분위기를 소개합니다"
            />
          </motion.div>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0">
          {worshipAtmosphere.map((item, i) => (
            <motion.div
              key={item.title}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? instantTransition
                  : { delay: i * 0.15, duration: 0.6 }
              }
              className="min-w-[80vw] sm:min-w-[60vw] md:min-w-0 snap-center"
            >
              <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden group cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300 text-sm font-semibold mb-1">
                    {item.subtitle}
                  </p>
                  <h4 className="text-xl font-bold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Enhanced Newcomer CTA Section */}
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
        {/* Animated dot pattern background */}
        <div className="absolute inset-0 z-[1]" aria-hidden="true">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary-400/20"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
              }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: [0.15, 0.4, 0.15],
                      scale: [1, 1.5, 1],
                    }
              }
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
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
              className="text-lg text-white/70 leading-relaxed mb-6"
            >
              편안한 마음으로 방문해 주세요. 따뜻한 교제와 은혜로운 예배가
              여러분을 기다립니다.
            </motion.p>
            {/* Worship time summary in CTA */}
            <motion.div
              {...animateProps(0.25)}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {[
                { label: "주일 1부", time: "오전 9:00" },
                { label: "주일 2부", time: "오전 11:00" },
                { label: "수요예배", time: "오후 7:30" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm"
                >
                  <Clock size={14} className="text-primary-400" />
                  <span className="font-medium">{item.label}</span>
                  <span className="text-white/50">|</span>
                  <span>{item.time}</span>
                </span>
              ))}
            </motion.div>
            <motion.div
              {...animateProps(0.3)}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link href="/demo/variant-b/newcomer">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-8 group w-full sm:w-auto"
                >
                  새가족 안내
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href="/demo/variant-b/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 group w-full sm:w-auto"
                >
                  <Navigation size={18} className="mr-2" />
                  오시는 길
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer basePath="/demo/variant-b" />

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
