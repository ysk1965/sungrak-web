"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Heart,
  Users,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { initialChurchInfo, initialWorships } from "@/mocks/data/initial";

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

const steps = [
  {
    number: 1,
    icon: Clock,
    title: "예배 참석",
    description: "주일예배 시간에 맞추어 편안하게 방문해 주세요",
  },
  {
    number: 2,
    icon: CheckCircle,
    title: "새가족 등록",
    description: "안내 데스크에서 등록 카드를 작성해 주세요",
  },
  {
    number: 3,
    icon: Users,
    title: "새가족 교육",
    description: "4주간의 새가족 교육 과정에 참여해 주세요",
  },
  {
    number: 4,
    icon: Heart,
    title: "소그룹 배정",
    description: "목장(소그룹)에 배정되어 함께 성장합니다",
  },
];

const dayLabels: Record<string, string> = {
  sunday: "주일",
  monday: "월요일",
  tuesday: "화요일",
  wednesday: "수요일",
  thursday: "목요일",
  friday: "금요일",
  saturday: "토요일",
};

export default function VariantJNewcomerPage() {
  const rm = useReducedMotion();
  const { location } = initialChurchInfo;

  return (
    <>
      {/* Hero */}
      <section
        id="main-content"
        aria-label="새가족 환영"
        className="bg-stone-950 mt-16 md:mt-20 py-20 md:py-32"
      >
        <Container size="xl">
          <motion.div
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            animate="visible"
          >
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-6">
              WELCOME
            </Badge>
          </motion.div>

          <motion.h1
            variants={makeFadeInUp(30, 0.1, 0.8, rm)}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              새가족
            </span>
            을
            <br />
            환영합니다
          </motion.h1>

          <motion.p
            variants={makeFadeInUp(20, 0.2, 0.6, rm)}
            initial="hidden"
            animate="visible"
            className="text-lg text-stone-400 tracking-wide max-w-xl"
          >
            성락교회에 처음 방문하시는 분들을 진심으로 환영합니다.
            따뜻한 공동체와 함께 믿음의 여정을 시작하세요.
          </motion.p>
        </Container>
      </section>

      {/* Welcome Message */}
      <section aria-label="환영 인사" className="bg-stone-900 py-20">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              variants={makeFadeInX(-40, 0, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070"
                  alt="성락교회 환영 모습"
                  fill
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent"
                />
              </div>
              {/* Decorative amber border */}
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-amber-500/30 -z-10"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              variants={makeFadeInX(40, 0.2, 0.8, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  따뜻한 환영
                </span>
                의 말씀
              </h2>
              <div className="space-y-4 text-stone-300 leading-relaxed">
                <p>{initialChurchInfo.greeting.content.split("\n\n")[0]}</p>
                <p>{initialChurchInfo.greeting.content.split("\n\n")[1]}</p>
                <p>{initialChurchInfo.greeting.content.split("\n\n")[2]}</p>
              </div>
              <p className="mt-6 text-amber-400 font-semibold">
                - {initialChurchInfo.greeting.pastorName}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* First Visit Guide */}
      <section aria-label="처음 방문 안내" className="bg-stone-950 py-20">
        <Container size="xl">
          <div className="text-center mb-14">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3"
            >
              FIRST VISIT
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0.1, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              처음 방문하시는 분들을 위한 안내
            </motion.h2>
            <motion.p
              variants={makeFadeInUp(10, 0.2, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-stone-500 mt-3"
            >
              간단한 4단계로 성락교회 가족이 되실 수 있습니다
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={makeFadeInUp(30, i * 0.12, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={rm ? undefined : { y: -5 }}
                className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 transition-all duration-300 hover:border-amber-500/30"
              >
                {/* Step number */}
                <div className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 font-bold text-lg flex items-center justify-center mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <step.icon size={24} className="text-amber-400" aria-hidden="true" />
                </div>

                <h3 className="font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Connecting arrows (visual only, hidden on mobile) */}
          <div
            aria-hidden="true"
            className="hidden lg:flex justify-center items-center gap-2 mt-8"
          >
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500/50 to-amber-500/20" />
                <ArrowRight size={16} className="text-amber-500/40" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Worship Times Quick Reference */}
      <section aria-label="예배 시간 안내" className="bg-stone-900 py-20">
        <Container size="xl">
          <div className="text-center mb-12">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3"
            >
              WORSHIP
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0.1, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              예배 시간 안내
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {initialWorships.map((worship, i) => (
              <motion.div
                key={worship.id}
                variants={makeFadeInUp(20, i * 0.08, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-5 flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <Clock size={20} className="text-amber-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{worship.name}</h3>
                  <p className="text-sm text-stone-400">
                    {dayLabels[worship.day] ?? worship.day} {worship.time}
                  </p>
                  <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                    <MapPin size={12} className="text-stone-500" aria-hidden="true" />
                    {worship.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact / FAQ */}
      <section aria-label="문의 안내" className="bg-stone-950 py-20">
        <Container size="xl">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3"
            >
              CONTACT
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0.1, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              궁금한 점이 있으시면
              <br />
              연락해 주세요
            </motion.h2>
            <motion.p
              variants={makeFadeInUp(10, 0.2, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-stone-400 mb-10"
            >
              언제든지 편하게 문의해 주시면 친절하게 안내해 드리겠습니다
            </motion.p>

            <motion.div
              variants={makeFadeInUp(20, 0.3, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-8 space-y-6"
            >
              <div className="flex items-center gap-4 justify-center">
                <div
                  className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Phone size={24} className="text-amber-400" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-stone-500">전화</p>
                  <p className="text-lg font-semibold text-white">{location.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center">
                <div
                  className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <MapPin size={24} className="text-amber-400" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-stone-500">주소</p>
                  <p className="text-lg font-semibold text-white">{location.address}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-700/50">
                <Link href="/newcomer">
                  <Button className="bg-amber-500 text-stone-950 hover:bg-amber-400 font-semibold px-8 py-3 min-h-[44px] rounded-full group">
                    문의하기
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

    </>
  );
}
