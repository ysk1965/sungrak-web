import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { Container } from "./container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  background?: "white" | "gray" | "primary";
  padding?: "sm" | "md" | "lg" | "xl";
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
}: SectionProps) {
  return (
    <section
      className={cn(
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
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
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-neutral-600">{subtitle}</p>
      )}
    </div>
  );
}
