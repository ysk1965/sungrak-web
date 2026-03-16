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
      <Header />

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
              신실한 헌신과 긍휼한 아낌으로 하나님과 이웃을 섬기는 공동체
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
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 md:-translate-x-px" />

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
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow -translate-x-1/2 z-10" />

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
            <SectionHeader title="교회 조직" />
          </motion.div>
        </div>
        <motion.div {...animateProps(0.2)} className="max-w-3xl mx-auto">
          <Card className="shadow-lg border-none">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
                <Users size={36} className="text-primary-600" />
              </div>
              <p className="text-neutral-700 text-lg leading-relaxed">
                {churchInfo.organization.content}
              </p>
              <div className="mt-8 p-8 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: BookOpen,
                      title: "담임목사",
                      desc: "교회의 영적 리더십",
                      color: "bg-blue-500",
                    },
                    {
                      icon: Users,
                      title: "장로회",
                      desc: "교회 운영 및 행정",
                      color: "bg-emerald-500",
                    },
                    {
                      icon: Heart,
                      title: "각 부서",
                      desc: "사역과 봉사",
                      color: "bg-rose-500",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
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
                      className="text-center"
                    >
                      <div
                        className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-3`}
                      >
                        <item.icon size={24} className="text-white" />
                      </div>
                      <h4 className="font-bold text-neutral-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-neutral-500 mt-1">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

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
          {/* Map Placeholder */}
          <motion.div {...animateProps(0.2)}>
            <div className="aspect-[4/3] rounded-2xl bg-neutral-200 overflow-hidden relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500">
                <MapPin size={48} className="text-primary-500 mb-3" />
                <p className="font-medium text-neutral-700">
                  {churchInfo.location.address}
                </p>
                <p className="text-sm text-neutral-400 mt-1">지도 영역</p>
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
