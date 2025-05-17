// components/ui/aceternity/apple-card.tsx
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AppleCardProps {
  card: {
    src: string;
    title: string;
    category: string;
    content: React.ReactNode;
  };
  index: number;
  layout?: boolean;
}

export const AppleCard = ({ card, index, layout = false }: AppleCardProps) => {
  return (
    <motion.div
      layout={layout}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-[500px] w-full max-w-[350px] overflow-hidden rounded-xl bg-white dark:bg-black shadow-lg"
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${card.src})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <span className="text-sm font-semibold text-primary">{card.category}</span>
        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
        <div className="text-sm text-white/80">{card.content}</div>
      </div>
    </motion.div>
  );
};