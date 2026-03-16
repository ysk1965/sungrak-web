"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  Play,
  Calendar,
  Users,
  Heart,
  ChevronRight,
  Quote,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Container } from "@/components/common";
import { Section, SectionHeader } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SermonCard, NewsCard } from "@/components/home";
import { initialSermons, initialNotices } from "@/mocks/data/initial";

export default function VariantDPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.2],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 100],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    shouldReduceMotion ? [1, 1] : [1, 0],
  );

  const recentSermons = initialSermons.slice(0, 3);
  const notices = initialNotices.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner - Classic Style Enhanced */}
      <section
        ref={heroRef}
        className="relative h-[80vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="성락교회 히어로 배너 - 신실한 헌신, 긍휼한 아낌"
      >
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <Image
            src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=2070"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/60 to-neutral-900/30" />
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldReduceMotion ? 0.1 : 0.1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 1 }}
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            }}
          />
        </div>

        <Container className="relative z-10 h-full flex items-center">
          <motion.div style={{ y: textY, opacity }} className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            >
              <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
                SUNGRAK CHURCH
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 0.3, duration: 0.8 }
              }
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              신실한 헌신,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                긍휼한 아낌
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }}
              className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl"
            >
              성락교회에 오신 것을 환영합니다.
              <br />
              주님의 사랑 안에서 함께 예배하고 성장하는 공동체입니다.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/about">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 group shadow-lg shadow-primary-500/25 min-h-[44px]"
                >
                  교회 소개
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 motion-reduce:transition-none transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
              <Link href="/newcomer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm group min-h-[44px]"
                >
                  새가족 안내
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 motion-reduce:transition-none transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { delay: 1, duration: 0.8 }
            }
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4"
            aria-hidden="true"
          >
            {[
              { value: "25+", label: "Years" },
              { value: "1.5K", label: "Members" },
              { value: "500+", label: "Sermons" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { delay: 1.2 + i * 0.1 }
                }
                className="bg-white/10 backdrop-blur-md rounded-xl px-5 py-4 text-center border border-white/10"
              >
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
          aria-hidden="true"
        >
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-widest">SCROLL</span>
            <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-2 bg-white/50 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Info Bar - Enhanced */}
      <section
        className="bg-neutral-900 text-white py-5 relative overflow-hidden"
        aria-label="교회 기본 정보"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-transparent to-primary-900/20"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-sm">
            {[
              {
                icon: Clock,
                label: "예배시간",
                value: "주일 7:00 / 9:30 / 11:30",
              },
              {
                icon: MapPin,
                label: "위치",
                value: "서울시 구로구 신도림로 56-24",
              },
              { icon: Phone, label: "연락처", value: "070-7300-6200" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                  <item.icon
                    size={18}
                    className="text-primary-400"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-xs text-white/50">{item.label}</p>
                  <p className="font-medium group-hover:text-primary-400 transition-colors">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Welcome Section - Enhanced */}
      <Section background="white" padding="xl" aria-label="담임목사 인사말">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
          >
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-100">
              Welcome
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              담임목사 인사말
            </h2>

            <figure className="relative pl-6 border-l-4 border-primary-500 mb-6">
              <Quote
                size={24}
                className="absolute -left-4 -top-2 text-primary-200"
                aria-hidden="true"
              />
              <blockquote cite="/about">
                <p className="text-neutral-600 leading-relaxed italic">
                  성락교회에 오신 것을 환영합니다.
                </p>
              </blockquote>
            </figure>

            <p className="text-neutral-600 leading-relaxed mb-4">
              우리 교회는 &quot;신실한 헌신, 긍휼한 아낌&quot;이라는 비전 아래,
              하나님과 이웃을 섬기는 공동체입니다.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-6">
              예수 그리스도의 사랑 안에서 함께 성장하고, 세상을 변화시키는 빛과
              소금이 되기를 소망합니다.
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
              <div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center"
                aria-hidden="true"
              >
                <Users className="text-primary-500" size={28} />
              </div>
              <div>
                <p className="font-bold text-neutral-900 text-lg">담임목사</p>
                <p className="text-neutral-500">드림</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070"
                alt="담임목사 사진"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl"
              aria-hidden="true"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary-500 flex items-center justify-center">
                  <Heart className="text-white" size={24} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-500">25+</p>
                  <p className="text-sm text-neutral-500">Years of Faith</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Worship Schedule - Enhanced */}
      <Section background="gray" padding="lg" aria-label="예배 안내">
        <div className="flex items-end justify-between mb-8">
          <div>
            <Badge className="mb-3 bg-emerald-100 text-emerald-600 hover:bg-emerald-100">
              <Calendar size={12} className="mr-1" aria-hidden="true" />
              Worship
            </Badge>
            <h2 className="text-3xl font-bold text-neutral-900">예배 안내</h2>
            <p className="text-neutral-500 mt-1">함께 예배드려요</p>
          </div>
          <Link href="/worship">
            <Button variant="ghost" className="group min-h-[44px]">
              자세히 보기
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 motion-reduce:transition-none transition-transform"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: "주일 1부 예배",
              time: "오전 7:00",
              place: "대예배실",
              color: "from-blue-500 to-blue-600",
            },
            {
              name: "주일 2부 예배",
              time: "오전 9:30",
              place: "대예배실",
              color: "from-emerald-500 to-emerald-600",
            },
            {
              name: "주일 3부 예배",
              time: "오전 11:30",
              place: "대예배실",
              color: "from-violet-500 to-violet-600",
            },
            {
              name: "수요예배",
              time: "오후 7:30",
              place: "대예배실",
              color: "from-amber-500 to-amber-600",
            },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
              }
              whileHover={
                shouldReduceMotion ? undefined : { y: -5, scale: 1.02 }
              }
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md">
                <CardContent className="p-6 relative">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}
                    aria-hidden="true"
                  />
                  <div
                    className="w-14 h-14 mx-auto mb-4 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:scale-110 motion-reduce:transform-none transition-transform"
                    aria-hidden="true"
                  >
                    <Calendar
                      className="text-primary-500"
                      size={26}
                      aria-hidden="true"
                    />
                  </div>
                  <dt className="font-bold text-neutral-900 mb-2">
                    {item.name}
                  </dt>
                  <dd className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500 mb-1">
                    {item.time}
                  </dd>
                  <dd className="text-sm text-neutral-500">{item.place}</dd>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </dl>
      </Section>

      {/* Sermons Section - Enhanced */}
      <Section background="white" padding="xl" aria-label="최근 설교">
        <div className="flex items-end justify-between mb-8">
          <div>
            <Badge className="mb-3 bg-blue-100 text-blue-600 hover:bg-blue-100">
              <Play size={12} className="mr-1" aria-hidden="true" />
              Sermons
            </Badge>
            <h2 className="text-3xl font-bold text-neutral-900">설교</h2>
            <p className="text-neutral-500 mt-1">말씀으로 함께 성장합니다</p>
          </div>
          <Link href="/sermons">
            <Button variant="outline" className="group min-h-[44px]">
              전체 설교 보기
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 motion-reduce:transition-none transition-transform"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentSermons.map((sermon, i) => (
            <motion.div
              key={sermon.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
              }
              whileHover={shouldReduceMotion ? undefined : { y: -8 }}
            >
              <SermonCard sermon={sermon} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* News - Enhanced */}
      <Section background="gray" padding="lg" aria-label="교회 소식">
        <div className="flex items-end justify-between mb-8">
          <div>
            <Badge className="mb-3 bg-neutral-200 text-neutral-600 hover:bg-neutral-200">
              News
            </Badge>
            <h2 className="text-2xl font-bold text-neutral-900">교회 소식</h2>
          </div>
          <Link href="/news">
            <Button variant="ghost" className="group min-h-[44px]">
              전체 보기
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 motion-reduce:transition-none transition-transform"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {notices.map((notice, i) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
              }
              whileHover={shouldReduceMotion ? undefined : { x: 5 }}
            >
              <NewsCard notice={notice} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Newcomer CTA - Enhanced */}
      <Section background="white" padding="lg" aria-label="새가족 안내">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070"
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-500/80" />
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }
                }
              >
                <Badge className="bg-white/20 text-white border-white/30 mb-4">
                  <Users size={12} className="mr-1" aria-hidden="true" />
                  Welcome
                </Badge>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }
                }
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                처음 오셨나요?
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }
                }
                className="text-white/80 text-lg mb-8 leading-relaxed"
              >
                성락교회는 여러분을 진심으로 환영합니다.
                <br />
                함께 예배하고 성장하는 공동체가 되길 소망합니다.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }
                }
                className="flex flex-wrap gap-4"
              >
                <Link href="/newcomer">
                  <Button
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-white/90 shadow-lg group min-h-[44px]"
                  >
                    새가족 안내
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 motion-reduce:transition-none transition-transform"
                      aria-hidden="true"
                    />
                  </Button>
                </Link>
                <Link href="/about#location">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/50 text-white hover:bg-white/10 group min-h-[44px]"
                  >
                    <MapPin size={18} aria-hidden="true" />
                    오시는 길
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Decorative */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            aria-hidden="true"
          />
        </motion.div>
      </Section>

      <Footer />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group min-h-[44px] flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
      >
        <span className="group-hover:-translate-x-1 motion-reduce:transition-none inline-block transition-transform">
          ←
        </span>{" "}
        시안 선택
      </Link>
    </div>
  );
}
