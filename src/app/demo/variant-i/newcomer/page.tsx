"use client";

import { useState } from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ClipboardList,
  MapPin,
  Users,
  BookOpen,
  Heart,
  Music,
  Car,
  Baby,
  UtensilsCrossed,
  ChevronDown,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  Train,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { initialChurchInfo } from "@/mocks/data/initial";

const newcomerSchema = z.object({
  name: z.string().min(2, "이름을 2자 이상 입력해주세요"),
  phone: z.string().min(10, "올바른 전화번호를 입력해주세요"),
  email: z
    .string()
    .email("올바른 이메일을 입력해주세요")
    .optional()
    .or(z.literal("")),
  message: z.string().min(10, "문의 내용을 10자 이상 입력해주세요"),
});
type NewcomerFormData = z.infer<typeof newcomerSchema>;

const steps = [
  { icon: ClipboardList, title: "온라인 등록", description: "홈페이지에서 새가족 등록을 해주세요" },
  { icon: MapPin, title: "교회 방문", description: "편안한 마음으로 성락교회를 방문해 주세요" },
  { icon: Users, title: "안내 데스크", description: "1층 안내 데스크에서 안내를 받으세요" },
  { icon: BookOpen, title: "새가족 교육", description: "4주간의 새가족 교육에 참여해 주세요" },
  { icon: Heart, title: "정착", description: "소그룹에 배정되어 함께 성장합니다" },
];

const features = [
  { icon: Music, title: "예배 분위기", description: "격식에 얽매이지 않는 편안한 예배 분위기입니다. 캐주얼한 복장도 환영합니다." },
  { icon: Car, title: "주차 안내", description: "교회 건물 지하 주차장을 이용하실 수 있습니다. 주일에는 안내요원이 배치됩니다." },
  { icon: Baby, title: "어린이 프로그램", description: "유아~초등학생을 위한 주일학교가 운영됩니다. 예배 시간에 맞춰 진행됩니다." },
  { icon: UtensilsCrossed, title: "식사 교제", description: "주일 예배 후 점심 식사 교제가 있습니다. 함께 식사하며 교제를 나눕니다." },
];

const faqItems = [
  { question: "예배 시간은 언제인가요?", answer: "주일 1부 오전 7:00, 2부 오전 9:30, 3부 오전 11:30에 예배가 있습니다. 수요예배는 오후 7:30입니다." },
  { question: "주차가 가능한가요?", answer: "네, 교회 건물 지하 주차장을 무료로 이용하실 수 있습니다." },
  { question: "어린이 프로그램이 있나요?", answer: "유아부터 초등학생까지 연령별 주일학교 프로그램이 운영됩니다." },
  { question: "어떤 옷을 입어야 하나요?", answer: "편안한 복장으로 오시면 됩니다. 특별한 복장 규정은 없습니다." },
  { question: "헌금은 어떻게 하나요?", answer: "예배 중 헌금 시간이 있으며, 온라인 헌금도 가능합니다." },
  { question: "소그룹 활동이 있나요?", answer: "지역별, 연령별 소그룹(구역)이 활성화되어 있습니다. 새가족 교육 후 배정됩니다." },
];

const makeFadeInUp = (
  yOffset: number,
  delay: number,
  duration: number,
  reduced: boolean | null,
): Variants => ({
  hidden: reduced ? { opacity: 1 } : { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: reduced ? { duration: 0 } : { duration, delay },
  },
});

const makeFadeInX = (
  xOffset: number,
  delay: number,
  duration: number,
  reduced: boolean | null,
): Variants => ({
  hidden: reduced ? { opacity: 1 } : { opacity: 0, x: xOffset },
  visible: {
    opacity: 1,
    x: 0,
    transition: reduced ? { duration: 0 } : { duration, delay },
  },
});

