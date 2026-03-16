"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { initialWorships } from "@/mocks/data/initial";
import { useBasePath } from "@/contexts/base-path-context";

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

function formatTime(time: string): string {
  const [hour, minute] = time.split(":");
  const h = parseInt(hour, 10);
  const period = h < 12 ? "오전" : "오후";
  const displayHour = h > 12 ? h - 12 : h;
  return `${period} ${displayHour}:${minute}`;
}

const visitorInfo = [
  {
    icon: Calendar,
    title: "예배 시간",
    description:
      "주일예배는 오전 7시, 9시 30분, 11시 30분에 드리며, 수요예배와 새벽기도회도 함께합니다.",
  },
  {
    icon: MapPin,
    title: "주차 안내",
    description:
      "교회 건물 지하주차장 및 인근 공영주차장을 이용하실 수 있습니다. 주일에는 주차 안내 요원이 배치됩니다.",
  },
  {
    icon: Users,
    title: "새가족 안내",
    description:
      "처음 방문하시는 분은 1층 안내 데스크에서 새가족 등록 후 안내를 받으실 수 있습니다.",
  },
];

export default function VariantJWorshipPage() {
  const rm = useReducedMotion();
  const basePath = useBasePath();

  const sundayWorships = initialWorships.filter((w) => w.day === "sunday");
  const weekdayWorships = initialWorships.filter((w) => w.day !== "sunday");

  return (
    <>
      {/* Hero Banner */}
      <section
        id="main-content"
        aria-label="예배안내"
        className="relative h-[50vh] min-h-[400px] mt-16 md:mt-20 overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070"
          alt="예배 모습"
          fill
          className="object-cover"
          priority
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/60 to-stone-950"
        />

        <Container
          size="xl"
          className="relative z-10 h-full flex flex-col justify-center"
        >
          <motion.p
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            animate="visible"
            className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-4"
          >
            WORSHIP
          </motion.p>
          <motion.h1
            variants={makeFadeInUp(30, 0.1, 0.8, rm)}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
          >
            예배안내
          </motion.h1>
          <motion.p
            variants={makeFadeInUp(20, 0.2, 0.6, rm)}
            initial="hidden"
            animate="visible"
            className="text-lg text-stone-300 tracking-wide max-w-lg"
          >
            하나님께 드리는 거룩한 예배, 함께 경배하고 찬양합니다
          </motion.p>
        </Container>
      </section>

      {/* Sunday Worship */}
      <section aria-label="주일 예배 안내" className="bg-stone-950 py-20">
        <Container size="xl">
          <motion.p
            variants={makeFadeInUp(10, 0, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3"
          >
            SUNDAY WORSHIP
          </motion.p>
          <motion.h2
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            주일 예배
          </motion.h2>
          <motion.p
            variants={makeFadeInUp(10, 0.1, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-stone-500 mb-10"
          >
            매주 주일 드리는 예배를 안내합니다
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sundayWorships.map((worship, i) => (
              <motion.div
                key={worship.id}
                variants={makeFadeInUp(20, i * 0.1, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={rm ? undefined : { y: -5 }}
                className="bg-stone-800/50 backdrop-blur-sm rounded-2xl p-6 border border-stone-700/50 hover:shadow-xl transition-all duration-300 group"
              >
                <h3 className="font-bold text-white text-lg group-hover:text-amber-400 transition-colors mb-4">
                  {worship.name}
                </h3>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-4">
                  {formatTime(worship.time)}
                </p>
                <div className="flex items-center gap-1.5 text-sm text-stone-300 mb-2">
                  <MapPin
                    size={15}
                    aria-hidden="true"
                    className="text-amber-400 flex-shrink-0"
                  />
                  {worship.location}
                </div>
                {worship.description && (
                  <p className="text-sm text-stone-500 mt-3 leading-relaxed">
                    {worship.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Weekday Worship */}
      <section aria-label="주중 예배 안내" className="bg-stone-900 py-20">
        <Container size="xl">
          <motion.p
            variants={makeFadeInUp(10, 0, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3"
          >
            WEEKDAY WORSHIP
          </motion.p>
          <motion.h2
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            주중 예배
          </motion.h2>
          <motion.p
            variants={makeFadeInUp(10, 0.1, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-stone-500 mb-10"
          >
            주중에도 함께 예배드릴 수 있습니다
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weekdayWorships.map((worship, i) => (
              <motion.div
                key={worship.id}
                variants={makeFadeInUp(20, i * 0.1, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={rm ? undefined : { y: -5 }}
                className="bg-stone-800/50 backdrop-blur-sm rounded-2xl p-6 border border-stone-700/50 hover:shadow-xl transition-all duration-300 group"
              >
                <h3 className="font-bold text-white text-lg group-hover:text-amber-400 transition-colors mb-4">
                  {worship.name}
                </h3>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-4">
                  {formatTime(worship.time)}
                </p>
                <div className="flex items-center gap-1.5 text-sm text-stone-300 mb-2">
                  <MapPin
                    size={15}
                    aria-hidden="true"
                    className="text-amber-400 flex-shrink-0"
                  />
                  {worship.location}
                </div>
                {worship.description && (
                  <p className="text-sm text-stone-500 mt-3 leading-relaxed">
                    {worship.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Visitor Info */}
      <section aria-label="방문자 안내" className="bg-stone-950 py-20">
        <Container size="xl">
          <motion.p
            variants={makeFadeInUp(10, 0, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3"
          >
            VISITOR INFO
          </motion.p>
          <motion.h2
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            방문 안내
          </motion.h2>
          <motion.p
            variants={makeFadeInUp(10, 0.1, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-stone-500 mb-12"
          >
            처음 방문하시는 분들을 위한 안내입니다
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {visitorInfo.map((info, i) => (
              <motion.div
                key={info.title}
                variants={makeFadeInUp(20, i * 0.1, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={rm ? undefined : { y: -5 }}
                className="bg-stone-800/50 backdrop-blur-sm rounded-2xl p-6 border border-stone-700/50 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <info.icon
                    className="text-amber-400"
                    size={24}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-bold text-white text-lg mb-3">
                  {info.title}
                </h3>
                <p className="text-sm text-stone-400 leading-relaxed">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={makeFadeInUp(20, 0.3, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href={`${basePath}/newcomer`}>
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold shadow-lg shadow-amber-500/20 group h-14 px-8 text-base"
              >
                <Users size={18} aria-hidden="true" />
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
    </>
  );
}
