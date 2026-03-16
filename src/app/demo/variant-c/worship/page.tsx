"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/common/section";
import { Container, CrossNav } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { initialWorships } from "@/mocks/data/initial";

const visitorInfoItems = [
  {
    icon: Clock,
    title: "예배 시간",
    description:
      "예배 시작 10분 전까지 오시면 됩니다. 안내위원이 좌석을 안내해 드립니다.",
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    textColor: "text-blue-500",
  },
  {
    icon: MapPin,
    title: "주차 안내",
    description:
      "교회 건물 지하 주차장을 이용하실 수 있습니다. 주차 공간이 제한적이니 대중교통 이용을 권장합니다.",
    color: "bg-emerald-500",
    lightColor: "bg-emerald-100",
    textColor: "text-emerald-500",
  },
  {
    icon: Users,
    title: "새가족 안내",
    description:
      "처음 방문하신 분은 1층 안내 데스크에서 새가족 등록을 하실 수 있습니다.",
    color: "bg-violet-500",
    lightColor: "bg-violet-100",
    textColor: "text-violet-500",
  },
];

export default function WorshipPage() {
  const prefersReducedMotion = useReducedMotion();

  const sundayWorships = initialWorships.filter((w) => w.day === "sunday");
  const weekdayWorships = initialWorships.filter((w) => w.day !== "sunday");

  return (
    <>
      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[45vh] min-h-[360px] pt-16 md:pt-20 overflow-hidden"
        aria-label="예배안내 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070"
          alt="예배당에서 찬양하는 모습"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

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
              WORSHIP
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              예배안내
            </h1>
            <p className="text-neutral-200 text-lg">하나님을 예배하는 시간</p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { delay: 0.6, duration: 0.5 }
          }
          className="absolute top-24 right-8 md:right-16 hidden md:block"
          aria-hidden="true"
        >
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 text-center">
            <div className="text-2xl font-bold text-primary-400">3</div>
            <div className="text-xs text-white/80">주일예배</div>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { delay: 0.8, duration: 0.5 }
          }
          className="absolute bottom-20 left-8 md:left-16 hidden md:block"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
            <Clock size={16} className="text-primary-400" />
            <span className="text-sm text-white/90">매주 함께하는 예배</span>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" className="w-full h-8 md:h-12" preserveAspectRatio="none">
            <path d="M0,60 L0,20 Q720,0 1440,20 L1440,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-neutral-900 text-white py-4" aria-label="교회 기본 정보">
        <Container>
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-sm">
            {[
              { icon: Clock, text: "주일예배 7:00 / 9:30 / 11:30" },
              { icon: MapPin, text: "서울시 구로구 신도림로 56-24" },
              { icon: Phone, text: "070-7300-6200" },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                className="flex items-center gap-2 group cursor-pointer"
              >
                <item.icon
                  size={16}
                  className="text-primary-400 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                <span className="group-hover:text-primary-400 transition-colors">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Sunday Worship */}
      <Section background="white" padding="xl" aria-label="주일예배 안내">
        <div className="text-center mb-10">
          <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
            SUNDAY SERVICE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
              주일예배
            </span>
          </h2>
          <p className="text-neutral-500 mt-2">
            매 주일 세 번의 예배를 드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sundayWorships.map((worship, i) => (
            <motion.div
              key={worship.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
              }
              whileHover={prefersReducedMotion ? {} : { y: -5, scale: 1.02 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md">
                <CardContent className="p-6 relative">
                  <div
                    className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50"
                    aria-hidden="true"
                  />
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <Badge
                        variant="outline"
                        className="mb-2 text-xs border-primary-200 text-primary-600"
                      >
                        {worship.location}
                      </Badge>
                      <h3 className="font-bold text-neutral-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">
                        {worship.name}
                      </h3>
                      <p className="text-3xl font-bold text-primary-500">
                        {worship.time}
                      </p>
                      {worship.description && (
                        <p className="text-sm text-neutral-500 mt-2">
                          {worship.description}
                        </p>
                      )}
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all"
                      aria-hidden="true"
                    >
                      <Calendar
                        className="text-primary-500 group-hover:text-white transition-colors"
                        size={22}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Weekday Worship */}
      <Section background="gray" padding="xl" aria-label="주중예배 안내">
        <div className="text-center mb-10">
          <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
            WEEKDAY SERVICE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            주중예배
          </h2>
          <p className="text-neutral-500 mt-2">주중에도 함께 예배드립니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {weekdayWorships.map((worship, i) => (
            <motion.div
              key={worship.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
              }
              whileHover={prefersReducedMotion ? {} : { y: -5, scale: 1.02 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md">
                <CardContent className="p-6 relative">
                  <div
                    className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50"
                    aria-hidden="true"
                  />
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <Badge
                        variant="outline"
                        className="mb-2 text-xs border-primary-200 text-primary-600"
                      >
                        {worship.location}
                      </Badge>
                      <h3 className="font-bold text-neutral-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">
                        {worship.name}
                      </h3>
                      <p className="text-3xl font-bold text-primary-500">
                        {worship.time}
                      </p>
                      {worship.description && (
                        <p className="text-sm text-neutral-500 mt-2">
                          {worship.description}
                        </p>
                      )}
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all"
                      aria-hidden="true"
                    >
                      <Calendar
                        className="text-primary-500 group-hover:text-white transition-colors"
                        size={22}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Visitor Info */}
      <Section background="white" padding="xl" aria-label="방문자 안내">
        <div className="text-center mb-10">
          <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
            FOR VISITORS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            처음{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
              방문하시나요?
            </span>
          </h2>
          <p className="text-neutral-500 mt-2">
            편안하게 예배에 참여하실 수 있도록 안내해 드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visitorInfoItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
              }
            >
              <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md h-full">
                <CardContent className="p-6 relative">
                  <div
                    className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50"
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 rounded-2xl ${item.lightColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      aria-hidden="true"
                    >
                      <item.icon className={item.textColor} size={28} />
                    </div>
                    <h3 className="font-bold text-neutral-900 text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/demo/variant-c/newcomer">
            <Button size="lg" className="group shadow-lg shadow-primary-500/25">
              새가족 안내 보기
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </motion.div>
      </Section>

      <CrossNav basePath="/demo/variant-c" currentPage="worship" />
    </>
  );
}
