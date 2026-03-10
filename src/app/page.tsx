"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Image as ImageIcon,
  Layout,
  Newspaper,
  Type,
  Grid3X3,
  PanelTop,
  LayoutGrid,
  BookOpen,
} from "lucide-react";

const variants = [
  {
    id: "a",
    href: "/demo/variant-a",
    title: "시안 A",
    subtitle: "영상 중심",
    description: "풀스크린 비디오 히어로, 패럴랙스 스크롤",
    icon: Play,
    features: ["풀스크린 비디오 배경", "패럴랙스 스크롤", "라이브 배지 강조"],
    color: "from-blue-600 to-indigo-700",
    preview:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=600",
    tag: "영상 강조",
  },
  {
    id: "b",
    href: "/demo/variant-b",
    title: "시안 B",
    subtitle: "이미지 슬라이더",
    description: "자동 슬라이더, 비전 문구 오버레이",
    icon: ImageIcon,
    features: ["자동 이미지 슬라이더", "퀵 인포 카드", "비전 섹션"],
    color: "from-purple-600 to-pink-600",
    preview:
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=600",
    tag: "슬라이더",
  },
  {
    id: "c",
    href: "/demo/variant-c",
    title: "시안 C",
    subtitle: "밸런스형",
    description: "반반 레이아웃, 탭 전환, 인터랙티브",
    icon: Layout,
    features: ["좌우 분할 히어로", "탭 전환 콘텐츠", "빠른 메뉴"],
    color: "from-amber-500 to-orange-600",
    preview:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=600",
    tag: "탭 전환",
  },
  {
    id: "d",
    href: "/demo/variant-d",
    title: "시안 D",
    subtitle: "클래식 배너",
    description: "정적 히어로 배너, 전통적인 레이아웃",
    icon: Newspaper,
    features: ["정적 히어로 배너", "퀵 인포 바", "전통적 구성"],
    color: "from-slate-600 to-slate-800",
    preview:
      "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=600",
    tag: "클래식",
  },
  {
    id: "e",
    href: "/demo/variant-e",
    title: "시안 E",
    subtitle: "미니멀",
    description: "텍스트 중심, 여백과 타이포그래피 강조",
    icon: Type,
    features: ["대형 타이포그래피", "여백 활용", "심플한 구성"],
    color: "from-neutral-700 to-neutral-900",
    preview:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
    tag: "미니멀",
  },
  {
    id: "f",
    href: "/demo/variant-f",
    title: "시안 F",
    subtitle: "카드 그리드",
    description: "컴팩트 배너, 퀵 메뉴 카드 강조",
    icon: Grid3X3,
    features: ["컴팩트 히어로", "6개 퀵 메뉴", "그리드 레이아웃"],
    color: "from-teal-500 to-cyan-600",
    preview:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=600",
    tag: "퀵 메뉴",
  },
  {
    id: "g",
    href: "/demo/variant-g",
    title: "시안 G",
    subtitle: "스냅 스크롤",
    description: "풀스크린 섹션, 다크 시네마틱, 스냅 스크롤",
    icon: PanelTop,
    features: ["100vh 스냅 섹션", "사이드 도트 내비", "다크 모드"],
    color: "from-violet-600 to-indigo-800",
    preview:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=600",
    tag: "스냅 스크롤",
  },
  {
    id: "h",
    href: "/demo/variant-h",
    title: "시안 H",
    subtitle: "벤토 그리드",
    description: "벤토 박스 레이아웃, 글래스모피즘 카드",
    icon: LayoutGrid,
    features: ["비대칭 그리드", "글래스모피즘", "대시보드 느낌"],
    color: "from-cyan-500 to-blue-600",
    preview:
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=600",
    tag: "벤토",
  },
  {
    id: "i",
    href: "/demo/variant-i",
    title: "시안 I",
    subtitle: "매거진/에디토리얼",
    description: "에디토리얼 스토리텔링, 수평 캐러셀, 따뜻한 색감",
    icon: BookOpen,
    features: ["에디토리얼 레이아웃", "수평 스크롤", "따뜻한 색감"],
    color: "from-amber-600 to-rose-500",
    preview:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=600",
    tag: "매거진",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-neutral-900">
                성락교회 웹페이지
              </h1>
              <p className="text-sm text-neutral-500">메인 페이지 시안 선택</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              localhost:3000
            </div>
          </div>
        </div>
      </header>

      {/* Category Labels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
            A~C: 영상/슬라이더 강조
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
            D~F: 배너 중심
          </span>
          <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium">
            G~I: 트렌디/이머시브 (NEW)
          </span>
        </div>
      </div>

      {/* Variants Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {variants.map((variant, i) => (
            <motion.div
              key={variant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={variant.href} className="block group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200">
                  {/* Preview Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={variant.preview}
                      alt={variant.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${variant.color} opacity-70 group-hover:opacity-80 transition-opacity`}
                    />

                    {/* Icon Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <variant.icon className="text-white" size={20} />
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                        {variant.tag}
                      </span>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="text-xl font-bold text-white mb-0.5">
                        {variant.title}
                      </h2>
                      <p className="text-white/80 text-sm">
                        {variant.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-neutral-600 text-sm mb-3">
                      {variant.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {variant.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                      <span className="text-primary-500 font-medium text-sm group-hover:text-primary-600">
                        시안 보기
                      </span>
                      <ArrowRight
                        size={18}
                        className="text-primary-500 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-12 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-3 text-center">
          {variants.map((v) => (
            <Link
              key={v.id}
              href={v.href}
              className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div
                className={`text-2xl font-bold bg-gradient-to-r ${v.color} bg-clip-text text-transparent mb-1`}
              >
                {v.id.toUpperCase()}
              </div>
              <p className="text-xs text-neutral-500">{v.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