export default function VariantINewcomerPage() {
  const rm = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactMethod, setContactMethod] = useState<"phone" | "email" | "kakao">("phone");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewcomerFormData>({
    resolver: zodResolver(newcomerSchema),
  });

  const onSubmit = () => {
    setIsSubmitted(true);
  };

  const { location } = initialChurchInfo;

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Paper Texture Overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <Header />

      {/* Hero (3:2 asymmetric with tilted portrait) */}
      <section
        aria-label="새가족 환영"
        className="relative min-h-[70vh] mt-16 md:mt-20 overflow-hidden"
      >
        <Container size="xl" className="h-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[calc(70vh-5rem)] py-12 lg:py-0">
            {/* Left side - 60% (3/5) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <motion.p
                variants={makeFadeInUp(20, 0, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-6"
              >
                WELCOME
              </motion.p>

              <motion.h1
                variants={makeFadeInUp(30, 0.1, 0.8, rm)}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight mb-6"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-600">
                  새가족
                </span>
                을
                <br />
                환영합니다
              </motion.h1>

              <motion.p
                variants={makeFadeInUp(20, 0.2, 0.6, rm)}
                initial="hidden"
                animate="visible"
                className="text-lg text-neutral-500 mb-10 tracking-wide"
              >
                We Warmly Welcome You
              </motion.p>
            </div>

            {/* Right side - 40% (2/5) — tilted portrait */}
            <motion.div
              variants={
                rm
                  ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
                  : {
                      hidden: { opacity: 0, x: 60, rotate: 4 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        rotate: 2,
                        transition: { duration: 1, delay: 0.2 },
                      },
                    }
              }
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 order-1 lg:order-2 relative"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform rotate-2">
                <Image
                  src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070"
                  alt="성락교회 환영 모습"
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                />
              </div>

              {/* Decorative element — tilted opposite direction */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-primary-200 -z-10 transform -rotate-1"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Registration Steps */}
      <section aria-label="새가족 등록 절차" className="bg-white py-20">
        <Container size="xl">
          <div className="text-center mb-14">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-3"
            >
              STEP BY STEP
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-neutral-900"
            >
              등록 절차
            </motion.h2>
            <motion.p
              variants={makeFadeInUp(10, 0.1, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-neutral-500 mt-2"
            >
              간단한 절차로 성락교회 가족이 되실 수 있습니다
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 items-start">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={makeFadeInUp(20, i * 0.1, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center"
              >
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-gradient-to-r from-primary-300 to-primary-200"
                    aria-hidden="true"
                  />
                )}
                <div className="w-14 h-14 rounded-full bg-primary-500 text-white font-bold text-xl flex items-center justify-center mb-4 relative z-10 shadow-lg shadow-primary-500/25">
                  {i + 1}
                </div>
                <div
                  className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-3"
                  aria-hidden="true"
                >
                  <step.icon size={24} className="text-primary-500" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-1">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* What to Expect */}
      <section aria-label="교회 생활 안내" className="bg-[#F5F0E8] py-20">
        <Container size="xl">
          <motion.p
            variants={makeFadeInUp(10, 0, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-3"
          >
            WHAT TO EXPECT
          </motion.p>
          <motion.h2
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-neutral-900 mb-10"
          >
            이런 점이 궁금하시죠
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={makeFadeInUp(20, i * 0.1, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={rm ? undefined : { y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-100"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <feature.icon size={24} className="text-primary-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section aria-label="자주 묻는 질문" className="bg-white py-20">
        <Container size="xl">
          <div className="text-center mb-10">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-3"
            >
              FAQ
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-neutral-900"
            >
              자주 묻는 질문
            </motion.h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                variants={makeFadeInUp(10, i * 0.05, 0.4, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl border border-neutral-200 bg-[#FAF8F3] overflow-hidden"
              >
                <button
                  id={`faq-button-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left min-h-[44px] hover:bg-[#F5F0E8] transition-colors"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-semibold text-neutral-900 pr-4">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={rm ? { duration: 0 } : { duration: 0.2 }}
                    className="flex-shrink-0"
                    aria-hidden="true"
                  >
                    <ChevronDown size={20} className="text-neutral-400" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={rm ? { duration: 0 } : { duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-neutral-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <section aria-label="새가족 문의" className="bg-[#F5F0E8] py-20">
        <Container size="xl">
          <div className="text-center mb-10">
            <motion.p
              variants={makeFadeInUp(10, 0, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-3"
            >
              CONTACT US
            </motion.p>
            <motion.h2
              variants={makeFadeInUp(20, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-neutral-900"
            >
              새가족 문의
            </motion.h2>
            <motion.p
              variants={makeFadeInUp(10, 0.1, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-neutral-500 mt-2"
            >
              궁금한 점이 있으시면 편하게 문의해 주세요
            </motion.p>
          </div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              variants={makeFadeInUp(20, 0.1, 0.5, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-neutral-100">
                <div className="p-6 pt-8 md:p-8 md:pt-10">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: rm ? 1 : 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={rm ? { duration: 0 } : { duration: 0.3 }}
                      className="text-center py-8"
                    >
                      <div
                        className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"
                        aria-hidden="true"
                      >
                        <CheckCircle size={32} className="text-green-500" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                        문의가 접수되었습니다
                      </h3>
                      <p className="text-neutral-500">
                        빠른 시일 내에 연락드리겠습니다. 감사합니다.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="newcomer-name" className="block text-sm font-medium text-neutral-700 mb-2">
                            이름 <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="newcomer-name"
                            placeholder="이름을 입력해주세요"
                            aria-required="true"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            className="min-h-[44px]"
                            {...register("name")}
                          />
                          {errors.name && (
                            <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="newcomer-phone" className="block text-sm font-medium text-neutral-700 mb-2">
                            전화번호 <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="newcomer-phone"
                            type="tel"
                            placeholder="010-0000-0000"
                            aria-required="true"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                            className="min-h-[44px]"
                            {...register("phone")}
                          />
                          {errors.phone && (
                            <p id="phone-error" className="mt-1 text-sm text-red-500" role="alert">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="newcomer-email" className="block text-sm font-medium text-neutral-700 mb-2">
                          이메일
                        </label>
                        <Input
                          id="newcomer-email"
                          type="email"
                          placeholder="이메일 주소를 입력해주세요 (선택)"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className="min-h-[44px]"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <fieldset>
                        <legend className="block text-sm font-medium text-neutral-700 mb-2">
                          선호 연락 방법
                        </legend>
                        <div className="flex gap-3">
                          {([
                            { value: "phone" as const, label: "전화", icon: Phone },
                            { value: "email" as const, label: "이메일", icon: Mail },
                            { value: "kakao" as const, label: "카카오톡", icon: MessageCircle },
                          ]).map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setContactMethod(option.value)}
                              className={`rounded-full px-5 py-2.5 min-h-[44px] flex items-center gap-2 text-sm font-medium transition-all ${
                                contactMethod === option.value
                                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                              }`}
                              aria-pressed={contactMethod === option.value}
                            >
                              <option.icon size={16} aria-hidden="true" />
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </fieldset>

                      <div>
                        <label htmlFor="newcomer-message" className="block text-sm font-medium text-neutral-700 mb-2">
                          문의 내용 <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="newcomer-message"
                          placeholder="궁금한 점이나 요청사항을 입력해주세요"
                          rows={5}
                          aria-required="true"
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "message-error" : undefined}
                          className="min-h-[120px]"
                          {...register("message")}
                        />
                        {errors.message && (
                          <p id="message-error" className="mt-1 text-sm text-red-500" role="alert">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full group min-h-[44px] shadow-lg shadow-primary-500/25"
                      >
                        문의하기
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Location */}
      <section aria-label="오시는 길" className="bg-white py-20">
        <Container size="xl">
          <motion.p
            variants={makeFadeInUp(10, 0, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm text-primary-500 font-medium tracking-[0.3em] uppercase mb-3"
          >
            LOCATION
          </motion.p>
          <motion.h2
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8"
          >
            오시는 길
          </motion.h2>

          <motion.div
            variants={makeFadeInUp(20, 0.1, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-[#FAF8F3] rounded-2xl p-6 md:p-8 border border-neutral-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <MapPin size={20} className="text-primary-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-1">주소</p>
                    <p className="text-sm text-neutral-500">{location.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Phone size={20} className="text-primary-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-1">연락처</p>
                    <p className="text-sm text-neutral-500">{location.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Train size={20} className="text-primary-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-1">대중교통</p>
                    <p className="text-sm text-neutral-500">1호선 신도림역 1번 출구 도보 5분</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
                <Link href="/about#location">
                  <Button variant="outline" className="group min-h-[44px] rounded-full border-2">
                    지도에서 보기
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group min-h-[44px] inline-flex items-center"
        aria-label="시안 선택 페이지로 돌아가기"
      >
        <span
          aria-hidden="true"
          className="group-hover:-translate-x-1 inline-block transition-transform"
        >
          &larr;
        </span>{" "}
        시안 선택
      </Link>
    </div>
  );
}
