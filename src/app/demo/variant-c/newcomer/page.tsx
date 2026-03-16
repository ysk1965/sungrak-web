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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { initialWorships, initialChurchInfo } from "@/mocks/data/initial";

const steps = [
  {
    icon: UserPlus,
    title: "교회 방문",
    description:
      "편안한 마음으로 방문해 주세요. 안내 데스크에서 새가족 등록을 도와드립니다.",
    color: "bg-blue-100",
    textColor: "text-blue-500",
  },
  {
    icon: BookOpen,
    title: "예배 참석",
    description:
      "함께 예배를 드리며 하나님의 말씀을 듣습니다. 찬양과 말씀의 시간입니다.",
    color: "bg-emerald-100",
    textColor: "text-emerald-500",
  },
  {
    icon: GraduationCap,
    title: "새가족 교육",
    description:
      "4주간의 새가족 교육을 통해 교회의 비전과 신앙의 기초를 배웁니다.",
    color: "bg-violet-100",
    textColor: "text-violet-500",
  },
  {
    icon: Users,
    title: "소그룹 연결",
    description: "소그룹에 연결되어 함께 성장하는 공동체 생활을 시작합니다.",
    color: "bg-rose-100",
    textColor: "text-rose-500",
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
    color: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    icon: MapPin,
    label: "주소",
    value: location.address,
    color: "bg-emerald-100",
    textColor: "text-emerald-600",
  },
  {
    icon: Printer,
    label: "팩스",
    value: location.fax || "",
    color: "bg-violet-100",
    textColor: "text-violet-600",
  },
];

export default function NewcomerPage() {
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
    <div className="min-h-screen bg-neutral-50">
      <Header basePath="/demo/variant-c" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:text-primary-600 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
      >
        본문 바로가기
      </a>

      {/* Hero Banner */}
      <section
        id="main-content"
        className="relative h-[40vh] min-h-[300px] pt-16 md:pt-20"
        aria-label="새가족 안내 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070"
          alt="교회 공동체를 환영하는 모습"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }
            }
            className="text-center"
          >
            <p className="text-sm text-primary-400 font-medium mb-3 tracking-widest">
              WELCOME
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              새가족 안내
            </h1>
            <p className="text-neutral-200 text-lg">
              성락교회에 오신 것을 환영합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visit Steps */}
      <Section background="white" padding="xl" aria-label="방문 안내 단계">
        <div className="text-center mb-10">
          <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
            FIRST VISIT
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            처음 오시는 분들을 위한{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
              안내
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { delay: i * 0.15 }
              }
              whileHover={prefersReducedMotion ? {} : { y: -5, scale: 1.02 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md h-full">
                <CardContent className="p-6 relative">
                  <div
                    className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50"
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary-500 text-white text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </div>
                      <div
                        className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        aria-hidden="true"
                      >
                        <step.icon className={step.textColor} size={24} />
                      </div>
                    </div>
                    <h3 className="font-bold text-neutral-900 text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Worship Times Summary */}
      <Section background="gray" padding="xl" aria-label="예배 시간 안내">
        <div className="text-center mb-10">
          <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
            WORSHIP TIMES
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            예배 시간 안내
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {initialWorships.map((worship, i) => (
            <motion.div
              key={worship.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { delay: i * 0.05 }
              }
            >
              <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <Calendar className="text-primary-500" size={20} />
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
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link href="/demo/variant-c/worship">
            <Button variant="outline" className="group">
              예배 안내 자세히 보기
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </motion.div>
      </Section>

      {/* Inquiry Form */}
      <Section background="white" padding="xl" aria-label="문의하기">
        <div className="text-center mb-10">
          <p className="text-sm text-primary-500 font-medium mb-2 tracking-widest">
            CONTACT
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
              문의하기
            </span>
          </h2>
          <p className="text-neutral-500 mt-2">
            궁금한 점이 있으시면 언제든 연락해 주세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
          >
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 md:p-8">
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
                          className="h-11"
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
                          className="h-11"
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
                          className="h-11"
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
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] ${
                                preferredContact === method.value
                                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
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
                          className="min-h-[120px]"
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
                        className="w-full group shadow-lg shadow-primary-500/25"
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="space-y-4"
          >
            <p className="text-neutral-600 leading-relaxed mb-6">
              성락교회는 여러분을 진심으로 환영합니다. 예배, 교육, 소그룹 등
              궁금한 점이 있으시면 아래 연락처로 문의해 주세요.
            </p>

            {contactItems
              .filter((item) => item.value)
              .map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1 }
                  }
                >
                  <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md">
                    <CardContent className="p-5 relative">
                      <div
                        className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50"
                        aria-hidden="true"
                      />
                      <div className="flex items-center gap-4 relative z-10">
                        <div
                          className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                          aria-hidden="true"
                        >
                          <item.icon className={item.textColor} size={22} />
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 mb-0.5">
                            {item.label}
                          </p>
                          <p className="font-bold text-neutral-900">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

            {/* Mini Map Placeholder */}
            <div className="bg-neutral-200 rounded-2xl aspect-video flex flex-col items-center justify-center text-neutral-500 shadow-sm mt-6">
              <MapPin
                size={36}
                className="mb-2 text-primary-400"
                aria-hidden="true"
              />
              <p className="font-medium text-neutral-600 text-sm">지도 영역</p>
              <p className="text-xs mt-1">{location.address}</p>
            </div>
          </motion.div>
        </div>
      </Section>

      <Footer basePath="/demo/variant-c" />

      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group min-h-[44px] flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
      >
        <span
          className="group-hover:-translate-x-1 inline-block transition-transform"
          aria-hidden="true"
        >
          ←
        </span>{" "}
        시안 선택
      </Link>
    </div>
  );
}
