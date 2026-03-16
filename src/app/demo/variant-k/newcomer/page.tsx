"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Heart,
  Users,
  Clock,
  MapPin,
  ArrowRight,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { initialChurchInfo, initialWorships } from "@/mocks/data/initial";

const dayLabel: Record<string, string> = {
  sunday: "주일",
  monday: "월요일",
  wednesday: "수요일",
};

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

const steps = [
  { step: "01", title: "방문 등록", description: "안내 데스크에서 간단한 방문 등록을 해주세요." },
  { step: "02", title: "예배 참석", description: "자유롭게 예배에 참석하시면 됩니다." },
  { step: "03", title: "새가족 환영", description: "예배 후 새가족 환영 시간에 참여해 주세요." },
  { step: "04", title: "소그룹 안내", description: "관심 있는 소그룹에 연결해 드립니다." },
];

export default function VariantKNewcomerPage() {
  const rm = useReducedMotion();
  const allServices = initialWorships;

  return (
    <>
      {/* Hero */}
      <section
        id="variant-k-content"
        className="relative min-h-[50vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="새가족 안내"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1529070538774-1560d23cee93?q=80&w=2070"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <Container size="lg" className="relative z-10 flex items-center min-h-[50vh]">
          <motion.div
            initial={rm ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={rm ? { duration: 0 } : { duration: 0.8 }}
            className="py-20"
          >
            <p className="text-white/70 text-sm font-medium tracking-[0.3em] uppercase mb-4">
              WELCOME
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              새가족 안내
            </h1>
            <p className="text-white/60 text-lg">
              성락교회는 여러분을 진심으로 환영합니다
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Welcome Message */}
      <section aria-label="환영 메시지" className="py-24 bg-white">
        <Container size="md">
          <motion.div
            variants={makeFadeInUp(30, 0, 0.7, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <Heart size={40} className="text-neutral-300 mx-auto mb-6" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              환영합니다
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl mx-auto">
              성락교회는 누구나 편안하게 하나님을 만날 수 있는 곳입니다.
              처음 오시는 분들도 따뜻한 환영 속에서 함께 예배드릴 수 있도록
              안내해 드리겠습니다.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Steps */}
      <section aria-label="방문 안내" className="py-24 bg-neutral-50">
        <Container size="lg">
          <motion.div
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
              FIRST VISIT
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              처음 방문하시나요?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                variants={makeFadeInUp(20, i * 0.1, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-neutral-100 text-center"
              >
                <div className="text-4xl font-bold text-neutral-200 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Service Times */}
      <section aria-label="예배 시간" className="py-24 bg-white">
        <Container size="md">
          <motion.div
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
              SERVICE TIMES
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              예배 시간 안내
            </h2>
          </motion.div>

          <div className="space-y-4 max-w-xl mx-auto">
            {allServices.map((service, i) => (
              <motion.div
                key={service.id}
                variants={makeFadeInUp(10, i * 0.08, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center justify-between p-5 bg-neutral-50 rounded-xl border border-neutral-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[11px] font-bold leading-none">
                    {dayLabel[service.day] || service.day}
                  </div>
                  <span className="font-medium text-neutral-900">{service.name}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-500">
                  <Clock size={16} aria-hidden="true" />
                  <span>{service.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section aria-label="연락처" className="py-24 bg-neutral-50">
        <Container size="md">
          <motion.div
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-neutral-900 rounded-2xl px-8 py-14 text-center"
          >
            <Phone size={32} className="text-white/50 mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              문의하기
            </h2>
            <p className="text-neutral-400 mb-6">
              궁금한 점이 있으시면 언제든지 연락해 주세요
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <Phone size={18} aria-hidden="true" />
                <span className="font-medium">{initialChurchInfo.location.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <MapPin size={18} aria-hidden="true" />
                <span className="font-medium">{initialChurchInfo.location.address}</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
