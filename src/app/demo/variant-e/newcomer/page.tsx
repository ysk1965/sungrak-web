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
  Minus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/common/section";
import { Container, CrossNav } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { initialWorships, initialChurchInfo } from "@/mocks/data/initial";

const steps = [
  {
    icon: UserPlus,
    title: "교회 방문",
    description:
      "편안한 마음으로 방문해 주세요. 안내 데스크에서 새가족 등록을 도와드립니다.",
  },
  {
    icon: BookOpen,
    title: "예배 참석",
    description:
      "함께 예배를 드리며 하나님의 말씀을 듣습니다. 찬양과 말씀의 시간입니다.",
  },
  {
    icon: GraduationCap,
    title: "새가족 교육",
    description:
      "4주간의 새가족 교육을 통해 교회의 비전과 신앙의 기초를 배웁니다.",
  },
  {
    icon: Users,
    title: "소그룹 연결",
    description: "소그룹에 연결되어 함께 성장하는 공동체 생활을 시작합니다.",
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
  {
    icon: Phone,
    label: "전화",
    value: location.phone,
  },
  {
    icon: MapPin,
    label: "주소",
    value: location.address,
  },
  {
    icon: Printer,
    label: "팩스",
    value: location.fax || "",
  },
];

export default function NewcomerPage() {
  const shouldReduceMotion = useReducedMotion();
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
    <>
      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[50vh] min-h-[400px] pt-20 flex items-center justify-center overflow-hidden"
        aria-label="새가족 안내 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070"
          alt="교회 공동체를 환영하는 모습"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.8 }
          }
          className="relative text-center text-white"
        >
          <span className="inline-flex items-center gap-3 text-primary-300 font-medium tracking-[0.3em] mb-4">
            <Minus size={20} aria-hidden="true" />
            WELCOME
            <Minus size={20} aria-hidden="true" />
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            새가족 안내
          </h1>
          <p className="text-xl text-white/70 font-light tracking-wide">
            성락교회에 오신 것을 환영합니다
          </p>
        </motion.div>

        <div
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30"
          aria-hidden="true"
        />
      </section>

      {/* Visit Steps */}
      <Section background="white" padding="xl" aria-label="방문 안내 단계">
        <Container size="lg">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
              FIRST VISIT
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              처음 오시는 분들을 위한{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-amber-500 to-primary-500 bg-[length:200%_auto] animate-gradient">
                안내
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Line (desktop) */}
            <div
              className="absolute top-14 left-0 right-0 hidden lg:block"
              aria-hidden="true"
            >
              <div className="mx-auto max-w-[calc(100%-8rem)] h-px bg-gradient-to-r from-primary-200 via-amber-200 to-primary-200" />
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.15 }
                }
                whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                className="relative"
              >
                <div className="bg-neutral-50 rounded-3xl p-8 hover:shadow-xl transition-all motion-reduce:transition-none group h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-amber-500 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-primary-500/25 relative z-10">
                      {i + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow motion-reduce:transition-none">
                      <step.icon
                        size={24}
                        className="text-primary-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <h3 className="font-bold text-neutral-900 text-xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (mobile/tablet) */}
                {i < steps.length - 1 && (
                  <div
                    className="flex justify-center py-2 lg:hidden"
                    aria-hidden="true"
                  >
                    <ArrowRight
                      size={20}
                      className="text-primary-300 rotate-90"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Container size="lg">
        <Separator className="bg-neutral-100" aria-hidden="true" />
      </Container>

      {/* Worship Times Summary */}
      <Section background="white" padding="xl" aria-label="예배 시간 안내">
        <Container size="lg">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
              WORSHIP TIMES
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              예배 시간 안내
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {initialWorships.map((worship, i) => (
              <motion.div
                key={worship.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: i * 0.05 }
                }
              >
                <div className="bg-neutral-50 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow motion-reduce:transition-none">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Calendar
                      className="text-primary-500"
                      size={20}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">{worship.name}</p>
                    <p className="text-sm text-neutral-500">
                      {worship.time} · {worship.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
            className="mt-8"
          >
            <Link href="/demo/variant-e/worship">
              <Button variant="outline" className="group border-2 min-h-[44px]">
                예배 안내 자세히 보기
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Section>

      <Container size="lg">
        <Separator className="bg-neutral-100" aria-hidden="true" />
      </Container>

      {/* Inquiry Form */}
      <Section background="white" padding="xl" aria-label="문의하기">
        <Container size="lg">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm text-primary-500 font-medium mb-3 tracking-widest">
              CONTACT
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-amber-500 to-primary-500 bg-[length:200%_auto] animate-gradient">
                문의하기
              </span>
            </h2>
            <p className="text-neutral-500 mt-3 text-lg font-light">
              궁금한 점이 있으시면 언제든 연락해 주세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : undefined}
            >
              <div className="bg-neutral-50 rounded-3xl p-8">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-emerald-500" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                        문의가 접수되었습니다
                      </h3>
                      <p className="text-neutral-500">
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
                          htmlFor="name"
                          className="block text-sm font-medium text-neutral-700 mb-1.5"
                        >
                          이름 <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          placeholder="이름을 입력해 주세요"
                          aria-invalid={!!errors.name}
                          aria-describedby={
                            errors.name ? "name-error" : undefined
                          }
                          {...register("name")}
                          className="h-11 bg-white"
                        />
                        {errors.name && (
                          <p
                            id="name-error"
                            className="text-sm text-red-500 mt-1"
                            role="alert"
                          >
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-neutral-700 mb-1.5"
                        >
                          연락처 <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="phone"
                          placeholder="010-0000-0000"
                          aria-invalid={!!errors.phone}
                          aria-describedby={
                            errors.phone ? "phone-error" : undefined
                          }
                          {...register("phone")}
                          className="h-11 bg-white"
                        />
                        {errors.phone && (
                          <p
                            id="phone-error"
                            className="text-sm text-red-500 mt-1"
                            role="alert"
                          >
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-neutral-700 mb-1.5"
                        >
                          이메일{" "}
                          <span className="text-neutral-400">(선택)</span>
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email ? "email-error" : undefined
                          }
                          {...register("email")}
                          className="h-11 bg-white"
                        />
                        {errors.email && (
                          <p
                            id="email-error"
                            className="text-sm text-red-500 mt-1"
                            role="alert"
                          >
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
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
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all motion-reduce:transition-none min-h-[44px] ${
                                preferredContact === method.value
                                  ? "bg-neutral-900 text-white shadow-lg"
                                  : "bg-white text-neutral-600 hover:bg-neutral-200"
                              }`}
                            >
                              {method.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-neutral-700 mb-1.5"
                        >
                          문의 내용 <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="message"
                          placeholder="문의하실 내용을 입력해 주세요"
                          aria-invalid={!!errors.message}
                          aria-describedby={
                            errors.message ? "message-error" : undefined
                          }
                          {...register("message")}
                          className="min-h-[120px] bg-white"
                        />
                        {errors.message && (
                          <p
                            id="message-error"
                            className="text-sm text-red-500 mt-1"
                            role="alert"
                          >
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full group shadow-lg shadow-primary-500/20 h-14 text-base"
                      >
                        <Send
                          size={18}
                          className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
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
              initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : undefined}
              className="space-y-4"
            >
              <p className="text-neutral-500 leading-relaxed text-lg font-light mb-8">
                성락교회는 여러분을 진심으로 환영합니다. 예배, 교육, 소그룹 등
                궁금한 점이 있으시면 아래 연락처로 문의해 주세요.
              </p>

              {contactItems
                .filter((item) => item.value)
                .map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 10 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={
                      shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
                    }
                    className="flex items-center gap-4 p-5 bg-neutral-50 rounded-2xl hover:shadow-md transition-shadow motion-reduce:transition-none group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow motion-reduce:transition-none">
                      <item.icon
                        size={22}
                        className="text-primary-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 mb-0.5 tracking-wide uppercase">
                        {item.label}
                      </p>
                      <p className="font-bold text-neutral-900">{item.value}</p>
                    </div>
                  </motion.div>
                ))}

              {/* Map Placeholder */}
              <div className="bg-neutral-50 rounded-3xl aspect-video flex flex-col items-center justify-center text-neutral-500 mt-6">
                <MapPin
                  size={36}
                  className="mb-2 text-primary-400"
                  aria-hidden="true"
                />
                <p className="font-medium text-neutral-600 text-sm">
                  지도 영역
                </p>
                <p className="text-xs mt-1">{location.address}</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      <CrossNav basePath="/demo/variant-e" currentPage="newcomer" />
    </>
  );
}
