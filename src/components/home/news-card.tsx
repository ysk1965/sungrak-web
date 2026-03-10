"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatShortDate } from "@/lib/utils";
import type { Notice } from "@/types";

interface NewsCardProps {
  notice: Notice;
}

const categoryLabels = {
  news: "소식",
  event: "행사",
  weekly: "주보",
};

export function NewsCard({ notice }: NewsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group p-5 rounded-xl bg-white border border-neutral-100 hover:border-primary-200 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {categoryLabels[notice.category]}
            </Badge>
            {notice.isPinned && (
              <Badge variant="default" className="text-xs">
                고정
              </Badge>
            )}
          </div>
          <h4 className="font-medium text-neutral-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {notice.title}
          </h4>
          <p className="text-sm text-neutral-500 mt-2">
            {formatShortDate(notice.createdAt)}
          </p>
        </div>
        <ArrowRight
          size={20}
          className="text-neutral-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all shrink-0 mt-1"
        />
      </div>
    </motion.div>
  );
}
