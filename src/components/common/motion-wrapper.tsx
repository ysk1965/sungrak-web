"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import {
  fadeInUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  staggerItem,
  transitions,
  reducedMotionVariants,
  reducedMotionStaggerContainer,
  instantTransition,
} from "@/lib/animations";

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// 페이드 인 업 애니메이션
export function FadeInUp({
  children,
  delay = 0,
  className,
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={shouldReduceMotion ? reducedMotionVariants : fadeInUp}
      transition={
        shouldReduceMotion
          ? instantTransition
          : { ...transitions.smooth, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 페이드 인 애니메이션
export function FadeIn({ children, delay = 0, className }: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={shouldReduceMotion ? reducedMotionVariants : fadeIn}
      transition={
        shouldReduceMotion
          ? instantTransition
          : { ...transitions.smooth, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 스케일 인 애니메이션
export function ScaleIn({
  children,
  delay = 0,
  className,
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={shouldReduceMotion ? reducedMotionVariants : scaleIn}
      transition={
        shouldReduceMotion
          ? instantTransition
          : { ...transitions.spring, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 스태거 컨테이너
export function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={
        shouldReduceMotion ? reducedMotionStaggerContainer : staggerContainer
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 스태거 아이템
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionVariants : staggerItem}
      transition={shouldReduceMotion ? instantTransition : transitions.smooth}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 호버 스케일 카드
export function HoverCard({
  children,
  className,
  ...props
}: HTMLMotionProps<"div"> & { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -4 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={shouldReduceMotion ? instantTransition : transitions.spring}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 패럴랙스 섹션
export function ParallaxSection({
  children,
  className,
  offset = 50,
}: MotionWrapperProps & { offset?: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={
        shouldReduceMotion ? { y: 0, opacity: 1 } : { y: offset, opacity: 0 }
      }
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={shouldReduceMotion ? instantTransition : transitions.slow}
      className={className}
    >
      {children}
    </motion.section>
  );
}
