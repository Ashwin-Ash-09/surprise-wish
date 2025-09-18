import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';


const SWIPE_THRESHOLD_PX = 40;
const LONG_PRESS_THRESHOLD = 500;

const PhotoPage = ({ config, onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const shouldReduceMotion = useReducedMotion();

  const {
    slides,
    slideDuration,
    animationDuration,
    title,
    background,
    frameColor,
    textColor,
    titleColor,
    frameBorderWidth,
    frameBoxShadow,
    slideBackgroundColor,
    slidePadding,
    slideBorderRadius,
    imageBorderRadius,
    imageMaxHeightSmall,
    imageMaxHeightMedium,
    imageMaxHeightLarge,
    titleFontSizes,
    messageFontSizes,
    titleFontWeight,
    messageFontWeight,
  } = config.photoPage;

  const totalSlides = Array.isArray(slides) ? slides.length : 0;

  useEffect(() => {
    const preload = (idx) => {
      const s = slides?.[idx];
      if (s?.image) {
        const img = new Image();
        img.src = s.image;
      }
    };
    if (totalSlides > 0) {
      preload(currentSlide + 1);
      preload(currentSlide - 1);
    }
  }, [currentSlide, slides, totalSlides]);

  useEffect(() => {
    if (isPaused || completed || totalSlides === 0) return;
    const isLast = currentSlide === totalSlides - 1;
    const t = setTimeout(() => {
      if (isLast) {
        setCompleted(true);
        onComplete && onComplete();
      } else {
        setCurrentSlide((s) => s + 1);
        setDirection(1);
      }
    }, slideDuration);
    return () => clearTimeout(t);
  }, [isPaused, completed, currentSlide, totalSlides, slideDuration, onComplete]);

  useEffect(() => {
    const handleBlur = () => setIsPaused(true);
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPaused((p) => !p);
      } else if (e.key === 'ArrowRight') {
        setIsPaused(true);
        setDirection(1);
        setCompleted(false);
        setCurrentSlide((s) => Math.min(s + 1, Math.max(totalSlides - 1, 0)));
        if (currentSlide + 1 >= totalSlides) {
          if (!completed) {
            setCompleted(true);
            onComplete && onComplete();
          }
        }
      } else if (e.key === 'ArrowLeft') {
        setIsPaused(true);
        setDirection(-1);
        setCompleted(false);
        setCurrentSlide((s) => Math.max(s - 1, 0));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSlides, currentSlide, completed, onComplete]);

  const touchStart = useRef({ x: 0, y: 0 });
  const touchTimer = useRef(null);

  const handleTouchStart = (e) => {
    const t = e.touches?.[0];
    if (!t) return;

    // Prevent pause on text and photos
    if (e.target.tagName === 'IMG' || e.target.tagName === 'P') return;

    touchStart.current = { x: t.clientX, y: t.clientY };

    // Start long press timer to toggle pause
    touchTimer.current = setTimeout(() => {
      setIsPaused((p) => !p);
    }, LONG_PRESS_THRESHOLD);
  };

  const handleTouchEnd = (e) => {
    if (touchTimer.current) {
      clearTimeout(touchTimer.current);
      touchTimer.current = null;
    }

    const t = e.changedTouches?.[0];
    if (!t) return;
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD_PX) {
      if (dx < 0) {
        setIsPaused(true);
        setDirection(1);
        setCompleted(false);
        if (currentSlide >= totalSlides - 1) {
          if (!completed) {
            setCompleted(true);
            onComplete && onComplete();
          }
        } else {
          setCurrentSlide((s) => s + 1);
        }
      } else {
        setIsPaused(true);
        setDirection(-1);
        setCompleted(false);
        setCurrentSlide((s) => Math.max(s - 1, 0));
      }
    }
  };

  const slideVariants = shouldReduceMotion
    ? {
        enter: { opacity: 0 },
        center: {
          opacity: 1,
          transition: { duration: animationDuration / 1000, ease: 'easeOut' },
        },
        exit: {
          opacity: 0,
          transition: { duration: animationDuration / 1000, ease: 'easeIn' },
        },
      }
    : {
        enter: (dir) => ({
          opacity: 0,
          x: dir > 0 ? 300 : -300,
          scale: 1,
          transition: { duration: animationDuration / 1000, ease: 'easeOut' },
        }),
        center: {
          opacity: 1,
          x: 0,
          scale: 1,
          transition: { duration: animationDuration / 1000, ease: 'easeOut' },
        },
        exit: (dir) => ({
          opacity: 0,
          x: dir > 0 ? -300 : 300,
          scale: 1,
          transition: { duration: animationDuration / 1000, ease: 'easeIn' },
        }),
      };

  const handlePrev = useCallback(() => {
    setIsPaused(true);
    setDirection(-1);
    setCompleted(false);
    setCurrentSlide((s) => Math.max(s - 1, 0));
  }, []);

  const handleNext = useCallback(() => {
    setIsPaused(true);
    setDirection(1);
    setCompleted(false);
    setCurrentSlide((s) => {
      if (s + 1 >= totalSlides) {
        // end reached, complete once
        setCompleted(true);
        onComplete && onComplete();
        return s;
      }
      return s + 1;
    });
  }, [totalSlides, onComplete]);



  const activeIndex = Math.min(currentSlide, Math.max(totalSlides - 1, 0));
  const slide = totalSlides > 0 ? slides[activeIndex] : null;
  const altText =
    (slide && (slide.alt || slide.message || `Slide ${activeIndex + 1}`)) ||
    `Slide ${activeIndex + 1}`;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative"
      style={{ backgroundColor: background }}
      role="region"
      aria-label="Photo slideshow"
    >
      <h1
        className={`${titleFontSizes} ${titleFontWeight} mb-8 text-center relative z-10`}
        style={{ color: titleColor }}
      >
        {title}
      </h1>

      <div
        className="relative w-full max-w-lg mx-auto flex items-center justify-center min-h-[60vh] rounded-lg p-8 sm:p-12 z-10"
        style={{
          touchAction: 'pan-y',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          {totalSlides > 0 && !completed && (
            <motion.div
              key={activeIndex}
              className="absolute w-full h-full flex items-center justify-center"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
            >
              <div
                className={`${slidePadding} ${slideBorderRadius} flex flex-col items-center`}
                style={{ backgroundColor: slideBackgroundColor }}
              >
                <div
                  className="relative w-full max-w-sm sm:max-w-md mb-4 flex-shrink-0"
                  style={{
                    border: `${frameBorderWidth} solid ${frameColor}`,
                    boxShadow: frameBoxShadow,
                  }}
                >
                  <img
                    src={slide.image}
                    alt={altText}
                    className={`w-full ${imageMaxHeightSmall} sm:${imageMaxHeightMedium} md:${imageMaxHeightLarge} object-contain ${imageBorderRadius}`}
                    loading={activeIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <p
                  className={`${messageFontSizes} ${messageFontWeight} text-center mt-4 leading-relaxed`}
                  style={{ color: textColor }}
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {slide.message}
                </p>
              </div>
            </motion.div>
          )}
          {totalSlides === 0 && (
            <motion.div
              key="empty"
              className="absolute w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-center text-white/80">No slides available</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed bottom controls bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-50"
        style={{
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
        }}
        aria-hidden={totalSlides === 0}
      >
        <div className="mx-auto max-w-4xl px-4">
          {/* Progress line */}
          <motion.div
            key={`${activeIndex}-${isPaused}-${completed}`}
            className="h-1 w-full bg-white/20 rounded-t"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-white/60"
              initial={{ width: 0 }}
              animate={{
                width:
                  isPaused || completed || activeIndex >= totalSlides ? 0 : '100%',
              }}
              transition={{ duration: slideDuration / 1000, ease: 'linear' }}
            />
          </motion.div>

          <div className="mt-2 flex items-center justify-between rounded-t-lg bg-black/30 backdrop-blur-md px-3 py-2">
            <div></div>
            <div className="text-center">
              <div className="text-white/90 text-sm">{Math.min(activeIndex + 1, totalSlides)} / {totalSlides}</div>
              <div className="text-white/70 text-xs">Swipe to next and previous</div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      {/* End fixed controls */}
    </div>
  );
};

export default PhotoPage;
