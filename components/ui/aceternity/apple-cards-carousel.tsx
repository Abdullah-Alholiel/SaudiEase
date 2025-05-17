// components/ui/aceternity/apple-cards-carousel.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AppleCardsCarouselProps {
  children: React.ReactNode[];
}

export const AppleCardsCarousel: React.FC<AppleCardsCarouselProps> = ({ children }) => {
  return (
    <motion.div
      className="flex gap-4 overflow-x-auto pb-10"
      whileTap={{ cursor: 'grabbing' }}
    >
      {children.map((child, idx) => (
        <motion.div
          key={idx}
          className="min-w-[300px] flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};