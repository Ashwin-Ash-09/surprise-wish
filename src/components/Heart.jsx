import React from 'react';
import { motion } from 'framer-motion';

const Heart = ({ emoji, onComplete, config }) => {
  const duration = Math.random() * 1.5 + 1.5;
  const driftX = (Math.random() - 0.5) * 60;
  const rotation = (Math.random() - 0.5) * 40;

  return (
    <motion.div
      className="absolute pointer-events-none text-4xl"
      style={{ textShadow: `0 2px 4px ${config.heart.shadowSubtle}` }}
      initial={{ opacity: 1, scale: 0.2, y: 0, x: 0, rotate: 0 }}
      animate={{ opacity: 0, scale: 1.2, y: -150, x: driftX, rotate: rotation }}
      transition={{ duration, ease: 'easeOut' }}
      onAnimationComplete={onComplete}
    >
      {emoji}
    </motion.div>
  );
};

export default Heart;
