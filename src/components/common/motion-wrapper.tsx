"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import {
  fadeInUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  staggerItem,
  transitions,
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
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      transition={{ ...transitions.smooth, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 페이드 인 애니메이션
export function FadeIn({ children, delay = 0, className }: MotionWrapperProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ ...transitions.smooth, delay }}
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
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={scaleIn}
      transition={{ ...transitions.spring, delay }}
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
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
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
  return (
    <motion.div
      variants={staggerItem}
      transition={transitions.smooth}
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
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={transitions.spring}
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
  return (
    <motion.section
      initial={{ y: offset, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={transitions.slow}
      className={className}
    >
      {children}
    </motion.section>
  );
}
