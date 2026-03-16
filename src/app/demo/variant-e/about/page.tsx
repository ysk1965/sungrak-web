"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Heart,
  Users,
  MapPin,
  Phone,
  Printer,
  Sparkles,
  Minus,
  Quote,
} from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/common/section";
import { Container, CrossNav } from "@/components/common";
import { Separator } from "@/components/ui/separator";
import { initialChurchInfo } from "@/mocks/data/initial";

const { greeting, vision, history, location } = initialChurchInfo;

const visionCards = [
  {
    icon: Heart,
    value: vision.values[0],
    description:
      "하나님을 향한 변함없는 헌신과 성실한 믿음으로 예배하며 섬기는 공동체",
  },
  {
    icon: Users,
    value: vision.values[1],
    description:
      "이웃을 내 몸처럼 사랑하고 아끼며 긍휼의 마음으로 섬기는 공동체",
  },
];

const contactItems = [
  {
    icon: MapPin,
    label: "주소",
    value: location.address,
  },
  {
    icon: Phone,
    label: "전화",
    value: location.phone,
    href: `tel:${location.phone}`,
  },
  {
    icon: Printer,
    label: "팩스",
    value: location.fax || "",
  },
];

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  const greetingParagraphs = greeting.content.split("\n\n");

  return (
    <>
      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[50vh] min-h-[400px] pt-20 flex items-center justify-center overflow-hidden"
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
          className="absolute inset-0 bg-black/40"
          aria-hidden="true"
        />
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.8 }
          }
          className="relative text-center text-white"
        >
          <span className="inline-flex items-center gap-3 text-primary-300 font-medium tracking-[0.3em] mb-4">
            <Minus size={20} aria-hidden="true" />
            ABOUT US
            <Minus size={20} aria-hidden="true" />
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            교회소개
          </h1>
          <p className="text-xl text-white/70 font-light tracking-wide">
            신실한 헌신, 긍휼한 아낌
          </p>
        </motion.div>

        {/* Decorative Corners */}
        <div
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30"
          aria-hidden="true"
        />
      </section>

      {/* Pastor Greeting */}
      <Section background="white" padding="xl" aria-label="담임목사 인사말">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : undefined}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
                  alt="담임목사"
                  fill
                  className="object-cover"
                />
              </div>
              <motion.div
                initial={
                  shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }
                }
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg"
                aria-hidden="true"
              >
                <Sparkles size={32} className="text-white" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : undefined}
            >
              <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
                GREETING
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
                {greeting.title}
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed text-lg">
                {greetingParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-8 text-lg font-medium text-neutral-800 italic">
                — {greeting.pastorName}
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Container size="lg">
        <Separator className="bg-neutral-100" aria-hidden="true" />
      </Container>

      {/* Vision & Core Values */}
      <Section background="white" padding="xl" aria-label="비전 및 핵심가치">
        <Container size="lg">
          <div className="text-center mb-14">
            <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
              VISION
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-amber-500 to-primary-500 bg-[length:200%_auto] animate-gradient">
                {vision.title}
              </span>
            </h2>
            <p className="text-neutral-500 leading-relaxed max-w-2xl mx-auto text-lg font-light">
              {vision.content}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {visionCards.map((card, i) => (
              <motion.div
                key={card.value}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.15 }
                }
                whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                className="bg-neutral-50 rounded-3xl p-8 text-center group cursor-pointer hover:shadow-xl transition-all motion-reduce:transition-none"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow motion-reduce:transition-none">
                  <card.icon
                    size={32}
                    className="text-primary-500"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-bold text-neutral-900 text-xl mb-3">
                  {card.value}
                </h3>
                <p className="text-neutral-500 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Visual Banner */}
      <section
        className="relative h-[40vh] overflow-hidden"
        aria-label="비전 배너"
      >
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2070"
            alt="예배 분위기"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-2xl px-6"
          >
            <Quote
              size={48}
              className="mx-auto text-white/30 mb-6"
              aria-hidden="true"
            />
            <p className="text-2xl md:text-3xl font-bold leading-tight">
              Faith, a Relationship
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-amber-200">
                with the Lord
              </span>
            </p>
          </motion.div>
        </div>
        <div
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30"
          aria-hidden="true"
        />
      </section>

      {/* Church History Timeline */}
      <Section background="white" padding="xl" aria-label="교회 연혁">
        <Container size="lg">
          <div className="text-center mb-14">
            <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
              HISTORY
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              교회 연혁
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline Line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-500 to-primary-200 md:-translate-x-px"
              aria-hidden="true"
            />

            <div className="space-y-10">
              {history.map((item, i) => (
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
                    shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
                  }
                  className={`relative flex items-center gap-6 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Year Circle */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-amber-500 text-white font-bold text-sm flex items-center justify-center shadow-lg">
                      {item.year.slice(2)}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "md:pr-4" : "md:pl-4 md:ml-auto"
                    }`}
                  >
                    <div className="bg-neutral-50 rounded-2xl p-6 hover:shadow-lg transition-shadow motion-reduce:transition-none">
                      <span className="text-primary-500 font-bold text-lg">
                        {item.year}
                      </span>
                      <p className="text-neutral-700 mt-1">{item.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Container size="lg">
        <Separator className="bg-neutral-100" aria-hidden="true" />
      </Container>

      {/* Location & Contact */}
      <Section background="white" padding="xl" aria-label="오시는 길">
        <Container size="lg">
          <div className="text-center mb-14">
            <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
              LOCATION
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              오시는 길
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : undefined}
            >
              <div className="bg-neutral-100 rounded-3xl aspect-video flex flex-col items-center justify-center text-neutral-500">
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
              initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : undefined}
              className="space-y-4"
            >
              {contactItems
                .filter((item) => item.value)
                .map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 10 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={
                      shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
                    }
                    className="flex items-center gap-4 p-5 bg-neutral-50 rounded-2xl hover:shadow-md transition-shadow motion-reduce:transition-none group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow motion-reduce:transition-none">
                      <item.icon
                        size={22}
                        className="text-primary-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 mb-0.5 tracking-wide uppercase">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-bold text-neutral-900 hover:text-primary-600 transition-colors motion-reduce:transition-none"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-bold text-neutral-900">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </Container>
      </Section>

      <CrossNav basePath="/demo/variant-e" currentPage="about" />
    </>
  );
}
