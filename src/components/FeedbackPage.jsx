import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const FeedbackPage = ({ config }) => {
  const [showThanks, setShowThanks] = useState(false);
  const [isFleeing, setIsFleeing] = useState(false);
  const noButtonRef = useRef(null);
  const containerRef = useRef(null);
  const controls = useAnimation();

  const feedbackPage = config.feedbackPage;

  const handleNoHover = async () => {
    if (!isFleeing) {
      setIsFleeing(true);
    }

    const container = containerRef.current;
    const button = noButtonRef.current;
    if (!container || !button) return;

    await controls.start({
      rotate: [0, -15, 15, -15, 15, 0],
      transition: { duration: 0.4, ease: 'easeInOut' },
    });

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    controls.start({
      left: newX,
      top: newY,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    });
  };

  if (showThanks) {
    return (
      <div data-testid="feedback-page" className="min-h-screen flex items-center justify-center p-4 text-center relative">
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-8 sm:p-12 shadow-2xl shadow-pink-900/20" style={{ zIndex: 10 }}>
          <h2 className="text-5xl sm:text-7xl font-pacifico animate-glow" style={{ color: feedbackPage.headerText }}>{config.finalMessage.header}</h2>
          <p className="mt-4 text-lg sm:text-xl" style={{ color: feedbackPage.paragraphText }}>{config.finalMessage.body}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div
        ref={containerRef}
        className="relative w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-2xl shadow-pink-900/20 text-center"
        style={{ zIndex: 10 }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: feedbackPage.questionText }}>{config.dialog.question}</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setShowThanks(true)}
            className="px-8 py-3 font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-fuchsia-700 transform hover:scale-105 transition-all duration-300"
            style={{
              background: `linear-gradient(to right, ${feedbackPage.yesButtonBackgroundFrom}, ${feedbackPage.yesButtonBackgroundTo})`,
              color: feedbackPage.yesButtonText
            }}
          >
            {config.dialog.yesButton}
          </button>
          <motion.button
            ref={noButtonRef}
            animate={controls}
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
            className="px-8 py-3 font-bold rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-300"
            style={{ position: isFleeing ? 'absolute' : 'relative', backgroundColor: feedbackPage.noButtonBackground, color: feedbackPage.noButtonText }}
          >
            {config.dialog.noButton}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
