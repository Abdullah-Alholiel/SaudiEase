'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashAnimation() {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    // Check if we've shown the splash screen before
    const hasSeenSplash = localStorage.getItem('saudi_ease_splash_seen');
    
    if (hasSeenSplash) {
      setShow(false);
      return;
    }
    
    // Hide splash after 2 seconds
    const timer = setTimeout(() => {
      setShow(false);
      localStorage.setItem('saudi_ease_splash_seen', 'true');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!show) return null;
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div 
              className="w-24 h-24 mx-auto mb-4 rounded-full bg-white flex items-center justify-center"
              animate={{ 
                rotate: [0, 360],
                borderRadius: ["50%", "25%", "50%"] 
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <span className="text-primary font-bold text-2xl">SE</span>
            </motion.div>
            <motion.h1 
              className="text-3xl font-heading font-bold text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Saudi Ease
            </motion.h1>
            <motion.p 
              className="text-white/80 mt-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Your Relocation Partner
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}