"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Printer,
  Heart,
  BookOpen,
  Users,
  ChevronRight,
  Music,
  Globe,
  HandHeart,
  GraduationCap,
  Mic2,
  Compass,
  Sparkles,
  HeartHandshake,
  Sprout,
  Navigation,
  Landmark,
  Train,
} from "lucide-react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Container } from "@/components/common";
import { Section, SectionHeader } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { initialChurchInfo } from "@/mocks/data/initial";
import { instantTransition } from "@/lib/animations";

export default function VariantBAboutPage() {
  const shouldReduceMotion = useReducedMotion();
  const churchInfo = initialChurchInfo;

  const animateProps = (delay = 0) => ({
    initial: shouldReduceMotion ? false : ({ opacity: 0, y: 20 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
    transition: shouldReduceMotion
      ? instantTransition
      : { delay, duration: 0.6 },
  });

  return (
    <div className="min-h-screen bg-white">
      <Header basePath="/demo/variant-b" />

      {/* Hero Section */}
      <section
        className="relative h-[50vh] md:h-[60vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="교회소개 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
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
              About
            </Badge>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300 font-semibold mb-2 text-lg">
              About Our Church
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
              교회소개
            </h1>
            <p className="text-lg text-white/70 max-w-xl">
              신실한 헌신과 긍휼한 사귐으로 하나님과 이웃을 섬기는 공동체
            </p>
          </motion.div>
        </Container>
        {/* Decorative pills */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-10">
          {["비전", "역사", "조직"].map((label, i) => (
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

      {/* Pastor Greeting Section */}
      <Section background="white" padding="xl" aria-label="담임목사 인사말">
        <div className="relative z-20 -mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Pastor Image */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? instantTransition : { duration: 0.7 }
              }
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-neutral-100"
            >
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000"
                alt="담임목사"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-bold text-lg">
                  {churchInfo.greeting.pastorName}
                </p>
                <p className="text-white/70 text-sm">성락교회 담임목사</p>
              </div>
            </motion.div>

            {/* Greeting Content */}
            <div>
              <motion.div {...animateProps(0.1)}>
                <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
                  Greeting
                </Badge>
              </motion.div>
              <motion.h2
                {...animateProps(0.2)}
                className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6"
              >
                {churchInfo.greeting.title}
              </motion.h2>
              <motion.div
                {...animateProps(0.3)}
                className="text-neutral-600 leading-relaxed whitespace-pre-line text-base md:text-lg"
              >
                {churchInfo.greeting.content}
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision Section - Dark */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        aria-label="교회 비전"
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
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              {...animateProps(0)}
              className="text-primary-400 tracking-widest text-sm font-semibold mb-4 uppercase"
            >
              Our Vision
            </motion.p>
            <motion.h2
              {...animateProps(0.1)}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                {churchInfo.vision.title}
              </span>
            </motion.h2>
            <motion.p
              {...animateProps(0.2)}
              className="text-lg text-white/70 leading-relaxed mb-10"
            >
              {churchInfo.vision.content}
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3">
              {churchInfo.vision.values.map((value, i) => (
                <motion.span
                  key={value}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }
                  }
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion
                      ? instantTransition
                      : { delay: 0.3 + i * 0.1 }
                  }
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium"
                >
                  {value}
                </motion.span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <Section background="white" padding="xl" aria-label="핵심 가치">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              Core Values
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader
              title="핵심 가치"
              subtitle="우리 공동체가 추구하는 세 가지 핵심 가치"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Sparkles,
              title: "신실한 헌신",
              subtitle: "Sincere Devotion",
              verse: "골로새서 3:23",
              description:
                "무슨 일을 하든지 마음을 다하여 주께 하듯 하고 사람에게 하듯 하지 않는 신실한 헌신의 삶을 추구합니다.",
              gradient: "from-amber-500 to-orange-500",
              bgLight: "bg-amber-50",
            },
            {
              icon: HeartHandshake,
              title: "긍휼한 사귐",
              subtitle: "Compassionate Fellowship",
              verse: "골로새서 3:12",
              description:
                "하나님의 택하신 자로서 긍휼과 자비와 겸손과 온유와 오래 참음을 옷 입듯 하는 공동체를 이룹니다.",
              gradient: "from-rose-500 to-pink-500",
              bgLight: "bg-rose-50",
            },
            {
              icon: Sprout,
              title: "함께 성장",
              subtitle: "Growing Together",
              verse: "에베소서 4:15",
              description:
                "사랑 안에서 참된 것을 말하여 범사에 그에게까지 자라나가며 함께 성숙한 믿음의 공동체로 나아갑니다.",
              gradient: "from-emerald-500 to-teal-500",
              bgLight: "bg-emerald-50",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 30 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? instantTransition
                  : { delay: 0.1 + i * 0.15, duration: 0.6 }
              }
              whileHover={shouldReduceMotion ? undefined : { y: -6 }}
            >
              <Card className="shadow-lg border-none h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-5 shadow-lg`}
                  >
                    <item.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-primary-500 font-medium mb-3">
                    {item.subtitle}
                  </p>
                  <p className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${item.bgLight} text-neutral-600 mb-4`}>
                    {item.verse}
                  </p>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* History Timeline Section */}
      <Section background="gray" padding="xl" aria-label="교회 연혁">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              History
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader title="교회 연혁" subtitle="성락교회의 발자취" />
          </motion.div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line - Gradient */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px bg-gradient-to-b from-primary-300 via-primary-500 to-amber-400" />

          {churchInfo.history.map((item, i) => (
            <motion.div
              key={item.year}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, x: i % 2 === 0 ? -30 : 30 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? instantTransition
                  : { delay: i * 0.15, duration: 0.5 }
              }
              className={`relative flex items-center mb-12 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot - Animated Pulse */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                <div className="w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow" />
                <motion.div
                  className="absolute inset-0 w-4 h-4 rounded-full bg-primary-500"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: [1, 2, 2],
                          opacity: [0.6, 0.2, 0],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? instantTransition
                      : {
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut",
                        }
                  }
                />
              </div>

              {/* Content */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                }`}
              >
                <Card className="shadow-md hover:shadow-lg transition-shadow border-none">
                  <CardContent className="p-6">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-400">
                      {item.year}
                    </span>
                    <p className="text-neutral-700 mt-2 font-medium">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Organization Section */}
      <Section background="white" padding="xl" aria-label="교회 조직">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              Organization
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader title="교회 조직" subtitle="성락교회의 섬김 구조" />
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Organization Description */}
          <motion.p
            {...animateProps(0.15)}
            className="text-center text-neutral-600 text-lg leading-relaxed max-w-2xl mx-auto mb-12"
          >
            {churchInfo.organization.content}
          </motion.p>

          {/* Top Leadership Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: BookOpen,
                title: "담임목사",
                desc: "교회의 영적 리더십을 이끌며 말씀 선포와 목양을 담당합니다.",
                color: "from-blue-500 to-indigo-600",
                borderColor: "border-blue-200",
              },
              {
                icon: Users,
                title: "장로회",
                desc: "교회의 주요 의사결정과 행정, 재정을 총괄합니다.",
                color: "from-emerald-500 to-teal-600",
                borderColor: "border-emerald-200",
              },
              {
                icon: Heart,
                title: "집사회",
                desc: "각 부서와 사역의 실무를 담당하며 교회를 섬깁니다.",
                color: "from-rose-500 to-pink-600",
                borderColor: "border-rose-200",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 30 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion
                    ? instantTransition
                    : { delay: 0.2 + i * 0.1, duration: 0.5 }
                }
                whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.02 }}
              >
                <Card className={`shadow-lg border ${item.borderColor} hover:shadow-xl transition-all h-full`}>
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <item.icon size={28} className="text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-neutral-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Connecting Line Visual */}
          <motion.div
            {...animateProps(0.4)}
            className="flex justify-center mb-8"
          >
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-gradient-to-b from-primary-300 to-primary-500" />
              <div className="w-3 h-3 rounded-full bg-primary-500" />
              <div className="w-px h-8 bg-gradient-to-b from-primary-500 to-primary-300" />
            </div>
          </motion.div>

          {/* Sub-department Badges */}
          <motion.div
            {...animateProps(0.5)}
            className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
          >
            {[
              { label: "교육부", icon: GraduationCap },
              { label: "찬양팀", icon: Music },
              { label: "선교부", icon: Globe },
              { label: "청년부", icon: Compass },
              { label: "봉사부", icon: HandHeart },
              { label: "행정부", icon: Landmark },
            ].map((dept, i) => (
              <motion.span
                key={dept.label}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion
                    ? instantTransition
                    : { delay: 0.6 + i * 0.06, duration: 0.4 }
                }
                whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-50 border border-neutral-200 text-neutral-700 text-sm font-medium shadow-sm hover:shadow-md hover:border-primary-300 hover:bg-primary-50 transition-all cursor-default"
              >
                <dept.icon size={16} className="text-primary-500" />
                {dept.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Ministry Showcase Section */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        aria-label="사역 안내"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.08),transparent_60%)]" />
        <Container className="relative z-10">
          <div className="text-center mb-14">
            <motion.p
              {...animateProps(0)}
              className="text-primary-400 tracking-widest text-sm font-semibold mb-4 uppercase"
            >
              Ministry Guide
            </motion.p>
            <motion.h2
              {...animateProps(0.1)}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                사역 안내
              </span>
            </motion.h2>
            <motion.p
              {...animateProps(0.15)}
              className="text-white/60 max-w-xl mx-auto"
            >
              성락교회의 다양한 사역을 통해 함께 하나님의 나라를 세워갑니다
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: "예배부",
                description:
                  "주일예배, 수요예배, 새벽기도회 등 모든 예배를 기획하고 진행합니다.",
                gradient: "from-amber-500 to-yellow-500",
              },
              {
                icon: GraduationCap,
                title: "교육부",
                description:
                  "유아부터 청소년까지 다음 세대를 위한 신앙 교육을 담당합니다.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Globe,
                title: "선교부",
                description:
                  "국내외 선교를 지원하고 선교사 파송 및 후원 사역을 합니다.",
                gradient: "from-emerald-500 to-green-500",
              },
              {
                icon: Mic2,
                title: "찬양팀",
                description:
                  "예배 찬양을 인도하며 음악을 통해 하나님을 높이는 사역을 합니다.",
                gradient: "from-purple-500 to-violet-500",
              },
              {
                icon: HandHeart,
                title: "봉사부",
                description:
                  "교회 시설 관리, 식당 봉사, 주차 안내 등 섬김의 사역을 합니다.",
                gradient: "from-rose-500 to-pink-500",
              },
              {
                icon: Compass,
                title: "청년부",
                description:
                  "청년들의 신앙 성장과 교제를 위한 모임과 프로그램을 운영합니다.",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((ministry, i) => (
              <motion.div
                key={ministry.title}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 30 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion
                    ? instantTransition
                    : { delay: 0.2 + i * 0.08, duration: 0.5 }
                }
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -4 }}
                className="group"
              >
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary-500/40 hover:bg-white/10 transition-all h-full">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ministry.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <ministry.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {ministry.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {ministry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Location Section */}
      <Section background="gray" padding="xl" aria-label="오시는 길">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              Location
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader
              title="오시는 길"
              subtitle="성락교회를 방문해 주세요"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Placeholder - Enhanced */}
          <motion.div {...animateProps(0.2)}>
            <div className="aspect-[4/3] rounded-2xl bg-neutral-200 overflow-hidden relative group">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/40 via-transparent to-primary-900/30 z-[1]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.15)_100%)] z-[1]" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-[2]">
                {/* Animated Pin */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { y: [0, -8, 0] }
                  }
                  transition={
                    shouldReduceMotion
                      ? instantTransition
                      : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }
                  className="mb-3"
                >
                  <div className="relative">
                    <MapPin size={52} className="text-primary-500 drop-shadow-lg" />
                    <motion.div
                      className="absolute -inset-2 rounded-full bg-primary-500/20"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }
                      }
                      transition={
                        shouldReduceMotion
                          ? instantTransition
                          : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }
                    />
                  </div>
                </motion.div>

                {/* Address */}
                <p className="font-bold text-neutral-800 text-lg mb-1 px-4 text-center">
                  {churchInfo.location.address}
                </p>
                <p className="text-sm text-neutral-500 mb-5">성락교회</p>

                {/* View Map Button */}
                <motion.button
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  className="px-6 py-2.5 rounded-full bg-primary-500 text-white font-medium text-sm shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-colors flex items-center gap-2"
                >
                  <Navigation size={16} />
                  지도 보기
                </motion.button>
              </div>

              {/* Nearby Landmarks */}
              <div className="absolute bottom-4 left-4 right-4 z-[2]">
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { icon: Train, label: "신도림역 도보 10분" },
                    { icon: Landmark, label: "구로구청 인근" },
                  ].map((landmark) => (
                    <span
                      key={landmark.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-medium shadow-sm"
                    >
                      <landmark.icon size={12} className="text-primary-500" />
                      {landmark.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                color: "bg-emerald-500",
                title: "주소",
                content: churchInfo.location.address,
              },
              {
                icon: Phone,
                color: "bg-amber-500",
                title: "전화",
                content: churchInfo.location.phone,
              },
              {
                icon: Printer,
                color: "bg-blue-500",
                title: "팩스",
                content: churchInfo.location.fax || "",
              },
            ]
              .filter((item) => item.content)
              .map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion
                      ? instantTransition
                      : { delay: 0.3 + i * 0.1 }
                  }
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                >
                  <Card className="shadow-md hover:shadow-lg transition-all border-none">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center shrink-0`}
                      >
                        <item.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{item.title}</p>
                        <p className="font-semibold text-neutral-900">
                          {item.content}
                        </p>
                      </div>
                      <ChevronRight
                        size={20}
                        className="ml-auto text-neutral-300"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

            {/* Transportation Info */}
            <motion.div {...animateProps(0.5)}>
              <Card className="shadow-md border-none bg-primary-50">
                <CardContent className="p-5">
                  <h4 className="font-bold text-neutral-900 mb-3">
                    교통편 안내
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                      지하철: 1호선/2호선 신도림역 1번 출구 도보 10분
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                      버스: 신도림역 하차 (간선 150, 160, 503)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                      주차: 교회 건물 지하주차장 이용 가능
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

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
