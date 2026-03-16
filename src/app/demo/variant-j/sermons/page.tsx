"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Play, ArrowRight, Youtube } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { SermonCard } from "@/components/home";
import { initialSermons } from "@/mocks/data/initial";
import { formatDate } from "@/lib/utils";

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

export default function VariantJSermonsPage() {
  const rm = useReducedMotion();

  const featuredSermon = initialSermons[0];
  const remainingSermons = initialSermons.slice(1);

  return (
    <>
      {/* ── Hero Banner ── */}
      <section
        id="main-content"
        aria-label="설교"
        className="relative min-h-[50vh] flex items-center justify-center mt-16 md:mt-20 overflow-hidden"
      >
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
        {/* Dark overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/70 to-stone-950"
        />

        <Container size="xl" className="relative z-10 text-center py-20">
          <motion.p
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            animate="visible"
            className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-4"
          >
            SERMONS
          </motion.p>

          <motion.h1
            variants={makeFadeInUp(30, 0.1, 0.8, rm)}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          >
            설교
          </motion.h1>

          <motion.p
            variants={makeFadeInUp(20, 0.2, 0.6, rm)}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-stone-300 tracking-wide"
          >
            말씀으로 세워지는 믿음
          </motion.p>
        </Container>
      </section>

      {/* ── Featured Sermon ── */}
      <section aria-label="대표 설교" className="bg-stone-950 py-20">
        <Container size="xl">
          <motion.div
            variants={makeFadeInUp(30, 0, 0.8, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Thumbnail with play overlay */}
              <div className="relative group">
                <a
                  href={`https://www.youtube.com/watch?v=${featuredSermon.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${featuredSermon.title} 설교 영상 시청하기`}
                  className="block relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={featuredSermon.thumbnailUrl || "/images/placeholder.jpg"}
                    alt={featuredSermon.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-amber-500/20 backdrop-blur-md flex items-center justify-center border border-amber-400/30 group-hover:bg-amber-500/40 transition-colors">
                      <Play
                        size={36}
                        className="text-white ml-1"
                        fill="white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </a>
              </div>

              {/* Info */}
              <div>
                <p className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3">
                  FEATURED SERMON
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                  {featuredSermon.title}
                </h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-stone-400 text-sm mb-4">
                  <span>{featuredSermon.preacher}</span>
                  <span aria-hidden="true" className="text-stone-600">
                    |
                  </span>
                  <span>{formatDate(featuredSermon.publishedAt)}</span>
                </div>
                {featuredSermon.description && (
                  <p className="text-stone-300 text-lg leading-relaxed mb-8 max-w-xl">
                    {featuredSermon.description}
                  </p>
                )}
                <a
                  href={`https://www.youtube.com/watch?v=${featuredSermon.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${featuredSermon.title} 설교 영상 시청하기`}
                >
                  <Button
                    size="lg"
                    className="group/btn bg-amber-500 text-stone-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20"
                  >
                    <Play size={20} fill="currentColor" aria-hidden="true" />
                    지금 시청하기
                    <ArrowRight
                      size={18}
                      className="ml-1 group-hover/btn:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Sermon Grid ── */}
      <section aria-label="설교 목록" className="bg-stone-900 py-20">
        <Container size="xl">
          <motion.div
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-sm text-amber-400 font-medium tracking-[0.3em] uppercase mb-3">
              ALL SERMONS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              최근 설교
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingSermons.map((sermon, i) => (
              <motion.div
                key={sermon.id}
                variants={makeFadeInUp(30, i * 0.1, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl overflow-hidden"
              >
                <SermonCard sermon={sermon} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA Section ── */}
      <section aria-label="온라인 시청 안내" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950"
        />
        {/* Subtle pattern */}
        <div aria-hidden="true" className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(251,191,36,0.4) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <Container size="xl" className="relative z-10 py-20 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              variants={makeFadeInUp(20, 0, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20"
              aria-hidden="true"
            >
              <Youtube size={28} className="text-amber-400" />
            </motion.div>

            <motion.h2
              variants={makeFadeInUp(20, 0.1, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              언제 어디서나
              <br />
              말씀을 들으세요
            </motion.h2>

            <motion.p
              variants={makeFadeInUp(20, 0.2, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-stone-400 text-lg mb-8 leading-relaxed"
            >
              성락교회 YouTube 채널에서 예배 영상과 설교를
              <br className="hidden sm:block" />
              실시간으로 시청하실 수 있습니다.
            </motion.p>

            <motion.div
              variants={makeFadeInUp(20, 0.3, 0.6, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <a
                href="https://www.youtube.com/@sungrak"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="성락교회 YouTube 채널 방문하기"
              >
                <Button
                  size="lg"
                  className="group bg-amber-500 text-stone-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20 h-14 px-8 text-base"
                >
                  <Youtube size={20} aria-hidden="true" />
                  YouTube 채널 바로가기
                  <ArrowRight
                    size={18}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </a>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
