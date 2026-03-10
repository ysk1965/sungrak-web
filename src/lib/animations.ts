import type { Variants } from "framer-motion";

// 페이드 인 업
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// 페이드 인
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// 스케일 인
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// 슬라이드 인 (왼쪽에서)
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

// 슬라이드 인 (오른쪽에서)
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

// 스태거 컨테이너
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// 스태거 아이템
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// 호버 스케일
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 17 },
};

// 뷰포트 진입 애니메이션
export const viewportAnimation = {
  initial: "initial",
  whileInView: "animate",
  viewport: { once: true, margin: "-100px" },
};

// 트랜지션 프리셋
export const transitions = {
  spring: { type: "spring", stiffness: 300, damping: 30 },
  smooth: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  bounce: { type: "spring", stiffness: 400, damping: 10 },
  slow: { duration: 0.8, ease: "easeOut" },
};
