"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  Play,
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  BookOpen,
  Heart,
  ChevronRight,
  Clock,
  Phone,
  Youtube,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Container } from "@/components/common";
import { Section, SectionHeader } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SermonCard, LiveBadge, NewsCard } from "@/components/home";
import {
  initialSermons,
  initialNotices,
  initialWorships,
} from "@/mocks/data/initial";

const menuItems = [
  {
    icon: BookOpen,
    label: "설교",
    description: "말씀 듣기",
    href: "/sermons",
    color: "bg-blue-500",
    hoverColor: "group-hover:bg-blue-600",
  },
  {
    icon: Calendar,
    label: "예배안내",
    description: "시간/장소",
    href: "/worship",
    color: "bg-emerald-500",
    hoverColor: "group-hover:bg-emerald-600",
  },
  {
    icon: Users,
    label: "새가족",
    description: "환영합니다",
    href: "/newcomer",
    color: "bg-violet-500",
    hoverColor: "group-hover:bg-violet-600",
  },
  {
    icon: Heart,
    label: "교회소개",
    description: "성락교회",
    href: "/about",
    color: "bg-rose-500",
    hoverColor: "group-hover:bg-rose-600",
  },
];

const tabVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export default function VariantCPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"sermon" | "worship">("sermon");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const featuredSermon = initialSermons[0];
  const recentSermons = initialSermons.slice(0, 3);
  const notices = initialNotices.slice(0, 4);

  return (
    <div ref={containerRef} className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section - Enhanced Split Layout */}
      <section className="min-h-screen pt-16 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
          {/* Left - Content */}
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 lg:py-0 bg-white order-2 lg:order-1 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <LiveBadge className="mb-6" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                Faith,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
                  a Relationship
                </span>
                <br />
                with the Lord
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-neutral-600 mb-8 leading-relaxed"
              >
                신실한 헌신, 긍휼한 아낌
                <br />
                성락교회에 오신 것을 환영합니다
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link href="/live">
                  <Button
                    size="lg"
                    className="bg-primary-500 hover:bg-primary-600 group shadow-lg shadow-primary-500/25"
                  >
                    <Play
                      size={20}
                      className="group-hover:scale-110 transition-transform"
                    />
                    실시간 예배
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2"
                  >
                    교회 소개
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </motion.div>

              {/* Enhanced Quick Menu */}
              <div className="grid grid-cols-4 gap-3">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    onMouseEnter={() => setHoveredMenu(item.label)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <Link
                      href={item.href}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-neutral-50 transition-all group relative"
                    >
                      <motion.div
                        animate={{
                          scale: hoveredMenu === item.label ? 1.1 : 1,
                          rotate: hoveredMenu === item.label ? 5 : 0,
                        }}
                        className={`w-12 h-12 rounded-xl ${item.color} ${item.hoverColor} flex items-center justify-center text-white transition-colors shadow-lg`}
                      >
                        <item.icon size={24} />
                      </motion.div>
                      <div className="text-center">
                        <span className="text-sm font-semibold text-neutral-800 block">
                          {item.label}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Decorative Floating Element */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-8 left-8 hidden lg:block"
            >
              <div className="flex items-center gap-3 bg-neutral-100 rounded-full px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-neutral-600">
                  온라인 예배 진행 중
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right - Featured Video/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative h-full min-h-[50vh] lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
                alt="Church"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-l lg:from-black/60 lg:via-black/30 lg:to-transparent" />

              {/* Play Button Overlay - Enhanced */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-xl scale-150 group-hover:scale-175 transition-transform" />
                  <div className="relative w-24 h-24 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-2xl">
                    <Play
                      size={36}
                      className="text-primary-500 ml-1"
                      fill="currentColor"
                    />
                  </div>
                </motion.button>
              </div>

              {/* Stats Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute top-8 right-8 hidden lg:flex flex-col gap-3"
              >
                {[
                  { value: "25+", label: "Years" },
                  { value: "1.5K+", label: "Members" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 text-center"
                  >
                    <div className="text-xl font-bold text-primary-500">
                      {stat.value}
                    </div>
                    <div className="text-xs text-neutral-500">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom Info - Enhanced */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-5 lg:p-6 shadow-xl cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2 bg-primary-100 text-primary-600 hover:bg-primary-100">
                        <Sparkles size={12} className="mr-1" />
                        최신 설교
                      </Badge>
                      <h3 className="font-bold text-neutral-900 text-lg mb-1 group-hover:text-primary-600 transition-colors">
                        {featuredSermon.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {featuredSermon.preacher} · {featuredSermon.publishedAt}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={20} className="text-white ml-0.5" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-neutral-900 text-white py-5">
        <Container>
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-sm">
            {[
              { icon: Clock, text: "주일예배 7:00 / 9:30 / 11:30" },
              { icon: MapPin, text: "서울시 구로구 신도림로 56-24" },
              { icon: Phone, text: "070-7300-6200" },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <item.icon
                  size={16}
                  className="text-primary-400 group-hover:scale-110 transition-transform"
                />
                <span className="group-hover:text-primary-400 transition-colors">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Enhanced Tabbed Content Section */}
      <Section background="white" padding="xl">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1 p-1.5 bg-neutral-100 rounded-full"
          >
            {[
              { key: "sermon", label: "설교 영상", icon: Play },
              { key: "worship", label: "예배 안내", icon: Calendar },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "sermon" | "worship")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "sermon" ? (
            <motion.div
              key="sermon"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentSermons.map((sermon, i) => (
                  <motion.div
                    key={sermon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <SermonCard sermon={sermon} />
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mt-10"
              >
                <Link href="/sermons">
                  <Button variant="outline" size="lg" className="group">
                    전체 설교 보기
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="worship"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {initialWorships.map((worship, i) => (
                  <motion.div
                    key={worship.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md">
                      <CardContent className="p-6 relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50" />
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
                          </div>
                          <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all">
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mt-10"
              >
                <Link href="/worship">
                  <Button variant="outline" size="lg" className="group">
                    예배 안내 자세히 보기
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* News Grid - Enhanced */}
      <Section background="gray" padding="xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <Badge className="mb-3 bg-neutral-200 text-neutral-600 hover:bg-neutral-200">
              News
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              교회 소식
            </h2>
            <p className="text-neutral-500 mt-2">성락교회의 소식을 전합니다</p>
          </div>
          <Link href="/news">
            <Button variant="ghost" className="group">
              전체 보기
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.map((notice, i) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <NewsCard notice={notice} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Newcomer Section - Enhanced */}
      <Section background="white" padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-violet-100 text-violet-600 hover:bg-violet-100">
              <Users size={12} className="mr-1" />
              Welcome
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              처음 오셨나요?
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-violet-500">
                환영합니다!
              </span>
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              성락교회는 여러분을 진심으로 환영합니다. 처음 방문하시는 분들을
              위한 안내를 준비했습니다. 부담 없이 문의해 주세요.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { text: "예배 시간 및 장소 안내", done: true },
                { text: "새가족 교육 프로그램", done: true },
                { text: "소그룹 연결", done: true },
                { text: "상담 신청", done: false },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      item.done
                        ? "bg-primary-100 text-primary-500"
                        : "bg-neutral-100 text-neutral-400"
                    } group-hover:bg-primary-500 group-hover:text-white`}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-neutral-700 group-hover:text-neutral-900 transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <Link href="/newcomer">
              <Button
                size="lg"
                className="group shadow-lg shadow-primary-500/25"
              >
                새가족 안내 보기
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070"
                alt="Welcome"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Elements - Enhanced */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="absolute -top-4 -right-4 bg-gradient-to-br from-primary-500 to-amber-500 text-white p-5 rounded-2xl shadow-xl"
            >
              <Heart size={32} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="absolute -bottom-4 -left-4 bg-white p-5 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <MapPin className="text-emerald-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-0.5">오시는 길</p>
                  <p className="font-bold text-neutral-900">구로구 신도림</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute top-1/2 -right-6 transform -translate-y-1/2 hidden lg:block"
            >
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition-colors group"
              >
                <Youtube size={18} />
                <span className="text-sm font-medium">YouTube</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <Footer />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group"
      >
        <span className="group-hover:-translate-x-1 inline-block transition-transform">
          ←
        </span>{" "}
        시안 선택
      </Link>
    </div>
  );
}
