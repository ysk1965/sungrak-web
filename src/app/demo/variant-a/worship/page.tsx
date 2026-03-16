"use client";

import Link from "next/link";
import {
  Clock,
  MapPin,
  ArrowRight,
  Calendar,
  Sun,
  Moon,
  Shirt,
  Car,
  Timer,
  UserPlus,
} from "lucide-react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Container } from "@/components/common";
import { Section, SectionHeader } from "@/components/common/section";
import { PageHero } from "@/components/variant-a/page-hero";
import { Breadcrumb } from "@/components/variant-a/breadcrumb";
import { useBasePath } from "@/contexts/base-path-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import { initialWorships } from "@/mocks/data/initial";

const infoCards = [
  {
    icon: Shirt,
    title: "복장",
    description:
      "편안한 복장으로 오셔도 좋습니다. 격식 없이 자유롭게 참여해 주세요.",
  },
  {
    icon: Car,
    title: "주차",
    description:
      "교회 내 주차장을 이용하실 수 있습니다. 주차 안내를 따라 주세요.",
  },
  {
    icon: Timer,
    title: "예배 시간",
    description:
      "예배 시작 10분 전까지 오시면 여유롭게 자리를 잡으실 수 있습니다.",
  },
  {
    icon: UserPlus,
    title: "새가족",
    description:
      "처음 오신 분도 환영합니다. 안내 데스크에서 도움을 받으실 수 있습니다.",
  },
];

export default function VariantAWorshipPage() {
  const basePath = useBasePath();

  const sundayWorships = initialWorships.filter((w) => w.day === "sunday");
  const weekdayWorships = initialWorships.filter((w) => w.day !== "sunday");

  return (
    <div className="min-h-screen bg-white">
      <Header variant="transparent" basePath={basePath} />

      {/* Hero Section */}
      <PageHero
        title="예배안내"
        subtitle="함께 예배드려요"
        backgroundImage="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1964"
        backgroundAlt="교회 예배 풍경"
      />

      {/* Breadcrumb */}
      <Section background="white" padding="sm">
        <Breadcrumb items={[{ label: "예배안내" }]} />
      </Section>

      {/* 주일예배 (Sunday Services) */}
      <Section background="white" padding="xl" aria-label="주일예배 안내">
        <FadeInUp>
          <SectionHeader
            title="주일예배"
            subtitle="매 주일 3부 예배로 드립니다"
          />
        </FadeInUp>

        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
            실시간 예배 시청하기
          </span>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sundayWorships.map((worship) => (
            <StaggerItem key={worship.id}>
              <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-neutral-200 hover:border-primary-200 overflow-hidden h-full">
                <CardContent className="p-8 text-center relative">
                  {/* Gold top border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    aria-hidden="true"
                  />
                  <Clock
                    className="mx-auto text-primary-500 mb-4"
                    size={32}
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {worship.name}
                  </h3>
                  <p className="text-4xl font-bold text-primary-500 mb-3">
                    {worship.time}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-neutral-500 mb-2">
                    <MapPin size={16} aria-hidden="true" />
                    <span className="text-sm">{worship.location}</span>
                  </div>
                  {worship.description && (
                    <p className="text-sm text-neutral-600 mt-2">
                      {worship.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* 주중예배 (Weekday Services) */}
      <Section background="gray" padding="xl" aria-label="주중예배 안내">
        <FadeInUp>
          <SectionHeader title="주중예배" subtitle="주중에도 함께 예배합니다" />
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weekdayWorships.map((worship) => {
            const IconComponent = worship.day === "wednesday" ? Moon : Sun;
            return (
              <StaggerItem key={worship.id}>
                <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-neutral-200 hover:border-primary-200 overflow-hidden">
                  <CardContent className="p-0 relative">
                    {/* Gold top border */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-6 p-6 pt-7">
                      {/* Icon on left */}
                      <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0">
                        <IconComponent
                          size={28}
                          className="text-primary-500"
                          aria-hidden="true"
                        />
                      </div>
                      {/* Content on right */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-neutral-900 mb-1">
                          {worship.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} aria-hidden="true" />
                            {worship.day === "wednesday"
                              ? "매주 수요일"
                              : worship.day === "monday"
                                ? "월~토 매일"
                                : worship.day}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} aria-hidden="true" />
                            {worship.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} aria-hidden="true" />
                            {worship.location}
                          </span>
                        </div>
                        {worship.description && (
                          <p className="text-sm text-neutral-600 mt-1">
                            {worship.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* 예배 참여 안내 */}
      <Section background="white" padding="lg" aria-label="예배 참여 안내">
        <FadeInUp>
          <SectionHeader title="예배 참여 안내" />
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map((card) => (
            <StaggerItem key={card.title}>
              <Card className="border-neutral-200 hover:border-primary-200 hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <card.icon
                      size={26}
                      className="text-primary-500"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* 오시는 길 바로가기 */}
      <section
        className="bg-gradient-to-r from-primary-500 to-primary-600 py-12"
        aria-label="오시는 길 바로가기"
      >
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <FadeInUp>
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center sm:text-left">
                예배 장소가 궁금하신가요?
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-white/90 group min-h-[44px]"
                asChild
              >
                <Link href={`${basePath}/about#location`}>
                  오시는 길
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </FadeInUp>
          </div>
        </Container>
      </section>

      <Footer basePath={basePath} />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm font-medium min-h-[44px] flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
      >
        ← 시안 선택
      </Link>
    </div>
  );
}
