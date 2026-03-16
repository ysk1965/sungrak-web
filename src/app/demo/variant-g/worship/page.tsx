"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Phone,
  Heart,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { initialWorships, initialChurchInfo } from "@/mocks/data/initial";

const { location } = initialChurchInfo;

const visitorInfoItems = [
  {
    icon: Clock,
    title: "예배 시간",
    description:
      "예배 시작 10분 전까지 오시면 됩니다. 안내위원이 좌석을 안내해 드립니다.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: MapPin,
    title: "주차 안내",
    description:
      "교회 건물 지하 주차장을 이용하실 수 있습니다. 대중교통 이용을 권장합니다.",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Users,
    title: "새가족 안내",
    description:
      "처음 방문하신 분은 1층 안내 데스크에서 새가족 등록을 하실 수 있습니다.",
    gradient: "from-violet-500 to-violet-600",
  },
];

const crossNavPages = [
  { key: "about", icon: Heart, label: "교회소개", href: "/demo/variant-g/about" },
  { key: "sermons", icon: BookOpen, label: "설교", href: "/demo/variant-g/sermons" },
  { key: "newcomer", icon: Users, label: "새가족", href: "/demo/variant-g/newcomer" },
  { key: "news", icon: Calendar, label: "소식", href: "/demo/variant-g/news" },
];

export default function VariantGWorshipPage() {
  const prefersReducedMotion = useReducedMotion();

  const sundayWorships = initialWorships.filter((w) => w.day === "sunday");
  const weekdayWorships = initialWorships.filter((w) => w.day !== "sunday");

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header variant="transparent" />

      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[50vh] min-h-[400px] overflow-hidden"
        aria-label="예배안내 히어로"
      >
        <motion.div
          {...(prefersReducedMotion
            ? { initial: { scale: 1 }, animate: { scale: 1 } }
            : {
                initial: { scale: 1.1 },
                animate: { scale: 1 },
                transition: {
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                },
              })}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070"
            alt="예배당에서 찬양하는 모습"
            fill
            className="object-cover opacity-25"
            priority
          />
        </motion.div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-amber-950/40 via-neutral-900/40 to-neutral-900"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }
            className="text-center"
          >
            <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
              <Clock size={12} className="mr-1" aria-hidden="true" />
              WORSHIP
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              예배안내
            </h1>
            <p className="text-white/60 text-lg md:text-xl">
              하나님을 예배하는 시간
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section
        className="bg-white/5 backdrop-blur-sm border-y border-white/10 py-4"
        aria-label="교회 기본 정보"
      >
        <Container>
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-sm">
            {[
              { icon: Clock, text: "주일예배 7:00 / 9:30 / 11:30" },
              { icon: MapPin, text: location.address },
              { icon: Phone, text: location.phone },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                className="flex items-center gap-2 text-white/60 group cursor-pointer"
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
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-amber-950/30 to-neutral-900"
        aria-label="주일예배 안내"
      >
        <Container>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="text-center mb-12"
          >
            <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
              SUNDAY SERVICE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                주일예배
              </span>
            </h2>
            <p className="text-white/50 mt-2">
              매 주일 세 번의 예배를 드립니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sundayWorships.map((worship, i) => (
              <motion.article
                key={worship.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                whileHover={
                  prefersReducedMotion ? undefined : { y: -5, scale: 1.02 }
                }
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group"
                tabIndex={0}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-white/10 text-white/70 border-white/20 mb-2 text-xs">
                      {worship.location}
                    </Badge>
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-primary-400 transition-colors">
                      {worship.name}
                    </h3>
                    <p className="text-3xl font-bold text-primary-400">
                      {worship.time}
                    </p>
                    {worship.description && (
                      <p className="text-white/40 text-sm mt-2">
                        {worship.description}
                      </p>
                    )}
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500 transition-colors"
                    aria-hidden="true"
                  >
                    <Calendar
                      className="text-primary-400 group-hover:text-white transition-colors"
                      size={22}
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      {/* Weekday Worship */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-slate-900 to-neutral-900"
        aria-label="주중예배 안내"
      >
        <Container>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="text-center mb-12"
          >
            <Badge className="bg-white/10 text-white/70 border-white/20 mb-4">
              WEEKDAY SERVICE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              주중예배
            </h2>
            <p className="text-white/50 mt-2">주중에도 함께 예배드립니다</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {weekdayWorships.map((worship, i) => (
              <motion.article
                key={worship.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                whileHover={
                  prefersReducedMotion ? undefined : { y: -5, scale: 1.02 }
                }
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group"
                tabIndex={0}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-white/10 text-white/70 border-white/20 mb-2 text-xs">
                      {worship.location}
                    </Badge>
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-primary-400 transition-colors">
                      {worship.name}
                    </h3>
                    <p className="text-3xl font-bold text-primary-400">
                      {worship.time}
                    </p>
                    {worship.description && (
                      <p className="text-white/40 text-sm mt-2">
                        {worship.description}
                      </p>
                    )}
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500 transition-colors"
                    aria-hidden="true"
                  >
                    <Calendar
                      className="text-primary-400 group-hover:text-white transition-colors"
                      size={22}
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      {/* Visitor Info */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-neutral-900 to-slate-900"
        aria-label="방문자 안내"
      >
        <Container>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="text-center mb-12"
          >
            <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
              FOR VISITORS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              처음{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                방문하시나요?
              </span>
            </h2>
            <p className="text-white/50 mt-2">
              편안하게 예배에 참여하실 수 있도록 안내해 드립니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visitorInfoItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  aria-hidden="true"
                >
                  <item.icon className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { delay: 0.4 }
            }
            className="text-center mt-10"
          >
            <Link href="/demo/variant-g/newcomer">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-white/90 shadow-xl h-14 px-10 text-base font-medium group"
              >
                새가족 안내 보기
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Cross Navigation */}
      <section
        className="py-16 bg-black/50 border-t border-white/5"
        aria-label="다른 페이지 둘러보기"
      >
        <Container>
          <div className="text-center mb-8">
            <p className="text-sm text-primary-400 font-medium tracking-widest mb-2">
              EXPLORE
            </p>
            <h2 className="text-2xl font-bold text-white">더 둘러보기</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {crossNavPages.map((page, i) => (
              <motion.div
                key={page.key}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
              >
                <Link
                  href={page.href}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <page.icon
                      size={24}
                      className="text-primary-400"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {page.label}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-white/30 group-hover:text-primary-400 group-hover:translate-x-1 transition-all"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10" role="contentinfo">
        <Container>
          <div className="text-center space-y-2">
            <p className="text-white/60 text-sm font-medium">성락교회</p>
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} 성락교회. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group border border-white/10 min-w-[44px] min-h-[44px] inline-flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
      >
        <span
          className="group-hover:-translate-x-1 inline-block transition-transform"
          aria-hidden="true"
        >
          &larr;
        </span>{" "}
        시안 선택
      </Link>
    </div>
  );
}
