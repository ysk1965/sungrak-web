"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useRef } from "react";
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
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  {
    icon: ClipboardList,
    title: "온라인 등록",
    description: "홈페이지에서 새가족 등록을 해주세요",
  },
  {
    icon: MapPin,
    title: "교회 방문",
    description: "편안한 마음으로 성락교회를 방문해 주세요",
  },
  {
    icon: Users,
    title: "안내 데스크",
    description: "1층 안내 데스크에서 안내를 받으세요",
  },
  {
    icon: BookOpen,
    title: "새가족 교육",
    description: "4주간의 새가족 교육에 참여해 주세요",
  },
  {
    icon: Heart,
    title: "정착",
    description: "소그룹에 배정되어 함께 성장합니다",
  },
];

const features = [
  {
    icon: Music,
    title: "예배 분위기",
    description:
      "격식에 얽매이지 않는 편안한 예배 분위기입니다. 캐주얼한 복장도 환영합니다.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Car,
    title: "주차 안내",
    description:
      "교회 건물 지하 주차장을 이용하실 수 있습니다. 주일에는 안내요원이 배치됩니다.",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Baby,
    title: "어린이 프로그램",
    description:
      "유아~초등학생을 위한 주일학교가 운영됩니다. 예배 시간에 맞춰 진행됩니다.",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    icon: UtensilsCrossed,
    title: "식사 교제",
    description:
      "주일 예배 후 점심 식사 교제가 있습니다. 함께 식사하며 교제를 나눕니다.",
    gradient: "from-amber-500 to-amber-600",
  },
];

const faqItems = [
  {
    question: "예배 시간은 언제인가요?",
    answer:
      "주일 1부 오전 7:00, 2부 오전 9:30, 3부 오전 11:30에 예배가 있습니다. 수요예배는 오후 7:30입니다.",
  },
  {
    question: "주차가 가능한가요?",
    answer: "네, 교회 건물 지하 주차장을 무료로 이용하실 수 있습니다.",
  },
  {
    question: "어린이 프로그램이 있나요?",
    answer: "유아부터 초등학생까지 연령별 주일학교 프로그램이 운영됩니다.",
  },
  {
    question: "어떤 옷을 입어야 하나요?",
    answer: "편안한 복장으로 오시면 됩니다. 특별한 복장 규정은 없습니다.",
  },
  {
    question: "헌금은 어떻게 하나요?",
    answer: "예배 중 헌금 시간이 있으며, 온라인 헌금도 가능합니다.",
  },
  {
    question: "소그룹 활동이 있나요?",
    answer:
      "지역별, 연령별 소그룹(구역)이 활성화되어 있습니다. 새가족 교육 후 배정됩니다.",
  },
];

