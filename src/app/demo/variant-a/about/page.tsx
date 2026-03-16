"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Printer,
  ArrowRight,
  Users,
  Building2,
} from "lucide-react";
import { useBasePath } from "@/contexts/base-path-context";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Section, SectionHeader } from "@/components/common/section";
import { PageHero } from "@/components/variant-a/page-hero";
import { Breadcrumb } from "@/components/variant-a/breadcrumb";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import { initialChurchInfo } from "@/mocks/data/initial";

export default function AboutPage() {
  const basePath = useBasePath();

  const { greeting, vision, history, organization, location } =
    initialChurchInfo;

  const greetingParagraphs = greeting.content.split("\n\n");

  return (
    <div className="min-h-screen bg-white">
      <Header variant="transparent" basePath={basePath} />

      {/* 1. Page Hero */}
      <PageHero
        title="교회소개"
        subtitle="성락교회를 소개합니다"
        backgroundImage="https://images.unsplash.com/photo-1510936111840-6a8f9ebbc22b?q=80&w=2090"
        backgroundAlt="교회 내부 전경"
      />

      {/* 2. Breadcrumb */}
      <Section background="white" padding="sm">
        <Breadcrumb items={[{ label: "교회소개" }]} />
      </Section>

      {/* 3. 담임목사 인사말 */}
      <Section background="white" padding="xl" aria-label="담임목사 인사말">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Pastor Image Placeholder */}
          <FadeInUp>
            <div className="aspect-[3/4] rounded-2xl shadow-2xl bg-neutral-200 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Users
                  size={64}
                  className="text-neutral-400"
                  aria-hidden="true"
                />
              </div>
              <span className="sr-only">담임목사 사진</span>
            </div>
          </FadeInUp>

          {/* Greeting Text */}
          <FadeInUp delay={0.2}>
            <div className="relative">
              {/* Decorative Quote Mark */}
              <div
                className="text-8xl text-primary-200 font-serif leading-none select-none absolute -top-8 -left-4"
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 relative z-10">
                {greeting.title}
              </h2>

              <div className="space-y-4 text-neutral-600 leading-relaxed relative z-10">
                {greetingParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Pastor Signature */}
              <div className="mt-10 relative z-10">
                <p className="text-xl italic text-primary-600 font-medium">
                  {greeting.pastorName}
                </p>
                <div
                  className="w-16 h-0.5 bg-primary-500 mt-2"
                  aria-hidden="true"
                />
              </div>
            </div>
          </FadeInUp>
        </div>
      </Section>

      {/* 4. 비전 (Vision) */}
      <Section background="gray" padding="xl" aria-label="교회 비전">
        <FadeInUp>
          <div className="max-w-3xl mx-auto text-center relative">
            {/* Decorative Quote Mark */}
            <div
              className="text-[120px] text-primary-200/40 font-serif leading-none select-none absolute -top-10 left-1/2 -translate-x-1/2"
              aria-hidden="true"
            >
              ✦
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500"
                style={{ filter: "drop-shadow(0 0 24px rgba(var(--color-primary-400), 0.3))" }}
              >
                {vision.title}
              </span>
            </h2>

            <p className="text-lg text-neutral-600 leading-relaxed mb-12 relative z-10">
              {vision.content}
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {vision.values.map((value, i) => (
            <StaggerItem key={i}>
              <div className="bg-white border-l-4 border-primary-500 rounded-lg p-6 shadow-sm">
                <p className="text-lg font-semibold text-neutral-800">
                  {value}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* 5. 연혁 (History Timeline) */}
      <Section background="white" padding="xl" aria-label="교회 연혁">
        <FadeInUp>
          <SectionHeader title="연혁" subtitle="성락교회의 발자취" />
        </FadeInUp>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <StaggerContainer className="relative">
            {/* Center Line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-300 -translate-x-1/2"
              aria-hidden="true"
            />

            <div className="space-y-12">
              {history.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="relative flex items-center">
                    {/* Gold Dot */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-primary-100 z-10"
                      aria-hidden="true"
                    />

                    {i % 2 === 0 ? (
                      <>
                        {/* Year on left, Content on right */}
                        <div className="w-1/2 pr-12 text-right">
                          <span className="text-2xl font-bold text-primary-600">
                            {item.year}
                          </span>
                        </div>
                        <div className="w-1/2 pl-12">
                          <p className="text-neutral-700 text-lg">
                            {item.content}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Content on left, Year on right */}
                        <div className="w-1/2 pr-12 text-right">
                          <p className="text-neutral-700 text-lg">
                            {item.content}
                          </p>
                        </div>
                        <div className="w-1/2 pl-12">
                          <span className="text-2xl font-bold text-primary-600">
                            {item.year}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          <StaggerContainer className="relative pl-8">
            {/* Left Line */}
            <div
              className="absolute left-3 top-0 bottom-0 w-0.5 bg-primary-300"
              aria-hidden="true"
            />

            <div className="space-y-8">
              {history.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="relative">
                    {/* Gold Dot */}
                    <div
                      className="absolute -left-[1.0625rem] top-1 w-4 h-4 rounded-full bg-primary-500 border-4 border-primary-100 z-10"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-xl font-bold text-primary-600 block mb-1">
                        {item.year}
                      </span>
                      <p className="text-neutral-700">{item.content}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </Section>

      {/* 6. 조직도 (Organization) */}
      <Section background="gray" padding="lg" aria-label="교회 조직">
        <FadeInUp>
          <SectionHeader title="조직" subtitle="교회 조직 구성" />
        </FadeInUp>

        {/* Decorative gold divider */}
        <div className="flex justify-center mb-8" aria-hidden="true">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
        </div>

        <FadeInUp delay={0.1}>
          <p className="text-center text-neutral-600 leading-relaxed mb-12 max-w-2xl mx-auto">
            {organization.content}
          </p>
        </FadeInUp>

        {/* Organization Hierarchy Placeholder */}
        <FadeInUp delay={0.2}>
          <div className="max-w-3xl mx-auto relative">
            {/* Subtle background pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--color-primary-500) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
              aria-hidden="true"
            />
            {/* 담임목사 - Top */}
            <div className="flex justify-center mb-6">
              <div className="bg-primary-500 text-white px-8 py-4 rounded-xl shadow-lg text-center min-h-[44px] flex items-center">
                <Building2
                  size={20}
                  className="mr-2 inline-block"
                  aria-hidden="true"
                />
                <span className="font-bold text-lg">담임목사</span>
              </div>
            </div>

            {/* Connector Line */}
            <div className="flex justify-center mb-6" aria-hidden="true">
              <div className="w-0.5 h-8 bg-primary-300" />
            </div>

            {/* 장로회 - Middle */}
            <div className="flex justify-center mb-6">
              <div className="bg-white border-2 border-primary-400 text-primary-700 px-8 py-3 rounded-xl shadow-md text-center min-h-[44px] flex items-center">
                <span className="font-semibold">장로회</span>
              </div>
            </div>

            {/* Connector Lines */}
            <div className="flex justify-center mb-6" aria-hidden="true">
              <div className="w-0.5 h-8 bg-primary-300" />
            </div>

            {/* Departments - Bottom */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["예배부", "교육부", "선교부", "봉사부"].map((dept) => (
                <StaggerItem key={dept}>
                  <div className="bg-white border border-neutral-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow min-h-[44px] flex items-center justify-center">
                    <span className="font-medium text-neutral-800">{dept}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeInUp>
      </Section>

      {/* 7. 오시는 길 (Location) */}
      <Section
        background="white"
        padding="xl"
        aria-label="오시는 길"
        className="scroll-mt-20"
      >
        <div id="location" className="scroll-mt-20">
          <FadeInUp>
            <SectionHeader title="오시는 길" subtitle="성락교회 위치 안내" />
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <FadeInUp delay={0.1}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shrink-0 min-h-[44px]">
                    <MapPin
                      size={22}
                      className="text-primary-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      주소
                    </h3>
                    <p className="text-neutral-600">{location.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shrink-0 min-h-[44px]">
                    <Phone
                      size={22}
                      className="text-primary-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      전화
                    </h3>
                    <a
                      href={`tel:${location.phone}`}
                      className="text-neutral-600 hover:text-primary-600 transition-colors min-h-[44px] inline-flex items-center"
                    >
                      {location.phone}
                    </a>
                  </div>
                </div>

                {location.fax && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shrink-0 min-h-[44px]">
                      <Printer
                        size={22}
                        className="text-primary-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        팩스
                      </h3>
                      <p className="text-neutral-600">{location.fax}</p>
                    </div>
                  </div>
                )}

                {/* Direction Button */}
                <div className="pt-4">
                  <a
                    href={`https://map.naver.com/v5/search/${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors min-h-[44px]"
                    aria-label="네이버 지도에서 성락교회 위치 보기 (새 탭에서 열림)"
                  >
                    <MapPin size={18} aria-hidden="true" />
                    네이버 지도에서 보기
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </FadeInUp>

            {/* Map Placeholder */}
            <FadeInUp delay={0.2}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-lg group">
                {/* Static map-like background */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200">
                  {/* Grid pattern to simulate map */}
                  <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                    aria-hidden="true"
                  />
                  {/* Simulated roads */}
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, transparent 30%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.15) 31%, transparent 31%), linear-gradient(-20deg, transparent 60%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.1) 61%, transparent 61%)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent" />

                {/* Center pin and label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="relative mb-4">
                    <div className="w-4 h-4 rounded-full bg-primary-500 shadow-lg ring-4 ring-primary-500/20 animate-pulse" />
                  </div>
                  <p className="text-sm font-medium text-neutral-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                  </p>
                </div>

                {/* Open map button overlay */}
                <a
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-800 px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all text-sm font-medium min-h-[44px]"
                  aria-label="네이버 지도에서 위치 보기 (새 탭에서 열림)"
                >
                  <MapPin size={16} className="text-primary-500" aria-hidden="true" />
                  지도에서 보기
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </FadeInUp>
          </div>
        </div>
      </Section>

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
