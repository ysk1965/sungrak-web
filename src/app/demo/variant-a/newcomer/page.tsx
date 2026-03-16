"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Heart,
  UserPlus,
  BookOpen,
  Users,
  Home,
  ChevronDown,
  Check,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useBasePath } from "@/contexts/base-path-context";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Section, SectionHeader } from "@/components/common/section";
import { PageHero } from "@/components/variant-a/page-hero";
import { Breadcrumb } from "@/components/variant-a/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";

// --- Form Schema ---
const newcomerSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  phone: z
    .string()
    .min(1, "전화번호를 입력해주세요")
    .regex(
      /^\d{2,3}-\d{3,4}-\d{4}$/,
      "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)",
    ),
  email: z
    .string()
    .email("올바른 이메일 형식이 아닙니다")
    .optional()
    .or(z.literal("")),
  message: z.string().min(1, "문의 내용을 입력해주세요"),
  preferredContact: z.enum(["phone", "email", "kakao"]).optional(),
});

type NewcomerFormData = z.infer<typeof newcomerSchema>;

// --- Data ---
const steps = [
  {
    number: 1,
    icon: Home,
    title: "방문",
    description: "편한 마음으로 교회를 방문해주세요",
  },
  {
    number: 2,
    icon: UserPlus,
    title: "등록",
    description: "새가족 등록 카드를 작성해주세요",
  },
  {
    number: 3,
    icon: BookOpen,
    title: "교육",
    description: "새가족 교육에 참여해주세요",
  },
  {
    number: 4,
    icon: Users,
    title: "정착",
    description: "소그룹에 합류하여 함께 성장해요",
  },
];

const faqItems = [
  {
    question: "예배 시간은 언제인가요?",
    answer:
      "주일 1부 예배 오전 7:00, 2부 예배 오전 9:30, 3부 예배 오전 11:30에 드리고 있습니다. 수요예배는 저녁 7:30, 새벽기도는 오전 5:00에 진행됩니다.",
  },
  {
    question: "주차가 가능한가요?",
    answer:
      "네, 교회 주차장을 이용하실 수 있습니다. 주일에는 주차 안내 봉사자가 배치되어 있으니 안내에 따라 주차해주시면 됩니다.",
  },
  {
    question: "어떤 옷을 입고 가야 하나요?",
    answer:
      "편안한 복장으로 오시면 됩니다. 특별한 드레스 코드는 없으며, 편하게 예배에 집중하실 수 있는 복장이면 충분합니다.",
  },
  {
    question: "아이들도 함께 갈 수 있나요?",
    answer:
      "물론입니다! 영유아부, 유치부, 초등부를 운영하고 있어 연령에 맞는 예배와 프로그램에 참여할 수 있습니다. 각 부서 담당 교역자와 교사들이 아이들을 돌봐드립니다.",
  },
  {
    question: "처음 방문 시 어디로 가야 하나요?",
    answer:
      "1층 안내데스크로 오시면 됩니다. 새가족 담당 봉사자가 친절하게 안내해 드리며, 예배당 좌석 안내와 새가족 등록을 도와드립니다.",
  },
];

const contactMethods = [
  { value: "phone" as const, label: "전화", icon: Phone },
  { value: "email" as const, label: "이메일", icon: Mail },
  { value: "kakao" as const, label: "카카오톡", icon: MessageCircle },
];

