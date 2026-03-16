"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Heart,
  Users,
  BookOpen,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Container } from "@/components/common";
import { Section, SectionHeader } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { instantTransition } from "@/lib/animations";

const newcomerFormSchema = z.object({
  name: z.string().min(2, "이름을 2자 이상 입력해주세요"),
  phone: z
    .string()
    .regex(
      /^0\d{1,2}-\d{3,4}-\d{4}$/,
      "올바른 전화번호 형식을 입력해주세요 (예: 010-1234-5678)",
    ),
  message: z.string().min(5, "문의 내용을 5자 이상 입력해주세요"),
});

type NewcomerFormValues = z.infer<typeof newcomerFormSchema>;

const welcomeFeatures = [
  {
    icon: BookOpen,
    title: "편안한 예배",
    desc: "은혜로운 말씀과 찬양이 함께하는 예배",
    color: "bg-blue-500",
  },
  {
    icon: Users,
    title: "따뜻한 교제",
    desc: "사랑으로 섬기는 공동체 안에서의 교제",
    color: "bg-emerald-500",
  },
  {
    icon: Heart,
    title: "함께 성장",
    desc: "양육과 훈련을 통한 신앙 성장",
    color: "bg-rose-500",
  },
];

const registrationSteps = [
  {
    icon: MapPin,
    title: "방문",
    desc: "편안한 마음으로 교회를 방문해주세요",
    color: "from-blue-500 to-blue-400",
  },
  {
    icon: Users,
    title: "안내",
    desc: "새가족실에서 안내를 받으실 수 있습니다",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: BookOpen,
    title: "등록",
    desc: "새가족 등록 후 양육 과정을 시작합니다",
    color: "from-primary-500 to-amber-400",
  },
  {
    icon: Heart,
    title: "교제",
    desc: "소그룹에 배정되어 교제가 시작됩니다",
    color: "from-rose-500 to-pink-400",
  },
];

export default function VariantBNewcomerPage() {
  const shouldReduceMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewcomerFormValues>({
    resolver: zodResolver(newcomerFormSchema),
  });

  const animateProps = (delay = 0) => ({
    initial: shouldReduceMotion ? false : ({ opacity: 0, y: 20 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
    transition: shouldReduceMotion
      ? instantTransition
      : { delay, duration: 0.6 },
  });

  const onSubmit = async (data: NewcomerFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    reset();
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-[50vh] md:h-[60vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="새가족 안내 히어로"
      >
        <Image
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069"
          alt=""
          role="presentation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <Container className="relative z-10 h-full flex items-end pb-12 md:pb-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion ? instantTransition : { duration: 0.6 }
            }
          >
            <Badge className="mb-3 bg-white/20 text-white border-none backdrop-blur-sm">
              Welcome
            </Badge>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300 font-semibold mb-2 text-lg">
              Welcome to Our Church
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
              새가족 안내
            </h1>
            <p className="text-lg text-white/70 max-w-xl">
              성락교회에 오신 것을 진심으로 환영합니다
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Welcome Message - Overlapping Hero */}
      <Section background="white" padding="lg" aria-label="환영 메시지">
        <div className="relative z-20 -mt-20">
          <motion.div {...animateProps(0)}>
            <Card className="shadow-xl border-none border-t-4 border-t-primary-500">
              <CardContent className="p-8 md:p-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                    <Heart size={32} className="text-primary-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                    처음 오셨나요?
                  </h2>
                  <p className="text-neutral-600 max-w-xl mx-auto">
                    성락교회는 여러분을 진심으로 환영합니다. 편안한 마음으로
                    방문해 주세요. 따뜻한 교제와 은혜로운 예배가 함께합니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {welcomeFeatures.map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }
                      }
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={
                        shouldReduceMotion
                          ? instantTransition
                          : { delay: 0.2 + i * 0.1 }
                      }
                      className="text-center p-6 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
                    >
                      <div
                        className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-4`}
                      >
                        <feature.icon size={24} className="text-white" />
                      </div>
                      <h3 className="font-bold text-neutral-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-neutral-500">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Registration Steps */}
      <Section background="gray" padding="xl" aria-label="새가족 등록 과정">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              Process
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader
              title="새가족 등록 과정"
              subtitle="4단계로 새가족이 되실 수 있습니다"
            />
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line (desktop only) */}
          <div className="absolute top-12 left-[10%] right-[10%] h-px bg-neutral-200 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {registrationSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion ? instantTransition : { delay: i * 0.15 }
                }
                className="text-center relative"
              >
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 relative z-10`}
                >
                  <step.icon size={32} className="text-white" />
                </div>
                <Badge variant="secondary" className="mb-2">
                  Step {i + 1}
                </Badge>
                <h3 className="font-bold text-neutral-900 text-lg mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Inquiry Form */}
      <Section background="white" padding="xl" aria-label="문의하기">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              Contact
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader
              title="문의하기"
              subtitle="궁금한 점이 있으시면 편하게 문의해 주세요"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Info Column */}
          <motion.div {...animateProps(0.2)}>
            <Card className="shadow-lg border-none bg-gradient-to-br from-primary-500 to-primary-600 h-full">
              <CardContent className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">연락처 & 예배 안내</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">전화 문의</p>
                      <p className="text-white/80 text-sm">070-7300-6200</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">주소</p>
                      <p className="text-white/80 text-sm">
                        서울시 구로구 신도림로 56-24
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">예배 시간</p>
                      <ul className="text-white/80 text-sm space-y-1 mt-1">
                        <li>주일 1부 07:00 / 2부 09:30 / 3부 11:30</li>
                        <li>수요예배 19:30</li>
                        <li>새벽기도 05:00 (월~토)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <Link href="/demo/variant-b/worship">
                    <Button
                      variant="secondary"
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-none group"
                    >
                      예배 안내 보기
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                      />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Form Column */}
          <motion.div {...animateProps(0.3)}>
            <Card className="shadow-lg border-none h-full">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                    <motion.div
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      transition={
                        shouldReduceMotion
                          ? instantTransition
                          : { type: "spring", stiffness: 200, damping: 15 }
                      }
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={40} className="text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                        문의가 접수되었습니다
                      </h3>
                      <p className="text-neutral-500 mb-6">
                        빠른 시일 내에 연락드리겠습니다
                      </p>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="rounded-full"
                      >
                        확인
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
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
                        placeholder="이름을 입력해주세요"
                        {...register("name")}
                        className={errors.name ? "border-red-400" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
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
                        type="tel"
                        placeholder="010-0000-0000"
                        {...register("phone")}
                        className={errors.phone ? "border-red-400" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.phone.message}
                        </p>
                      )}
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
                        rows={5}
                        placeholder="문의하실 내용을 입력해주세요"
                        {...register("message")}
                        className={errors.message ? "border-red-400" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-full group"
                    >
                      {isSubmitting ? (
                        "전송 중..."
                      ) : (
                        <>
                          문의하기
                          <Send
                            size={16}
                            className="ml-2 group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Footer />

      {/* Back to Demo Selection */}
      <Link
        href="/"
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition-colors text-sm group"
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
