"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  UserPlus,
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  Phone,
  MapPin,
  Printer,
  Send,
  CheckCircle,
  ArrowRight,
  Clock,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { initialWorships, initialChurchInfo } from "@/mocks/data/initial";

const steps = [
  {
    icon: UserPlus,
    title: "교회 방문",
    description:
      "편안한 마음으로 방문해 주세요. 안내 데스크에서 새가족 등록을 도와드립니다.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: BookOpen,
    title: "예배 참석",
    description:
      "함께 예배를 드리며 하나님의 말씀을 듣습니다. 찬양과 말씀의 시간입니다.",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: GraduationCap,
    title: "새가족 교육",
    description:
      "4주간의 새가족 교육을 통해 교회의 비전과 신앙의 기초를 배웁니다.",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    icon: Users,
    title: "소그룹 연결",
    description:
      "소그룹에 연결되어 함께 성장하는 공동체 생활을 시작합니다.",
    gradient: "from-rose-500 to-rose-600",
  },
];

const contactMethods = [
  { value: "phone" as const, label: "전화" },
  { value: "email" as const, label: "이메일" },
  { value: "kakao" as const, label: "카카오톡" },
];

const formSchema = z.object({
  name: z.string().min(2, "이름을 입력해 주세요"),
  phone: z.string().min(10, "연락처를 입력해 주세요"),
  email: z
    .string()
    .email("올바른 이메일을 입력해 주세요")
    .optional()
    .or(z.literal("")),
  message: z.string().min(5, "문의 내용을 입력해 주세요"),
  preferredContact: z.enum(["phone", "email", "kakao"]),
});

type FormData = z.infer<typeof formSchema>;

const { location } = initialChurchInfo;

const contactItems = [
  { icon: Phone, label: "전화", value: location.phone },
  { icon: MapPin, label: "주소", value: location.address },
  { icon: Printer, label: "팩스", value: location.fax || "" },
];

const crossNavPages = [
  { key: "about", icon: Heart, label: "교회소개", href: "/demo/variant-g/about" },
  { key: "worship", icon: Calendar, label: "예배안내", href: "/demo/variant-g/worship" },
  { key: "sermons", icon: BookOpen, label: "설교", href: "/demo/variant-g/sermons" },
  { key: "news", icon: Calendar, label: "소식", href: "/demo/variant-g/news" },
];