// --- Component ---
export default function NewcomerPage() {
  const basePath = useBasePath();
  const shouldReduceMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const reducedTransition = { duration: 0 };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<NewcomerFormData>({
    resolver: zodResolver(newcomerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      preferredContact: undefined,
    },
  });

  const selectedContact = watch("preferredContact");

  const onSubmit = () => {
    setIsSubmitted(true);
    reset();
  };

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header variant="transparent" basePath={basePath} />

      {/* Hero */}
      <PageHero
        title="새가족 안내"
        subtitle="성락교회가 환영합니다"
        backgroundImage="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070"
        backgroundAlt="따뜻한 환영 분위기의 교회 공동체"
      />

      {/* Breadcrumb */}
      <Section background="white" padding="sm">
        <Breadcrumb items={[{ label: "새가족" }]} />
      </Section>

      {/* 환영 메시지 (Welcome) */}
      <Section background="white" padding="xl" aria-label="환영 메시지">
        <FadeInUp>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-8">
              <Heart
                className="w-10 h-10 text-primary-500"
                aria-hidden="true"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              환영합니다
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              성락교회에 오신 것을 진심으로 환영합니다. 처음 교회를 방문하시는
              분들이 편안하게 예배에 참여하고, 따뜻한 공동체 안에서 함께 신앙의
              여정을 걸어갈 수 있도록 정성껏 안내해 드리겠습니다. 어떤 질문이든
              부담 없이 문의해 주세요.
            </p>
          </div>
        </FadeInUp>
      </Section>

      {/* 단계별 안내 (Steps) */}
      <Section background="gray" padding="xl" aria-label="새가족 등록 단계">
        <SectionHeader title="새가족 등록 안내" />

        <StaggerContainer className="relative">
          {/* Dashed connecting line on desktop */}
          <div
            className="hidden lg:block absolute top-[calc(1.5rem+24px)] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] border-t-2 border-dashed border-primary-300 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="relative z-10 flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white hover:shadow-md hover:-translate-y-1 hover:border-primary-200 border border-transparent transition-all duration-300 group">
                  {/* Step Number */}
                  <div className="w-12 h-12 rounded-full bg-primary-500 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-lg group-hover:bg-primary-600 group-hover:shadow-xl transition-all duration-300">
                    {step.number}
                  </div>
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow duration-300">
                    <step.icon
                      className="w-8 h-8 text-primary-500 group-hover:text-primary-600 transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>
                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </Section>

      {/* 문의 폼 (Inquiry Form) */}
      <Section background="white" padding="xl" aria-label="문의하기">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Info */}
          <FadeInUp className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              문의하기
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              궁금한 점이 있으시면 편하게 문의하세요. 담당자가 빠른 시일 내에
              연락드리겠습니다.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-50 border border-primary-100">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                <Phone
                  className="w-5 h-5 text-primary-600"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="text-sm text-neutral-500">교회 대표번호</p>
                <a
                  href="tel:070-7300-6200"
                  className="text-lg font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
                >
                  070-7300-6200
                </a>
              </div>
            </div>
          </FadeInUp>

          {/* Right: Form */}
          <FadeInUp delay={0.2} className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={
                    shouldReduceMotion ? reducedTransition : { duration: 0.4 }
                  }
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-center justify-center text-center p-12 rounded-2xl bg-primary-50 border border-primary-100"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={
                      shouldReduceMotion
                        ? reducedTransition
                        : { duration: 0.5, ease: "easeOut" }
                    }
                  >
                    <Check
                      className="w-8 h-8 text-green-600"
                      aria-hidden="true"
                    />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    문의가 접수되었습니다
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    담당자가 빠른 시일 내에 연락드리겠습니다.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    추가 문의하기
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                  transition={
                    shouldReduceMotion ? reducedTransition : { duration: 0.3 }
                  }
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 p-8 rounded-2xl bg-neutral-50 border border-neutral-200"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="이름"
                      className="h-11"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      전화번호 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      type="tel"
                      placeholder="010-0000-0000"
                      className="h-11"
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-sm text-red-500 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      이메일{" "}
                      <span className="text-neutral-400 text-xs">(선택)</span>
                    </label>
                    <Input
                      id="email"
                      {...register("email")}
                      type="email"
                      placeholder="email@example.com"
                      className="h-11"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Preferred Contact */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      선호하는 연락 방법
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {contactMethods.map((method) => (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() =>
                            setValue("preferredContact", method.value)
                          }
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 min-h-[44px] ${
                            selectedContact === method.value
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                          }`}
                        >
                          <method.icon size={16} aria-hidden="true" />
                          {method.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      문의 내용 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="문의 내용을 입력해주세요"
                      rows={4}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="text-sm text-red-500 mt-1"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold"
                  >
                    문의하기
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeInUp>
        </div>
      </Section>

      {/* FAQ 아코디언 */}
      <Section background="gray" padding="xl" aria-label="자주 묻는 질문">
        <SectionHeader title="자주 묻는 질문" />

        <FadeInUp>
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-neutral-400 text-center mb-6">
              궁금한 내용을 클릭해보세요
            </p>
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={
                  index < faqItems.length - 1
                    ? "border-b border-neutral-200"
                    : ""
                }
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full flex items-center justify-between py-5 px-4 text-left transition-colors min-h-[44px] ${
                    openIndex === index
                      ? "text-primary-600"
                      : "text-neutral-900 hover:text-primary-600"
                  }`}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-medium text-base pr-4">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={
                      shouldReduceMotion ? reducedTransition : { duration: 0.2 }
                    }
                    className="shrink-0"
                  >
                    <ChevronDown size={20} aria-hidden="true" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      key={`faq-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        shouldReduceMotion
                          ? reducedTransition
                          : { duration: 0.3, ease: "easeInOut" }
                      }
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-5 text-neutral-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </FadeInUp>
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
