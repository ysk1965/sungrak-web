"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasePath } from "@/contexts/base-path-context";

interface NewcomerCTAProps {
  variant?: "default" | "minimal";
}

export function NewcomerCTA({ variant = "default" }: NewcomerCTAProps) {
  const basePath = useBasePath();

  if (variant === "minimal") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">처음 오셨나요?</h3>
            <p className="text-white/80 text-sm">성락교회가 환영합니다</p>
          </div>
          <Link href={`${basePath}/newcomer`}>
            <Button
              variant="secondary"
              className="bg-white text-primary-600 hover:bg-white/90"
            >
              새가족 안내
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4"
          >
            <Heart size={32} className="text-white" />
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            처음 오셨나요?
          </h3>
          <p className="text-white/80 text-lg leading-relaxed">
            성락교회는 여러분을 진심으로 환영합니다.
            <br className="hidden md:block" />
            함께 예배하고 성장하는 공동체가 되길 소망합니다.
          </p>
        </div>
        <div className="shrink-0">
          <Link href={`${basePath}/newcomer`}>
            <Button
              size="lg"
              className="bg-white text-primary-600 hover:bg-white/90 shadow-lg"
            >
              새가족 안내 보기
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
