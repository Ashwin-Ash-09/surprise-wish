import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MessagePage = ({ config, onComplete }) => {
  const [index, setIndex] = useState(0);
  const messages = config.messages || [];

  useEffect(() => {
    if (index > messages.length) {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(finalTimer);
    }

    const messageDuration = index < messages.length ? messages[index][1] : 2000;

    const timer = setTimeout(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, messageDuration);

    return () => clearTimeout(timer);
  }, [index, messages, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="relative w-full max-w-lg rounded-lg shadow-2xl shadow-pink-900/20 p-8 sm:p-12 text-center ease-in-out"
        style={{ background: config.messagePage.background }}
        initial={{ opacity: 0, y: "100vh" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-100vh" }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="min-h-[10rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {index < messages.length ? (
              <motion.p
                key={index}
                className="text-2xl sm:text-4xl font-semibold"
                style={{ color: config.messagePage.text }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {messages[index][0]}
              </motion.p>
            ) : (
              <motion.p
                key="final-message"
                className="text-2xl sm:text-4xl font-semibold"
                style={{ color: config.messagePage.text }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {config.uiText.finalMessagePrompt}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default MessagePage;
