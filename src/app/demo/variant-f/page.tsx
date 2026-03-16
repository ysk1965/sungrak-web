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
  Play,
  BookOpen,
  Users,
  Calendar,
  MapPin,
  Heart,
  Bell,
  Youtube,
  Clock,
  ChevronRight,
  Sparkles,
  ExternalLink,
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

const quickMenus = [
  {
    icon: Play,
    label: "예배 실황",
    description: "실시간 예배 시청",
    href: "/live",
    color: "bg-red-500",
    gradient: "from-red-500 to-rose-600",
  },
  {
    icon: BookOpen,
    label: "설교",
    description: "말씀 다시 듣기",
    href: "/sermons",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Calendar,
    label: "예배 안내",
    description: "시간 및 장소",
    href: "/worship",
    color: "bg-emerald-500",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Users,
    label: "새가족",
    description: "처음 오셨나요?",
    href: "/newcomer",
    color: "bg-violet-500",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Heart,
    label: "교회 소개",
    description: "성락교회 안내",
    href: "/about",
    color: "bg-pink-500",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: Bell,
    label: "소식",
    description: "공지 및 행사",
    href: "/news",
    color: "bg-amber-500",
    gradient: "from-amber-500 to-orange-600",
  },
];

export default function VariantFPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.15],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 80],
  );

  const recentSermons = initialSermons.slice(0, 4);
  const notices = initialNotices.slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Banner - Compact Enhanced */}
      <section
        ref={heroRef}
        aria-label="성락교회 메인 배너"
        className="relative h-[55vh] mt-16 md:mt-20 overflow-hidden"
      >
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
            alt="성락교회 예배당 전경"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-500/20 to-transparent" />
        </div>

        <Container className="relative z-10 h-full flex items-end pb-16">
          <motion.div style={{ y: textY }} className="text-white">
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            >
              <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4 backdrop-blur-sm">
                <Sparkles size={12} className="mr-1" aria-hidden="true" />
                성락교회
              </Badge>
            </motion.div>

            <motion.h1
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 0.3, duration: 0.8 }
              }
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
            >
              신실한 헌신,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                긍휼한 아낌
              </span>
            </motion.h1>

            <motion.p
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }}
              className="text-white/70 text-lg"
            >
              Faith, a Relationship with the Lord
            </motion.p>
          </motion.div>
        </Container>

        {/* Floating Stats */}
        <motion.div
          initial={
            shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.8 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3"
          aria-hidden="true"
        >
          {[
            { value: "25+", label: "Years" },
            { value: "1.5K", label: "Members" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={
                shouldReduceMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 20 }
              }
              animate={{ opacity: 1, x: 0 }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { delay: 1 + i * 0.1 }
              }
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-center border border-white/10 cursor-pointer"
            >
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Quick Menu Grid - Enhanced */}
      <Section
        background="white"
        padding="lg"
        aria-label="빠른 메뉴"
        className="-mt-12 relative z-20"
      >
        <nav aria-label="빠른 메뉴">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickMenus.map((menu, i) => (
              <motion.div
                key={menu.label}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.05 }
                }
              >
                <Link
                  href={menu.href}
                  aria-label={`${menu.label} - ${menu.description}`}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl"
                >
                  <Card
                    className={`h-full transition-all duration-300 border-none shadow-lg group overflow-hidden
                      hover:shadow-2xl hover:-translate-y-2
                      focus-within:shadow-2xl focus-within:-translate-y-2
                      min-h-[120px]`}
                  >
                    <CardContent className="p-5 text-center relative min-h-[44px]">
                      {/* Hover / Focus Background */}
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 bg-gradient-to-br ${menu.gradient} opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300`}
                      />

                      <div className="relative z-10">
                        <motion.div
                          whileHover={
                            shouldReduceMotion
                              ? undefined
                              : { scale: 1.1, rotate: 5 }
                          }
                          aria-hidden="true"
                          className={`w-14 h-14 ${menu.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:bg-white/20 group-hover:shadow-none group-focus-within:bg-white/20 group-focus-within:shadow-none transition-all`}
                        >
                          <menu.icon
                            className="text-white"
                            size={26}
                            aria-hidden="true"
                          />
                        </motion.div>
                        <h3 className="font-bold text-neutral-900 mb-1 group-hover:text-white group-focus-within:text-white transition-colors">
                          {menu.label}
                        </h3>
                        <p className="text-xs text-neutral-500 group-hover:text-white/80 group-focus-within:text-white/80 transition-colors">
                          {menu.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>
      </Section>

      {/* Info Bar - Enhanced */}
      <section
        aria-label="교회 정보"
        className="bg-neutral-900 text-white py-6 relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-transparent to-primary-900/20"
        />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                label: "주일 예배",
                value: "7:00 / 9:30 / 11:30",
                link: "/worship",
              },
              {
                icon: MapPin,
                label: "오시는 길",
                value: "서울 구로구 신도림로",
                link: "/about#location",
              },
              {
                icon: Youtube,
                label: "YouTube",
                value: "성락교회 채널 →",
                link: "https://youtube.com",
                external: true,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
                }
              >
                {item.external ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label}: ${item.value} (새 창에서 열림)`}
                    className="flex items-center gap-4 group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-lg"
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors"
                      aria-hidden="true"
                    >
                      <item.icon
                        className="text-primary-400"
                        size={22}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-neutral-400">{item.label}</p>
                      <p className="font-semibold group-hover:text-primary-400 transition-colors flex items-center gap-1">
                        {item.value}
                        <ExternalLink
                          size={14}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-hidden="true"
                        />
                      </p>
                    </div>
                  </a>
                ) : (
                  <Link
                    href={item.link}
                    aria-label={`${item.label}: ${item.value}`}
                    className="flex items-center gap-4 group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-lg"
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors"
                      aria-hidden="true"
                    >
                      <item.icon
                        className="text-primary-400"
                        size={22}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-neutral-400">{item.label}</p>
                      <p className="font-semibold group-hover:text-primary-400 transition-colors">
                        {item.value}
                      </p>
                    </div>
                    <ChevronRight
                      size={18}
                      aria-hidden="true"
                      className="text-neutral-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Two Column Layout - Enhanced */}
      <Section background="gray" padding="xl" aria-label="최신 설교 및 소식">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sermons - 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge className="mb-2 bg-blue-100 text-blue-600 hover:bg-blue-100">
                  <Play size={12} className="mr-1" aria-hidden="true" />
                  Sermons
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                  최신 설교
                </h2>
              </div>
              <Link href="/sermons">
                <Button
                  variant="ghost"
                  size="sm"
                  className="group min-h-[44px]"
                >
                  전체 보기
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentSermons.map((sermon, i) => (
                <motion.div
                  key={sermon.id}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
                  }
                  whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                >
                  <SermonCard sermon={sermon} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* News - 1 column */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge className="mb-2 bg-neutral-200 text-neutral-600 hover:bg-neutral-200">
                  News
                </Badge>
                <h2 className="text-2xl font-bold text-neutral-900">소식</h2>
              </div>
              <Link href="/news">
                <Button
                  variant="ghost"
                  size="sm"
                  className="group min-h-[44px]"
                >
                  더보기
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {notices.map((notice, i) => (
                <motion.div
                  key={notice.id}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: 20 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
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
          </div>
        </div>
      </Section>

      {/* About Preview - Enhanced */}
      <Section background="white" padding="xl" aria-label="성락교회 소개">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1964"
                alt="성락교회 예배 모습"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-xl"
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

            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }}
              aria-hidden="true"
              className="absolute -top-4 -left-4 bg-gradient-to-br from-primary-500 to-amber-500 text-white p-4 rounded-xl shadow-lg"
            >
              <Play size={28} aria-hidden="true" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-100">
              About Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              성락교회를
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
                소개합니다
              </span>
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              성락교회는 &quot;신실한 헌신, 긍휼한 아낌&quot;이라는 비전 아래,
              하나님과 이웃을 섬기는 공동체입니다.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              예수 그리스도의 사랑 안에서 함께 성장하고, 세상을 변화시키는 빛과
              소금이 되기를 소망합니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about">
                <Button className="group shadow-lg shadow-primary-500/25 min-h-[44px]">
                  자세히 보기
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href="/about#location">
                <Button variant="outline" className="group min-h-[44px]">
                  <MapPin size={16} aria-hidden="true" />
                  오시는 길
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Newcomer CTA - Enhanced */}
      <section aria-label="새가족 환영" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600"
        />
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070"
            alt=""
            role="presentation"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 opacity-10">
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }
            }
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <Container className="relative z-10 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -30 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Users size={12} className="mr-1" aria-hidden="true" />
                Welcome
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                처음 오셨나요?
              </h2>
              <p className="text-white/80 max-w-md">
                성락교회는 여러분을 진심으로 환영합니다. 함께 예배하고 성장하는
                공동체가 되길 소망합니다.
              </p>
            </motion.div>

            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 30 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/newcomer">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-white/90 shadow-xl group h-14 px-8 min-h-[44px]"
                >
                  새가족 안내
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        aria-label="시안 선택 페이지로 돌아가기"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span
          aria-hidden="true"
          className="group-hover:-translate-x-1 inline-block transition-transform"
        >
          ←
        </span>{" "}
        시안 선택
      </Link>
    </div>
  );
}
