"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
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

const dayLabel: Record<string, string> = {
  sunday: "주일",
  monday: "월요일",
  tuesday: "화요일",
  wednesday: "수요일",
  thursday: "목요일",
  friday: "금요일",
  saturday: "토요일",
};

export default function VariantKWorshipPage() {
  const rm = useReducedMotion();
  const basePath = useBasePath();

  const sundayServices = initialWorships.filter((w) => w.day === "sunday");
  const otherServices = initialWorships.filter((w) => w.day !== "sunday");

  return (
    <>
      {/* Hero */}
      <section
        id="variant-k-content"
        className="relative min-h-[50vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="예배안내"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <Container size="lg" className="relative z-10 flex items-center min-h-[calc(50vh-5rem)]">
          <motion.div
            initial={rm ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={rm ? { duration: 0 } : { duration: 0.8 }}
            className="py-20"
          >
            <p className="text-white/70 text-sm font-medium tracking-[0.3em] uppercase mb-4">
              WORSHIP
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              예배 안내
            </h1>
            <p className="text-white/60 text-lg">
              하나님께 드리는 거룩한 예배에 함께하세요
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Sunday Services */}
      <section aria-label="주일예배" className="py-24 bg-white">
        <Container size="lg">
          <motion.div
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
              SUNDAY SERVICE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              주일예배
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sundayServices.map((service, i) => (
              <motion.div
                key={service.id}
                variants={makeFadeInUp(20, i * 0.1, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-neutral-50 rounded-2xl p-8 text-center border border-neutral-100 hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {i + 1}부
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{service.name}</h3>
                <div className="space-y-2 text-neutral-600">
                  <div className="flex items-center justify-center gap-2">
                    <Clock size={16} className="text-neutral-400" aria-hidden="true" />
                    <span>{service.time}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin size={16} className="text-neutral-400" aria-hidden="true" />
                    <span>{service.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Other Services */}
      <section aria-label="기타 예배" className="py-24 bg-neutral-50">
        <Container size="lg">
          <motion.div
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
              OTHER SERVICES
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              주중 예배
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {otherServices.map((service, i) => (
              <motion.div
                key={service.id}
                variants={makeFadeInUp(20, i * 0.1, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-neutral-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{service.name}</h3>
                <div className="space-y-2 text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-neutral-400" aria-hidden="true" />
                    <span>{dayLabel[service.day] || service.day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-neutral-400" aria-hidden="true" />
                    <span>{service.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-neutral-400" aria-hidden="true" />
                    <span>{service.location}</span>
                  </div>
                </div>
                {service.description && (
                  <p className="text-neutral-500 text-sm mt-4">{service.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white" aria-label="새가족 안내">
        <Container size="md">
          <motion.div
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <Users size={40} className="text-neutral-300 mx-auto mb-6" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              처음 방문하시나요?
            </h2>
            <p className="text-neutral-500 mb-8">
              성락교회에 처음 오시는 분들을 위한 안내를 준비했습니다.
            </p>
            <Link href={`${basePath}/newcomer`}>
              <Button size="lg" className="min-h-[44px] h-14 px-8 text-base bg-neutral-900 text-white hover:bg-neutral-700 group">
                새가족 안내
                <ArrowRight size={18} aria-hidden="true" className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
