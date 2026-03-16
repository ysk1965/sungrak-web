"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Users,
  Heart,
  Newspaper,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Section } from "./section";

const allPages = [
  {
    key: "about",
    icon: Heart,
    label: "교회소개",
    description: "성락교회 소개",
    href: "about",
    color: "bg-rose-500",
    hoverColor: "group-hover:bg-rose-600",
  },
  {
    key: "worship",
    icon: Calendar,
    label: "예배안내",
    description: "시간/장소",
    href: "worship",
    color: "bg-emerald-500",
    hoverColor: "group-hover:bg-emerald-600",
  },
  {
    key: "sermons",
    icon: BookOpen,
    label: "설교",
    description: "말씀 듣기",
    href: "sermons",
    color: "bg-blue-500",
    hoverColor: "group-hover:bg-blue-600",
  },
  {
    key: "newcomer",
    icon: Users,
    label: "새가족",
    description: "환영합니다",
    href: "newcomer",
    color: "bg-violet-500",
    hoverColor: "group-hover:bg-violet-600",
  },
  {
    key: "news",
    icon: Newspaper,
    label: "교회 소식",
    description: "소식 전하기",
    href: "news",
    color: "bg-amber-500",
    hoverColor: "group-hover:bg-amber-600",
  },
];

interface CrossNavProps {
  basePath: string;
  currentPage: string;
}

export function CrossNav({ basePath, currentPage }: CrossNavProps) {
  const prefersReducedMotion = useReducedMotion();
  const pages = allPages.filter((p) => p.key !== currentPage);

  return (
    <Section background="gray" padding="xl" aria-label="다른 페이지 둘러보기">
      <div className="text-center mb-10">
        <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
          EXPLORE
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
          더 둘러보기
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {pages.map((page, i) => (
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
              href={`${basePath}/${page.href}`}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white hover:shadow-xl transition-all duration-300 group min-h-[44px]"
            >
              <motion.div
                whileHover={
                  prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }
                }
                className={`w-14 h-14 rounded-xl ${page.color} ${page.hoverColor} flex items-center justify-center text-white transition-colors shadow-lg`}
              >
                <page.icon size={26} aria-hidden="true" />
              </motion.div>
              <div className="text-center">
                <span className="text-sm font-semibold text-neutral-800 block">
                  {page.label}
                </span>
                <span className="text-xs text-neutral-500">
                  {page.description}
                </span>
              </div>
              <ArrowRight
                size={14}
                className="text-neutral-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
