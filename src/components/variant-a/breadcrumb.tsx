"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useBasePath } from "@/contexts/base-path-context";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const basePath = useBasePath();

  const allItems: BreadcrumbItem[] = [
    { label: "홈", href: basePath || "/" },
    ...items,
  ];

  return (
    <nav aria-label="경로 탐색" className="py-4">
      <ol className="flex items-center gap-1 text-sm">
        {allItems.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight
                size={14}
                className="text-neutral-400"
                aria-hidden="true"
              />
            )}
            {item.href && i < allItems.length - 1 ? (
              <Link
                href={item.href}
                className="text-neutral-500 hover:text-primary-500 transition-colors min-h-[44px] flex items-center"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-primary-600 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
