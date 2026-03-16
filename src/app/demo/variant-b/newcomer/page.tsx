"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
  Quote,
  Navigation,
  Camera,
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

const churchFacilities = [
  {
    label: "예배당",
    image:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=800",
  },
  {
    label: "교육관",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800",
  },
  {
    label: "친교실",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800",
  },
  {
    label: "주차장",
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800",
  },
];

const faqItems = [
  {
    question: "예배 시간은 언제인가요?",
    answer:
      "주일예배는 1부 07:00, 2부 09:30, 3부 11:30에 진행됩니다. 수요예배는 19:30, 새벽기도는 매일(월~토) 05:00에 있습니다. 처음 방문하시는 분은 편한 시간에 오시면 됩니다.",
  },
  {
    question: "주차는 가능한가요?",
    answer:
      "네, 교회 건물 내 주차장을 이용하실 수 있습니다. 주일에는 주차 안내 봉사자가 안내해 드립니다. 대중교통 이용 시 신도림역에서 도보 10분 거리입니다.",
  },
  {
    question: "어떤 복장으로 오면 되나요?",
    answer:
      "편안한 복장으로 오시면 됩니다. 특별한 복장 규정은 없으며, 자유롭고 편안한 마음으로 예배에 참여해 주세요.",
  },
  {
    question: "아이를 데리고 가도 되나요?",
    answer:
      "물론입니다! 영유아부터 고등부까지 연령별 교육 프로그램이 마련되어 있습니다. 영아실과 유아실도 준비되어 있으니 어린 자녀와 함께 편안하게 방문해 주세요.",
  },
  {
    question: "새가족 교육은 어떻게 진행되나요?",
    answer:
      "새가족 등록 후 4주간의 새가족 교육이 진행됩니다. 교회 소개, 신앙의 기초, 소그룹 안내 등을 통해 교회 생활에 잘 적응하실 수 있도록 도와드립니다.",
  },
  {
    question: "온라인으로도 예배에 참여할 수 있나요?",
    answer:
      "네, 주일 2부 예배를 온라인으로 실시간 송출하고 있습니다. 교회 홈페이지와 유튜브 채널에서 시청하실 수 있으며, 지난 설교도 다시 보실 수 있습니다.",
  },
];

export default function VariantBNewcomerPage() {
  const shouldReduceMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header basePath="/demo/variant-b" />

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

      {/* Registration Steps (Enhanced) */}
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
                {/* Large decorative step number */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-[5rem] font-black text-neutral-100 select-none pointer-events-none leading-none z-0"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 relative z-10`}
                >
                  <step.icon size={32} className="text-white" />
                </div>

                {/* Connecting arrow (desktop only, not on last item) */}
                {i < registrationSteps.length - 1 && (
                  <div
                    className="absolute top-12 -right-4 hidden md:flex items-center z-20"
                    aria-hidden="true"
                  >
                    <ArrowRight size={20} className="text-neutral-300" />
                  </div>
                )}

                <Badge variant="secondary" className="mb-2 relative z-10">
                  Step {i + 1}
                </Badge>
                <h3 className="font-bold text-neutral-900 text-lg mb-1 relative z-10">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-500 relative z-10">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonial / Welcome Quote Section */}
      <section
        className="relative py-20 md:py-28 overflow-hidden bg-neutral-900"
        aria-label="환영 인사"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />
        <Container className="relative z-10">
          <motion.div
            {...animateProps(0)}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Decorative quotation mark */}
            <Quote
              size={64}
              className="text-primary-500/30 mx-auto mb-6"
              aria-hidden="true"
            />

            <blockquote>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300 mb-6">
                &ldquo;여기에서 너희는 하나님의 사랑 안에서 자기를 세우며
                영생에 이르도록 우리 주 예수 그리스도의 긍휼을 기다리라&rdquo;
              </p>
              <footer className="text-neutral-400 text-lg">
                <cite className="not-italic">유다서 1:21</cite>
              </footer>
            </blockquote>

            <div className="mt-8 w-16 h-px bg-gradient-to-r from-primary-400 to-amber-300 mx-auto" />

            <p className="mt-6 text-neutral-400 text-base max-w-lg mx-auto">
              성락교회는 모든 새가족을 가족처럼 환영합니다.
              함께 믿음 안에서 성장하고 사랑을 나누는 공동체가 되길 소망합니다.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Church Tour / Photo Section */}
      <Section background="white" padding="xl" aria-label="교회 둘러보기">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              <Camera size={14} className="mr-1 inline" />
              Tour
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader
              title="교회 둘러보기"
              subtitle="성락교회의 시설을 미리 만나보세요"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {churchFacilities.map((facility, i) => (
            <motion.div
              key={facility.label}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? instantTransition
                  : { delay: i * 0.1, duration: 0.5 }
              }
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              <Image
                src={facility.image}
                alt={facility.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl md:text-2xl font-bold tracking-wide">
                  {facility.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="gray" padding="xl" aria-label="자주 묻는 질문">
        <div className="text-center mb-12">
          <motion.div {...animateProps(0)}>
            <Badge className="mb-4 bg-primary-100 text-primary-600 hover:bg-primary-200">
              FAQ
            </Badge>
          </motion.div>
          <motion.div {...animateProps(0.1)}>
            <SectionHeader
              title="자주 묻는 질문"
              subtitle="새가족분들이 자주 궁금해하시는 내용을 모았습니다"
            />
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? instantTransition
                  : { delay: i * 0.08, duration: 0.4 }
              }
            >
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4"
                  aria-expanded={activeFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-semibold text-neutral-900 text-base md:text-lg">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: activeFaq === i ? 180 : 0 }}
                    transition={
                      shouldReduceMotion
                        ? instantTransition
                        : { duration: 0.3 }
                    }
                    className="shrink-0 text-neutral-400"
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        shouldReduceMotion
                          ? instantTransition
                          : { duration: 0.3, ease: "easeInOut" }
                      }
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                        <div className="w-full h-px bg-neutral-100 mb-4" />
                        <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
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
                      <p className="text-white/60 text-xs mt-1">
                        평일 09:00 ~ 18:00 / 주말 07:00 ~ 14:00
                      </p>
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
                      <Navigation size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">오시는 길</p>
                      <p className="text-white/80 text-sm">
                        지하철 1, 2호선 신도림역 1번 출구 도보 10분
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        교회 건물 내 주차장 이용 가능 (주일 주차 안내 운영)
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

      <Footer basePath="/demo/variant-b" />

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