export default function NewcomerPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactMethod, setContactMethod] = useState<"phone" | "email" | "kakao">("phone");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.2],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 100],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    shouldReduceMotion ? [1, 1] : [1, 0],
  );

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
    <>
      {/* Hero Banner */}
      <section
        ref={heroRef}
        className="relative h-[50vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="새가족 환영 배너"
      >
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <Image
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/60 to-neutral-900/30" />
        </motion.div>

        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldReduceMotion ? 0.1 : 0.1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 1 }}
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            }}
          />
        </div>

        <Container className="relative z-10 h-full flex items-center">
          <motion.div style={{ y: textY, opacity }} className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            >
              <Badge className="bg-primary-500/20 text-primary-300 border-primary-400/30 mb-4">
                WELCOME
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 0.3, duration: 0.8 }
              }
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                새가족
              </span>
              을 환영합니다
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }}
              className="text-lg text-white/70 leading-relaxed max-w-xl"
            >
              성락교회에 처음 오셨나요?
              <br />
              따뜻한 마음으로 여러분을 맞이하겠습니다.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Section 2: 등록 절차 */}
      <Section background="white" padding="xl" aria-label="새가족 등록 절차">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-100">
            Step by Step
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            등록 절차
          </h2>
          <p className="text-neutral-500 mt-2">
            간단한 절차로 성락교회 가족이 되실 수 있습니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 items-start">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
              }
              className="relative flex flex-col items-center text-center"
            >
              {/* Connecting line for md+ */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-gradient-to-r from-primary-300 to-primary-200"
                  style={{ right: "-calc(50% - 28px)" }}
                  aria-hidden="true"
                />
              )}

              {/* Numbered circle */}
              <div className="w-14 h-14 rounded-full bg-primary-500 text-white font-bold text-xl flex items-center justify-center mb-4 relative z-10 shadow-lg shadow-primary-500/25">
                {i + 1}
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-3"
                aria-hidden="true"
              >
                <step.icon
                  size={24}
                  className="text-primary-500"
                  aria-hidden="true"
                />
              </div>

              {/* Text */}
              <h3 className="font-bold text-neutral-900 mb-1">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Section 3: 이런 점이 궁금하시죠 */}
      <Section background="gray" padding="lg" aria-label="교회 생활 안내">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="mb-10"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-600 hover:bg-amber-100">
            What to Expect
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            이런 점이 궁금하시죠
          </h2>
          <p className="text-neutral-500 mt-2">
            처음 방문하시는 분들이 자주 궁금해하시는 사항들입니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }
              }
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            >
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                <div
                  className={`h-1 bg-gradient-to-r ${feature.gradient}`}
                  aria-hidden="true"
                />
                <CardContent className="p-6 pt-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <feature.icon
                        size={26}
                        className="text-neutral-700"
                        aria-hidden="true"
                      />
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Section 4: FAQ */}
      <Section background="white" padding="lg" aria-label="자주 묻는 질문">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="text-center mb-10"
        >
          <Badge className="mb-4 bg-neutral-200 text-neutral-600 hover:bg-neutral-200">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            자주 묻는 질문
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { delay: i * 0.05 }
              }
              className="rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-sm"
            >
              <button
                id={`faq-button-${i}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left min-h-[44px] hover:bg-neutral-50 transition-colors"
                aria-expanded={openFaq === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span className="font-semibold text-neutral-900 pr-4">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }
                  }
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
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.3, ease: "easeInOut" }
                    }
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
      </Section>

      {/* Section 5: 문의 폼 */}
      <Section background="gray" padding="xl" aria-label="새가족 문의">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="text-center mb-10"
        >
          <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-100">
            Contact Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            새가족 문의
          </h2>
          <p className="text-neutral-500 mt-2">
            궁금한 점이 있으시면 편하게 문의해 주세요
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
          >
            <Card className="border-0 shadow-md overflow-hidden">
              <div
                className="h-1 bg-gradient-to-r from-primary-500 to-amber-500"
                aria-hidden="true"
              />
              <CardContent className="p-6 pt-8 md:p-8 md:pt-10">
                {isSubmitted ? (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: shouldReduceMotion ? 1 : 0.9,
                    }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={
                      shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }
                    }
                    className="text-center py-8"
                  >
                    <div
                      className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                      aria-hidden="true"
                    >
                      <CheckCircle
                        size={32}
                        className="text-green-500"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      문의가 접수되었습니다
                    </h3>
                    <p className="text-neutral-500">
                      빠른 시일 내에 연락드리겠습니다. 감사합니다.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-6"
                  >
                    {/* Name & Phone - 2 column */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="newcomer-name"
                          className="block text-sm font-medium text-neutral-700 mb-2"
                        >
                          이름 <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="newcomer-name"
                          placeholder="이름을 입력해주세요"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={
                            errors.name ? "name-error" : undefined
                          }
                          className="min-h-[44px]"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p
                            id="name-error"
                            className="mt-1 text-sm text-red-500"
                            role="alert"
                          >
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="newcomer-phone"
                          className="block text-sm font-medium text-neutral-700 mb-2"
                        >
                          전화번호 <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="newcomer-phone"
                          type="tel"
                          placeholder="010-0000-0000"
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                          aria-describedby={
                            errors.phone ? "phone-error" : undefined
                          }
                          className="min-h-[44px]"
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p
                            id="phone-error"
                            className="mt-1 text-sm text-red-500"
                            role="alert"
                          >
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email - full width */}
                    <div>
                      <label
                        htmlFor="newcomer-email"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                      >
                        이메일
                      </label>
                      <Input
                        id="newcomer-email"
                        type="email"
                        placeholder="이메일 주소를 입력해주세요 (선택)"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className="min-h-[44px]"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="mt-1 text-sm text-red-500"
                          role="alert"
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Preferred contact method */}
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

                    {/* Message - full width */}
                    <div>
                      <label
                        htmlFor="newcomer-message"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                      >
                        문의 내용 <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="newcomer-message"
                        placeholder="궁금한 점이나 요청사항을 입력해주세요"
                        rows={5}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                        className="min-h-[120px]"
                        {...register("message")}
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          className="mt-1 text-sm text-red-500"
                          role="alert"
                        >
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary-500 hover:bg-primary-600 group min-h-[44px] shadow-lg shadow-primary-500/25"
                    >
                      문의하기
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 motion-reduce:transition-none transition-transform"
                        aria-hidden="true"
                      />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Section 6: 오시는 길 */}
      <Section background="white" padding="lg" aria-label="오시는 길">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : undefined}
          className="mb-8"
        >
          <Badge className="mb-4 bg-neutral-200 text-neutral-600 hover:bg-neutral-200">
            Location
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            오시는 길
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
        >
          <Card className="border-0 shadow-md overflow-hidden">
            <div
              className="h-1 bg-gradient-to-r from-neutral-800 to-neutral-600"
              aria-hidden="true"
            />
            <CardContent className="p-6 md:p-8 pt-6 md:pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <MapPin
                      size={20}
                      className="text-primary-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-1">주소</p>
                    <p className="text-sm text-neutral-500">
                      {location.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Phone
                      size={20}
                      className="text-primary-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-1">
                      연락처
                    </p>
                    <p className="text-sm text-neutral-500">{location.phone}</p>
                  </div>
                </div>

                {/* Transport */}
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Train
                      size={20}
                      className="text-primary-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-1">
                      대중교통
                    </p>
                    <p className="text-sm text-neutral-500">
                      1호선 신도림역 1번 출구 도보 5분
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-100 text-center">
                <Link href="/demo/variant-d/about#location">
                  <Button variant="outline" className="group min-h-[44px]">
                    지도에서 보기
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 motion-reduce:transition-none transition-transform"
                      aria-hidden="true"
                    />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>
    </>
  );
}
