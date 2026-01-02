
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 60, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const transformX = useTransform(smoothX, (v) => v * -0.5);
  const transformY = useTransform(smoothY, (v) => v * -0.5);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.1);
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return <div className="fixed inset-0 bg-[#050505] z-[-1]" />;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#050505]">
      {/* Subtle Grid Line */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Delicate Orbs */}
      <motion.div 
        style={{ x: smoothX, y: smoothY }}
        className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-blue-500/[0.03] blur-[150px] rounded-full"
      />
      <motion.div 
        style={{ x: transformX, y: transformY }}
        className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-indigo-500/[0.02] blur-[120px] rounded-full"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)] opacity-80" />
    </div>
  );
};

export default AnimatedBackground;