export default function VariantGNewcomerPage() {
  const prefersReducedMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { preferredContact: "phone" },
  });

  const preferredContact = watch("preferredContact");

  useEffect(() => {
    if (!isSubmitted) return;
    const timer = setTimeout(() => setIsSubmitted(false), 5000);
    return () => clearTimeout(timer);
  }, [isSubmitted]);

  const onSubmit = () => {
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header variant="transparent" />

      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[50vh] min-h-[400px] overflow-hidden"
        aria-label="새가족 안내 히어로"
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
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070"
            alt="교회 공동체를 환영하는 모습"
            fill
            className="object-cover opacity-25"
            priority
          />
        </motion.div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary-900/40 via-neutral-900/40 to-neutral-900"
          aria-hidden="true"
        />

        {/* Radial Glow */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-3xl" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }
            className="text-center"
          >
            {/* Heart Icon */}
            <motion.div
              initial={
                prefersReducedMotion ? false : { opacity: 0, scale: 0 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 200, damping: 15, delay: 0.3 }
              }
              className="flex justify-center mb-6"
            >
              <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <Heart size={28} className="text-white" fill="white" />
              </div>
            </motion.div>

            <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
              WELCOME
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              새가족 안내
            </h1>
            <p className="text-white/60 text-lg md:text-xl">
              성락교회에 오신 것을 환영합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visit Steps */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-primary-900/50 to-neutral-900"
        aria-label="방문 안내 단계"
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
              FIRST VISIT
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              처음 오시는 분들을 위한{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                안내
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connection Lines (desktop) */}
            <div
              className="absolute top-14 left-0 right-0 hidden lg:block"
              aria-hidden="true"
            >
              <div className="mx-auto max-w-[calc(100%-8rem)] h-px bg-gradient-to-r from-blue-500/30 via-emerald-500/30 via-violet-500/30 to-rose-500/30" />
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { delay: i * 0.15 }
                }
                whileHover={
                  prefersReducedMotion ? undefined : { y: -5 }
                }
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-amber-500 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-primary-500/25">
                      {i + 1}
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      aria-hidden="true"
                    >
                      <step.icon className="text-white" size={24} />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {i < steps.length - 1 && (
                  <div
                    className="flex justify-center py-2 lg:hidden"
                    aria-hidden="true"
                  >
                    <ArrowRight
                      size={20}
                      className="text-primary-500/30 rotate-90"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Worship Times Summary */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-slate-900 to-neutral-900"
        aria-label="예배 시간 안내"
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
              WORSHIP TIMES
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              예배 시간 안내
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {initialWorships.map((worship, i) => (
              <motion.div
                key={worship.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { delay: i * 0.05 }
                }
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div
                    className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <Calendar className="text-primary-400" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-white">{worship.name}</p>
                    <p className="text-sm text-white/50">
                      {worship.time} · {worship.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { delay: 0.3 }
            }
            className="text-center mt-8"
          >
            <Link href="/demo/variant-g/worship">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 group"
              >
                예배 안내 자세히 보기
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

      {/* Inquiry Form */}
      <section
        className="py-24 md:py-32 bg-gradient-to-b from-neutral-900 to-slate-900"
        aria-label="문의하기"
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
              CONTACT
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                문의하기
              </span>
            </h2>
            <p className="text-white/50 mt-2">
              궁금한 점이 있으시면 언제든 연락해 주세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-emerald-400" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        문의가 접수되었습니다
                      </h3>
                      <p className="text-white/50">
                        빠른 시일 내에 연락드리겠습니다
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      <div>
                        <label
                          htmlFor="g-name"
                          className="block text-sm font-medium text-white/70 mb-1.5"
                        >
                          이름 <span className="text-red-400">*</span>
                        </label>
                        <Input
                          id="g-name"
                          placeholder="이름을 입력해 주세요"
                          aria-invalid={!!errors.name}
                          aria-describedby={
                            errors.name ? "g-name-error" : undefined
                          }
                          {...register("name")}
                          className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary-500"
                        />
                        {errors.name && (
                          <p
                            id="g-name-error"
                            className="text-sm text-red-400 mt-1"
                            role="alert"
                          >
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="g-phone"
                          className="block text-sm font-medium text-white/70 mb-1.5"
                        >
                          연락처 <span className="text-red-400">*</span>
                        </label>
                        <Input
                          id="g-phone"
                          placeholder="010-0000-0000"
                          aria-invalid={!!errors.phone}
                          aria-describedby={
                            errors.phone ? "g-phone-error" : undefined
                          }
                          {...register("phone")}
                          className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary-500"
                        />
                        {errors.phone && (
                          <p
                            id="g-phone-error"
                            className="text-sm text-red-400 mt-1"
                            role="alert"
                          >
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="g-email"
                          className="block text-sm font-medium text-white/70 mb-1.5"
                        >
                          이메일{" "}
                          <span className="text-white/30">(선택)</span>
                        </label>
                        <Input
                          id="g-email"
                          type="email"
                          placeholder="email@example.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email ? "g-email-error" : undefined
                          }
                          {...register("email")}
                          className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary-500"
                        />
                        {errors.email && (
                          <p
                            id="g-email-error"
                            className="text-sm text-red-400 mt-1"
                            role="alert"
                          >
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          선호 연락 방법
                        </label>
                        <div className="flex gap-2">
                          {contactMethods.map((method) => (
                            <button
                              key={method.value}
                              type="button"
                              onClick={() =>
                                setValue("preferredContact", method.value)
                              }
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] ${
                                preferredContact === method.value
                                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                              }`}
                            >
                              {method.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="g-message"
                          className="block text-sm font-medium text-white/70 mb-1.5"
                        >
                          문의 내용 <span className="text-red-400">*</span>
                        </label>
                        <Textarea
                          id="g-message"
                          placeholder="문의하실 내용을 입력해 주세요"
                          aria-invalid={!!errors.message}
                          aria-describedby={
                            errors.message ? "g-message-error" : undefined
                          }
                          {...register("message")}
                          className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary-500"
                        />
                        {errors.message && (
                          <p
                            id="g-message-error"
                            className="text-sm text-red-400 mt-1"
                            role="alert"
                          >
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white group shadow-lg shadow-primary-500/25"
                      >
                        <Send
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                        문의하기
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
              className="space-y-4"
            >
              <p className="text-white/50 leading-relaxed mb-6">
                성락교회는 여러분을 진심으로 환영합니다. 예배, 교육, 소그룹 등
                궁금한 점이 있으시면 아래 연락처로 문의해 주세요.
              </p>

              {contactItems
                .filter((item) => item.value)
                .map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 10 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { delay: i * 0.1 }
                    }
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <item.icon
                          className="text-primary-400"
                          size={22}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 mb-0.5">
                          {item.label}
                        </p>
                        <p className="font-bold text-white">{item.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

              {/* Map Placeholder */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl aspect-video flex flex-col items-center justify-center text-white/40 mt-6">
                <MapPin
                  size={36}
                  className="mb-2 text-primary-400"
                  aria-hidden="true"
                />
                <p className="font-medium text-white/60 text-sm">지도 영역</p>
                <p className="text-xs mt-1">{location.address}</p>
              </div>
            </motion.div>
          </div>
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
