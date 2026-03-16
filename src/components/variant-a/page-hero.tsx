"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  backgroundAlt: string;
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  backgroundAlt,
}: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  const reducedTransition = { duration: 0 };

  return (
    <section
      ref={heroRef}
      className="relative h-[50vh] min-h-[400px] overflow-hidden"
      aria-label={`${title} 페이지 헤더`}
    >
      {/* Background with Parallax */}
      <motion.div
        style={shouldReduceMotion ? undefined : { scale }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Gold radial pattern overlay */}
      <div className="absolute inset-0 z-10 opacity-20" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_50%)]" />
      </div>

      {/* Content */}
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity, y: textY }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? reducedTransition
              : { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
          }
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? reducedTransition
                : { duration: 0.6, delay: 0.4 }
            }
            className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
