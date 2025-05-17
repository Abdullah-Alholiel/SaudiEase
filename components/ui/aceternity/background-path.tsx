'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BackgroundPathProps {
  text: string;
  className?: string;
}

export function BackgroundPath({ text, className }: BackgroundPathProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        "relative text-lg md:text-xl text-muted-foreground",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:via-primary/10 before:to-transparent before:rounded-lg before:transform before:translate-y-1/2 before:opacity-50",
        className
      )}
    >
      {text}
    </motion.p>
  );
}