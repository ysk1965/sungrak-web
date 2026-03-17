"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layout, PanelTop, BookOpen, Moon } from "lucide-react";

const variants = [
  {
    id: "a",
    href: "/demo/variant-c",
    title: "시안 A",
    subtitle: "밸런스형",
    description:
      "좌우 분할 히어로와 탭 전환 UI로 정보를 깔끔하게 정리한 밸런스형 디자인. 밝은 배경에 포인트 컬러 그라데이션을 활용하며, 설교 영상·담임목사 인사·교회 소식·오시는 길까지 한 페이지에서 빠르게 탐색할 수 있습니다.",
    icon: Layout,
    features: ["좌우 분할 히어로", "탭 전환 콘텐츠", "빠른 정보 바", "실시간 예배 버튼"],
    color: "from-amber-500 to-orange-600",
    preview: "/images/시안A.png",
    tag: "탭 전환",
  },
  {
    id: "b",
    href: "/demo/variant-g",
    title: "시안 B",
    subtitle: "스냅 스크롤",
    description:
      "각 섹션이 화면 전체를 채우는 풀스크린 스냅 스크롤 방식으로, 마치 슬라이드를 넘기듯 탐색합니다. 우측 사이드에 도트 내비게이션이 있어 현재 위치를 한눈에 파악할 수 있고, 자동 전환 히어로 이미지와 시네마틱한 연출이 돋보입니다.",
    icon: PanelTop,
    features: ["100vh 풀스크린 섹션", "사이드 도트 내비", "자동 이미지 슬라이더", "키보드 네비게이션"],
    color: "from-violet-600 to-indigo-800",
    preview: "/images/시안B.png",
    tag: "스냅 스크롤",
  },
  {
    id: "c",
    href: "/demo/variant-i",
    title: "시안 C",
    subtitle: "매거진/에디토리얼",
    description:
      "잡지·신문의 에디토리얼 레이아웃을 웹에 적용한 디자인. 크림색 종이 질감의 배경 위에 세련된 타이포그래피와 패럴렉스 애니메이션, 기울어진 이미지 프레임이 어우러져 격조 있는 분위기를 연출합니다.",
    icon: BookOpen,
    features: ["에디토리얼 레이아웃", "패럴렉스 스크롤", "종이 질감 배경", "기울어진 이미지 프레임"],
    color: "from-amber-600 to-rose-500",
    preview: "/images/시안C.png",
    tag: "매거진",
  },
  {
    id: "d",
    href: "/demo/variant-j",
    title: "시안 D",
    subtitle: "다크 모던",
    description:
      "스톤 그레이 다크 테마에 골드/암버 액센트를 더한 프리미엄 디자인. 필름 그레인 텍스처와 시네마틱 히어로, 3컬럼 이미지 카드, 소셜 미디어 통합까지 현대적이면서도 품격 있는 분위기를 만들어냅니다.",
    icon: Moon,
    features: ["다크 프리미엄 테마", "골드 액센트", "3컬럼 이미지 카드", "소셜 미디어 통합"],
    color: "from-stone-700 to-amber-600",
    preview: "/images/시안D.png",
    tag: "다크 모드",
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
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
            A: 밸런스형
          </span>
          <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium">
            B: 스냅 스크롤
          </span>
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-medium">
            C: 매거진/에디토리얼
          </span>
          <span className="px-3 py-1 rounded-full bg-stone-800 text-amber-400 text-xs font-medium">
            D: 다크 모던
          </span>
        </div>
      </div>

      {/* Variants Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-12">
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
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
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
