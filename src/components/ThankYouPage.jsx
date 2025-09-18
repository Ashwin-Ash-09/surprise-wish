import React from 'react';
import { motion } from 'framer-motion';

const ThankYouPage = ({ config }) => {
  const thankYouPage = config.thankYouPage;

  return (
    <div
      data-testid="thank-you-page"
      className="min-h-screen flex items-center justify-center p-4 text-center relative"
    >
      <motion.div
        className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-8 sm:p-12 shadow-2xl shadow-pink-900/20"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2
          className="text-5xl sm:text-7xl font-pacifico animate-glow"
          style={{ color: thankYouPage.headerText }}
        >
          {config.finalMessage.header}
        </h2>
        <p className="mt-4 text-lg sm:text-xl" style={{ color: thankYouPage.paragraphText }}>
          {config.finalMessage.body}
        </p>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
