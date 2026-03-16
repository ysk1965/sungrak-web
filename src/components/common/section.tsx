"use client";

import { cn } from "@/lib/utils";
import { type ReactNode, useId } from "react";
import { Container } from "./container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  background?: "white" | "gray" | "primary";
  padding?: "sm" | "md" | "lg" | "xl";
  /** 섹션의 접근 가능한 레이블 (aria-label). aria-labelledby와 함께 사용하지 않을 때 지정합니다. */
  "aria-label"?: string;
  /** 섹션 제목 요소의 id를 지정하여 섹션과 제목을 연결합니다 (aria-labelledby). */
  "aria-labelledby"?: string;
}

const backgroundClasses = {
  white: "bg-white",
  gray: "bg-neutral-50",
  primary: "bg-primary-50",
};

const paddingClasses = {
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
};

export function Section({
  children,
  className,
  containerSize = "xl",
  background = "white",
  padding = "lg",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: SectionProps) {
  return (
    <section
      className={cn(
        backgroundClasses[background],
        paddingClasses[padding],
        className,
      )}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

// 섹션 제목
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /**
   * 제목 요소의 id. Section 컴포넌트의 aria-labelledby와 연동할 때 사용합니다.
   * 미지정 시 React의 useId()로 자동 생성됩니다.
   */
  id?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
  id: idProp,
}: SectionHeaderProps) {
  const generatedId = useId();
  const headingId =
    idProp ?? `section-heading-${generatedId.replace(/:/g, "")}`;

  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        className,
      )}
    >
      <h2
        id={headingId}
        className="text-3xl font-bold text-neutral-900 md:text-4xl"
      >
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-lg text-neutral-600">{subtitle}</p>}
    </div>
  );
}
