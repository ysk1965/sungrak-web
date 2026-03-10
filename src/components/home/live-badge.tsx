"use client";

import { motion } from "framer-motion";
import { Radio } from "lucide-react";

interface LiveBadgeProps {
  className?: string;
}

export function LiveBadge({ className }: LiveBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={className}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500 text-white text-sm font-medium">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Radio size={14} />
        </motion.div>
        LIVE
      </div>
    </motion.div>
  );
}
