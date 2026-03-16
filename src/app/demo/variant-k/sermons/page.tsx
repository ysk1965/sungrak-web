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

export default function VariantKSermonsPage() {
  const rm = useReducedMotion();
  const latestSermon = initialSermons[0];
  const otherSermons = initialSermons.slice(1);

  return (
    <>
      {/* Hero */}
      <section
        id="variant-k-content"
        className="relative min-h-[50vh] mt-16 md:mt-20 overflow-hidden"
        aria-label="설교"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <Container size="lg" className="relative z-10 flex items-center min-h-[calc(50vh-5rem)]">
          <motion.div
            initial={rm ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={rm ? { duration: 0 } : { duration: 0.8 }}
            className="py-20"
          >
            <p className="text-white/70 text-sm font-medium tracking-[0.3em] uppercase mb-4">
              SERMONS
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              말씀
            </h1>
            <p className="text-white/60 text-lg">
              은혜로운 말씀을 통해 삶의 방향을 찾습니다
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Featured Sermon */}
      <section aria-label="최신 설교" className="py-24 bg-white">
        <Container size="lg">
          <motion.div
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
              LATEST
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              최신 설교
            </h2>
          </motion.div>

          <motion.div
            variants={makeFadeInUp(30, 0.1, 0.7, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="group relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 mb-6">
              <Image
                src={latestSermon.thumbnailUrl}
                alt={latestSermon.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg cursor-pointer">
                  <Play size={40} className="text-neutral-900 ml-1" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium mb-3">
                최신 설교
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                {latestSermon.title}
              </h3>
              <p className="text-neutral-500">
                {latestSermon.preacher} &middot; {formatDate(latestSermon.publishedAt)}
              </p>
              <p className="text-neutral-600 mt-4 leading-relaxed">
                {latestSermon.description}
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* All Sermons */}
      <section aria-label="설교 목록" className="py-24 bg-neutral-50">
        <Container size="lg">
          <motion.div
            variants={makeFadeInUp(20, 0, 0.6, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-neutral-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
              ALL SERMONS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              전체 설교
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialSermons.map((sermon, i) => (
              <motion.div
                key={sermon.id}
                variants={makeFadeInUp(20, i * 0.08, 0.5, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video">
                  <Image
                    src={sermon.thumbnailUrl}
                    alt={sermon.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <Play size={24} className="text-neutral-900 ml-0.5" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-neutral-900 mb-1 truncate group-hover:text-neutral-600 transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="text-neutral-500 text-sm">
                    {sermon.preacher} &middot; {formatDate(sermon.publishedAt)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={makeFadeInUp(20, 0.3, 0.5, rm)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a href="#" className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors">
              <Youtube size={20} aria-hidden="true" />
              <span className="font-medium">YouTube에서 더보기</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
