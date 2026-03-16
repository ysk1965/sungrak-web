"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Minus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/common/section";
import { Container, CrossNav } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { initialWorships } from "@/mocks/data/initial";

const visitorInfoItems = [
  {
    icon: Clock,
    title: "예배 시간",
    description:
      "예배 시작 10분 전까지 오시면 됩니다. 안내위원이 좌석을 안내해 드립니다.",
  },
  {
    icon: MapPin,
    title: "주차 안내",
    description:
      "교회 건물 지하 주차장을 이용하실 수 있습니다. 주차 공간이 제한적이니 대중교통 이용을 권장합니다.",
  },
  {
    icon: Users,
    title: "새가족 안내",
    description:
      "처음 방문하신 분은 1층 안내 데스크에서 새가족 등록을 하실 수 있습니다.",
  },
];

export default function WorshipPage() {
  const shouldReduceMotion = useReducedMotion();

  const sundayWorships = initialWorships.filter((w) => w.day === "sunday");
  const weekdayWorships = initialWorships.filter((w) => w.day !== "sunday");

  return (
    <>
      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[50vh] min-h-[400px] pt-20 flex items-center justify-center overflow-hidden"
        aria-label="예배안내 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070"
          alt="예배당에서 찬양하는 모습"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
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
            WORSHIP
            <Minus size={20} aria-hidden="true" />
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            예배안내
          </h1>
          <p className="text-xl text-white/70 font-light tracking-wide">
            하나님을 예배하는 시간
          </p>
        </motion.div>

        <div
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30"
          aria-hidden="true"
        />
      </section>

      {/* Sunday Worship */}
      <Section background="white" padding="xl" aria-label="주일예배 안내">
        <Container size="lg">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
              SUNDAY SERVICE
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-amber-500 to-primary-500 bg-[length:200%_auto] animate-gradient">
                주일예배
              </span>
            </h2>
            <p className="text-neutral-500 mt-3 text-lg font-light">
              매 주일 세 번의 예배를 드립니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sundayWorships.map((worship, i) => (
              <motion.div
                key={worship.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                className="bg-neutral-50 rounded-3xl p-8 hover:shadow-xl transition-all motion-reduce:transition-none group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow motion-reduce:transition-none">
                    <Calendar
                      size={22}
                      className="text-primary-500"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-xs text-neutral-400 tracking-wide uppercase font-medium">
                    {worship.location}
                  </span>
                </div>
                <h3 className="font-bold text-neutral-900 text-xl mb-3 group-hover:text-primary-600 transition-colors motion-reduce:transition-none">
                  {worship.name}
                </h3>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
                  {worship.time}
                </p>
                {worship.description && (
                  <p className="text-sm text-neutral-500 mt-3">
                    {worship.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Container size="lg">
        <Separator className="bg-neutral-100" aria-hidden="true" />
      </Container>

      {/* Weekday Worship */}
      <Section background="white" padding="xl" aria-label="주중예배 안내">
        <Container size="lg">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
              WEEKDAY SERVICE
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              주중예배
            </h2>
            <p className="text-neutral-500 mt-3 text-lg font-light">
              주중에도 함께 예배드립니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {weekdayWorships.map((worship, i) => (
              <motion.div
                key={worship.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                className="bg-neutral-50 rounded-3xl p-8 hover:shadow-xl transition-all motion-reduce:transition-none group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Calendar
                      size={22}
                      className="text-primary-500"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-xs text-neutral-400 tracking-wide uppercase font-medium">
                    {worship.location}
                  </span>
                </div>
                <h3 className="font-bold text-neutral-900 text-xl mb-3 group-hover:text-primary-600 transition-colors motion-reduce:transition-none">
                  {worship.name}
                </h3>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
                  {worship.time}
                </p>
                {worship.description && (
                  <p className="text-sm text-neutral-500 mt-3">
                    {worship.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Container size="lg">
        <Separator className="bg-neutral-100" aria-hidden="true" />
      </Container>

      {/* Visitor Info */}
      <Section background="white" padding="xl" aria-label="방문자 안내">
        <Container size="lg">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
              FOR VISITORS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              처음{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-amber-500 to-primary-500 bg-[length:200%_auto] animate-gradient">
                방문하시나요?
              </span>
            </h2>
            <p className="text-neutral-500 mt-3 text-lg font-light">
              편안하게 예배에 참여하실 수 있도록 안내해 드립니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visitorInfoItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                className="bg-neutral-50 rounded-3xl p-8 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md transition-shadow motion-reduce:transition-none">
                  <item.icon
                    size={28}
                    className="text-primary-500"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-bold text-neutral-900 text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/demo/variant-e/newcomer">
              <Button
                size="lg"
                className="group shadow-lg shadow-primary-500/20 min-h-[44px] h-14 text-base"
              >
                새가족 안내 보기
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Section>

      <CrossNav basePath="/demo/variant-e" currentPage="worship" />
    </>
  );
}
