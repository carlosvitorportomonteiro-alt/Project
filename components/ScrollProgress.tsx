import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Advanced spring physics for a high-end, smooth feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.03] z-[200] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 origin-left relative"
        style={{ scaleX }}
      >
        {/* Subtle glow effect at the leading edge of the progress bar */}
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-r from-transparent to-white/20 blur-sm" />
        <div className="absolute top-0 right-0 h-full w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
      </motion.div>
    </div>
  );
};

export default ScrollProgress;