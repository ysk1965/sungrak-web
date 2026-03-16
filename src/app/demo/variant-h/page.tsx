"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Clock,
  Heart,
  Youtube,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LiveBadge } from "@/components/home";
import {
  initialSermons,
  initialNotices,
  initialWorships,
} from "@/mocks/data/initial";

const featuredSermon = initialSermons[0];
const latestNotice = initialNotices[0];
const worshipTimes = initialWorships.slice(0, 3);

const heroWords = "성락교회에 오신 것을 환영합니다".split("");
const heroFullText = "성락교회에 오신 것을 환영합니다";

const categoryLabels: Record<string, string> = {
  event: "행사",
  weekly: "주보",
  news: "소식",
};

export default function VariantHPage() {
  const shouldReduceMotion = useReducedMotion();

  const bentoItems = [
    // Card 0: Live Worship - col-span-2 row-span-2
    {
      key: "live",
      className: "sm:col-span-2 sm:row-span-2",
      label: "예배 실황 - 실시간 예배 참여",
      content: (
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/80" />
          <div className="relative z-10 h-full flex flex-col justify-between p-6">
            <div className="flex items-start justify-between">
              <LiveBadge />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                예배 실황
              </h3>
              <p className="text-white/70 text-sm mb-4">
                실시간으로 예배에 참여하세요
              </p>
              <Link href="/live">
                <Button
                  className="bg-white text-neutral-900 hover:bg-white/90 group shadow-lg min-h-[44px] min-w-[44px]"
                  aria-label="예배 실황 지금 시청하기"
                >
                  <Play size={16} className="mr-1" aria-hidden="true" />
                  지금 시청하기
                  <ArrowRight
                    size={14}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    // Card 1: Latest Sermon - col-span-2
    {
      key: "sermon",
      className: "sm:col-span-2",
      label: `최신 설교: ${featuredSermon.title}`,
      content: (
        <Link
          href={`/sermons/${featuredSermon.id}`}
          className="block h-full"
          aria-label={`최신 설교: ${featuredSermon.title} - ${featuredSermon.preacher}`}
        >
          <div className="flex h-full gap-4 p-5">
            <div className="relative w-28 md:w-36 shrink-0 rounded-xl overflow-hidden">
              <Image
                src={featuredSermon.thumbnailUrl}
                alt={`${featuredSermon.title} 설교 썸네일`}
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-blue-600/20 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                  <Play size={16} className="text-blue-600 ml-0.5" />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <Badge className="w-fit mb-2 bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs">
                최신 설교
              </Badge>
              <h3 className="font-bold text-neutral-900 text-sm md:text-base line-clamp-2 mb-1">
                {featuredSermon.title}
              </h3>
              <p className="text-xs text-neutral-500">
                {featuredSermon.preacher}
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                {new Date(featuredSermon.publishedAt).toLocaleDateString(
                  "ko-KR",
                )}
              </p>
            </div>
          </div>
        </Link>
      ),
    },
    // Card 2: Worship Times - col-span-1
    {
      key: "worship",
      className: "",
      label: "예배 시간 안내",
      content: (
        <Link
          href="/worship"
          className="block h-full"
          aria-label="예배 시간 전체 보기"
        >
          <div className="p-5 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"
                aria-hidden="true"
              >
                <Clock size={16} className="text-emerald-600" />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm">예배 시간</h3>
            </div>
            <ul
              role="list"
              className="flex-1 flex flex-col justify-center space-y-2"
            >
              {worshipTimes.map((worship) => (
                <li
                  key={worship.id}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-neutral-600 truncate pr-2">
                    {worship.name}
                  </span>
                  <span className="font-semibold text-neutral-900 whitespace-nowrap">
                    {worship.time}
                  </span>
                </li>
              ))}
            </ul>
            <div
              className="flex items-center text-xs text-emerald-600 font-medium mt-2 group-hover:underline"
              aria-hidden="true"
            >
              전체 보기
              <ChevronRight size={12} className="ml-0.5" />
            </div>
          </div>
        </Link>
      ),
    },
    // Card 3: YouTube - col-span-1
    {
      key: "youtube",
      className: "",
      label: "성락교회 유튜브 채널",
      content: (
        <a
          href="https://youtube.com/@sungrakchurch"
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
          aria-label="성락교회 유튜브 채널 바로가기 (새 탭에서 열림)"
        >
          <div className="p-5 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100/50 opacity-60"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div
                className="w-14 h-14 rounded-2xl bg-red-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-red-500/25"
                aria-hidden="true"
              >
                <Youtube size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm mb-1">
                성락교회 YouTube
              </h3>
              <p className="text-xs text-neutral-500 flex items-center justify-center gap-1">
                채널 바로가기
                <ExternalLink size={10} aria-hidden="true" />
              </p>
            </div>
          </div>
        </a>
      ),
    },
    // Card 4: Newcomer CTA - col-span-1 row-span-2
    {
      key: "newcomer",
      className: "row-span-2",
      label: "처음 오신 분을 위한 새가족 안내",
      content: (
        <div className="h-full relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-b from-violet-500 via-primary-500 to-primary-600"
            aria-hidden="true"
          />
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 text-white">
            <div
              className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm"
              aria-hidden="true"
            >
              <Heart size={26} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">처음 오셨나요?</h3>
            <p className="text-sm text-white/80 mb-5 leading-relaxed">
              성락교회는 여러분을
              <br />
              진심으로 환영합니다
            </p>
            <Link href="/newcomer">
              <Button
                className="bg-white text-primary-600 hover:bg-white/90 shadow-lg text-sm group min-h-[44px] min-w-[44px]"
                aria-label="새가족 안내 페이지로 이동"
              >
                새가족 안내
                <ArrowRight
                  size={14}
                  className="ml-1 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </div>
        </div>
      ),
    },
    // Card 5: News - col-span-1
    {
      key: "news",
      className: "",
      label: `최신 소식: ${latestNotice.title}`,
      content: (
        <Link
          href={`/news/${latestNotice.id}`}
          className="block h-full"
          aria-label={`최신 소식: ${latestNotice.title}`}
        >
          <div className="p-5 h-full flex flex-col">
            <Badge className="w-fit mb-3 bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">
              {categoryLabels[latestNotice.category] || latestNotice.category}
            </Badge>
            <h3 className="font-bold text-neutral-900 text-sm line-clamp-2 mb-2 flex-1">
              {latestNotice.title}
            </h3>
            <p className="text-xs text-neutral-400">
              {new Date(latestNotice.createdAt).toLocaleDateString("ko-KR")}
            </p>
          </div>
        </Link>
      ),
    },
    // Card 6: Church Intro - col-span-2
    {
      key: "church-intro",
      className: "sm:col-span-2",
      label: "성락교회 소개",
      content: (
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1964"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/50"
            aria-hidden="true"
          />
          <div className="relative z-10 h-full flex flex-col justify-center p-6">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
              성락교회 소개
            </h3>
            <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-4 max-w-md">
              &quot;신실한 헌신, 긍휼한 아낌&quot;의 비전 아래 하나님과 이웃을
              섬기는 공동체입니다.
            </p>
            <Link href="/about">
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 w-fit group text-xs min-h-[44px] min-w-[44px]"
                aria-label="성락교회 소개 자세히 보기"
              >
                자세히 보기
                <ArrowRight
                  size={12}
                  className="ml-1 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Compact Hero - Gradient, no image */}
      <section
        className="relative mt-16 md:mt-20 overflow-hidden"
        style={{ minHeight: "40vh", maxHeight: "50vh" }}
        aria-label="성락교회 환영 메시지"
      >
        {/* Animated Gradient Mesh Background */}
        <motion.div
          className="absolute inset-0"
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? {
                  background:
                    "linear-gradient(135deg, hsl(220, 60%, 20%) 0%, hsl(260, 50%, 25%) 30%, hsl(200, 60%, 15%) 70%, hsl(240, 50%, 20%) 100%)",
                }
              : {
                  background: [
                    "linear-gradient(135deg, hsl(220, 60%, 20%) 0%, hsl(260, 50%, 25%) 30%, hsl(200, 60%, 15%) 70%, hsl(240, 50%, 20%) 100%)",
                    "linear-gradient(135deg, hsl(240, 50%, 20%) 0%, hsl(200, 60%, 15%) 30%, hsl(260, 50%, 25%) 70%, hsl(220, 60%, 20%) 100%)",
                    "linear-gradient(135deg, hsl(220, 60%, 20%) 0%, hsl(260, 50%, 25%) 30%, hsl(200, 60%, 15%) 70%, hsl(240, 50%, 20%) 100%)",
                  ],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }
          }
        />

        {/* Gradient Mesh Overlay */}
        <div
          className="absolute inset-0 opacity-60"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, hsla(280, 70%, 50%, 0.3) 0px, transparent 60%), radial-gradient(ellipse at 80% 20%, hsla(200, 80%, 60%, 0.25) 0px, transparent 60%), radial-gradient(ellipse at 50% 80%, hsla(320, 70%, 60%, 0.2) 0px, transparent 60%)",
          }}
        />

        <Container className="relative z-10 h-full flex flex-col items-center justify-center py-16 md:py-20">
          {/* Word-by-word animation */}
          <div className="text-center">
            {/* Accessible full text for screen readers */}
            <h1 className="sr-only">{heroFullText}</h1>
            {/* Visual character animation (hidden from screen readers) */}
            <div
              className="flex flex-wrap justify-center mb-4"
              aria-hidden="true"
            >
              {heroWords.map((char, i) => (
                <motion.span
                  key={i}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          delay: 0.3 + i * 0.05,
                          duration: 0.4,
                          ease: "easeOut",
                        }
                  }
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <motion.p
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 1.2, duration: 0.6 }
              }
              className="text-white/60 text-base md:text-lg tracking-wide"
            >
              Faith, a Relationship with the Lord
            </motion.p>
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 1.5, duration: 0.6 }
              }
              className="text-white/40 text-sm mt-2"
            >
              신실한 헌신, 긍휼한 아낌
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Bento Grid Section */}
      <section
        className="relative py-12 md:py-20"
        aria-label="교회 주요 콘텐츠"
        style={{
          background:
            "radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 0.15) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 0.3) 0px, transparent 50%), hsl(0, 0%, 98%)",
        }}
      >
        <Container>
          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] lg:auto-rows-[200px] gap-4"
          >
            {bentoItems.map((item, i) => (
              <li
                key={item.key}
                className={item.className}
                aria-label={item.label}
              >
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 30 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          delay: i * 0.05,
                          duration: 0.5,
                          ease: "easeOut",
                        }
                  }
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden h-full"
                >
                  {item.content}
                </motion.div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Footer />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group min-h-[44px] flex items-center"
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
