"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDuration } from "@/lib/utils";
import type { Sermon } from "@/types";

interface SermonCardProps {
  sermon: Sermon;
  variant?: "default" | "featured" | "compact";
}

export function SermonCard({ sermon, variant = "default" }: SermonCardProps) {
  if (variant === "featured") {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="group relative overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer"
      >
        <div className="aspect-video relative">
          <Image
            src={sermon.thumbnailUrl || "/images/placeholder.jpg"}
            alt={sermon.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors group-hover:bg-primary-500"
            >
              <Play size={36} className="text-white ml-1" fill="white" />
            </motion.div>
          </div>

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <Badge variant="secondary" className="mb-3">
              {sermon.playlist === "sunday"
                ? "주일설교"
                : sermon.playlist === "wednesday"
                ? "수요예배"
                : "새벽기도"}
            </Badge>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2">
              {sermon.title}
            </h3>
            <p className="text-neutral-300 text-sm">
              {sermon.preacher} · {formatDate(sermon.publishedAt)}
            </p>
          </div>

          {/* Duration */}
          <div className="absolute top-4 right-4 px-2 py-1 rounded bg-black/60 text-white text-xs">
            {formatDuration(sermon.duration)}
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        className="group flex gap-4 cursor-pointer"
      >
        <div className="relative w-32 md:w-40 shrink-0 rounded-lg overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src={sermon.thumbnailUrl || "/images/placeholder.jpg"}
              alt={sermon.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <Play
                size={24}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                fill="white"
              />
            </div>
            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-xs">
              {formatDuration(sermon.duration)}
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0 py-1">
          <h4 className="font-medium text-neutral-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {sermon.title}
          </h4>
          <p className="text-sm text-neutral-500 mt-1">
            {formatDate(sermon.publishedAt)}
          </p>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
    >
      <div className="relative rounded-xl overflow-hidden mb-3">
        <div className="aspect-video relative">
          <Image
            src={sermon.thumbnailUrl || "/images/placeholder.jpg"}
            alt={sermon.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play size={24} className="text-primary-500 ml-1" fill="currentColor" />
            </motion.div>
          </div>
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs">
            {formatDuration(sermon.duration)}
          </div>
        </div>
      </div>
      <h4 className="font-medium text-neutral-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
        {sermon.title}
      </h4>
      <p className="text-sm text-neutral-500 mt-1">
        {sermon.preacher} · {formatDate(sermon.publishedAt)}
      </p>
    </motion.div>
  );
}
