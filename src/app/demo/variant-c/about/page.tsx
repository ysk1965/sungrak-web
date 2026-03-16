"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, Users, MapPin, Phone, Printer, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";
import { initialChurchInfo } from "@/mocks/data/initial";

const { greeting, vision, history, location } = initialChurchInfo;

const visionCards = [
  {
    icon: Heart,
    value: vision.values[0],
    color: "bg-primary-100",
    textColor: "text-primary-500",
    accentFrom: "from-primary-100",
  },
  {
    icon: Users,
    value: vision.values[1],
    color: "bg-amber-100",
    textColor: "text-amber-600",
    accentFrom: "from-amber-100",
  },
];

const contactItems = [
  {
    icon: MapPin,
    label: "주소",
    value: location.address,
    color: "bg-emerald-100",
    textColor: "text-emerald-600",
  },
  {
    icon: Phone,
    label: "전화",
    value: location.phone,
    color: "bg-blue-100",
    textColor: "text-blue-600",
    href: `tel:${location.phone}`,
  },
  {
    icon: Printer,
    label: "팩스",
    value: location.fax || "",
    color: "bg-violet-100",
    textColor: "text-violet-600",
  },
];

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  const greetingParagraphs = greeting.content.split("\n\n");

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header basePath="/demo/variant-c" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:text-primary-600 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
      >
        본문 바로가기
      </a>

      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[40vh] min-h-[300px] pt-16 md:pt-20"
        aria-label="교회소개 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
          alt="성락교회 예배당 전경"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }
            }
            className="text-center"
          >
            <p className="text-sm text-primary-400 font-medium mb-3 tracking-widest">
              ABOUT US
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              교회소개
            </h1>
            <p className="text-neutral-200 text-lg">신실한 헌신, 긍휼한 아낌</p>
          </motion.div>
        </div>
      </section>

      {/* Pastor Greeting */}
      <Section background="white" padding="xl" aria-label="담임목사 인사말">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-neutral-200 relative">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
                alt="담임목사"
                fill
                className="object-cover"
              />
            </div>
            <motion.div
              initial={
                prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { delay: 0.3 }
              }
              className="absolute -top-4 -right-4 bg-gradient-to-br from-primary-500 to-amber-500 text-white p-4 rounded-2xl shadow-xl"
              aria-hidden="true"
            >
              <Sparkles size={28} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
          >
            <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
              GREETING
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              {greeting.title}
            </h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              {greetingParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 text-lg font-medium text-neutral-800 italic">
              — {greeting.pastorName}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Vision & Core Values */}
      <Section background="gray" padding="xl" aria-label="비전 및 핵심가치">
        <div className="text-center mb-10">
          <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
            VISION
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
              {vision.title}
            </span>
          </h2>
          <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {vision.content}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {visionCards.map((card, i) => (
            <motion.div
              key={card.value}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { delay: i * 0.15 }
              }
              whileHover={prefersReducedMotion ? {} : { y: -5, scale: 1.02 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md">
                <CardContent className="p-8 relative text-center">
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.accentFrom} to-transparent rounded-bl-full opacity-50`}
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 rounded-2xl ${card.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                      aria-hidden="true"
                    >
                      <card.icon className={card.textColor} size={32} />
                    </div>
                    <h3 className="font-bold text-neutral-900 text-lg">
                      {card.value}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Church History Timeline */}
      <Section background="white" padding="xl" aria-label="교회 연혁">
        <div className="text-center mb-10">
          <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
            HISTORY
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            교회 연혁
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-500 to-primary-200 md:-translate-x-px"
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
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                className={`relative flex items-center gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year Circle */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-primary-500 text-white font-bold text-sm flex items-center justify-center shadow-lg">
                    {item.year.slice(2)}
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "md:pr-4" : "md:pl-4 md:ml-auto"
                  }`}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md">
                    <CardContent className="p-5 relative">
                      <div
                        className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50"
                        aria-hidden="true"
                      />
                      <div className="relative z-10">
                        <span className="text-primary-500 font-bold text-lg">
                          {item.year}
                        </span>
                        <p className="text-neutral-700 mt-1">{item.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Location & Contact */}
      <Section background="gray" padding="xl" aria-label="오시는 길">
        <div className="text-center mb-10">
          <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
            LOCATION
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            오시는 길
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
          >
            <div className="bg-neutral-200 rounded-2xl aspect-video flex flex-col items-center justify-center text-neutral-500 shadow-md">
              <MapPin
                size={48}
                className="mb-3 text-primary-400"
                aria-hidden="true"
              />
              <p className="font-medium text-neutral-600">지도 영역</p>
              <p className="text-sm mt-1">{location.address}</p>
            </div>
          </motion.div>

          {/* Contact Info */}
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
                >
                  <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md">
                    <CardContent className="p-5 relative">
                      <div
                        className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50"
                        aria-hidden="true"
                      />
                      <div className="flex items-center gap-4 relative z-10">
                        <div
                          className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                          aria-hidden="true"
                        >
                          <item.icon className={item.textColor} size={22} />
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 mb-0.5">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="font-bold text-neutral-900 hover:text-primary-600 transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="font-bold text-neutral-900">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </Section>

      <Footer basePath="/demo/variant-c" />

      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group min-h-[44px] flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
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
