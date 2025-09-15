import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cake from "./icons/Cake";
import SplashParticles from "./SplashParticles";

const fallingVariants = {
  hidden: { opacity: 0, y: "-100vh" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const popUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const overlayTextVariants = {
  initial: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  hide: { opacity: 0, y: -6, transition: { duration: 0.2 } },
};

const cakeVariants = {
  hidden: { opacity: 0, y: "100vh" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const RevealPage = ({ config, onComplete, setLightsOn }) => {
    const { animationTimings, birthdayPersonName, uiText, blowTexts, revealPrompts, revealPage, globalColors } = config;

  const [step, setStep] = useState("lightButton");
  const [lightOn, setLightOn] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [blowIndex, setBlowIndex] = useState(0);

  const blowIntervalRef = useRef(null);

  const blowStepInterval = animationTimings?.blowStepInterval ?? 1000;

  const titleHTML = uiText.revealTitleTemplate.replace("{{name}}", birthdayPersonName);

  useEffect(() => {
    let timer;
    if (step === "pausingAfterLights") {
      timer = setTimeout(() => setStep("showNameButton"), animationTimings.pauseAfterLightsOn);
    } else if (step === "pausingAfterShowName") {
      timer = setTimeout(() => {
        setStep("title");
        setTitleVisible(true);
      }, animationTimings.pauseAfterTitleReveal);
    } else if (step === "pausingAfterTitle") {
      timer = setTimeout(() => setStep("cakeButton"), animationTimings.pauseAfterCakeReveal);
    } else if (step === "pausingAfterCake") {
      timer = setTimeout(() => setStep("blowButton"), animationTimings.pauseAfterCakeReveal);
    }
    return () => clearTimeout(timer);
  }, [step, animationTimings]);

  useEffect(() => {
    if (step === "candleOffPause") {
      const timer = setTimeout(() => setStep("messageButton"), animationTimings.pauseAfterBlow);
      return () => clearTimeout(timer);
    }
  }, [step, animationTimings.pauseAfterBlow]);

  useEffect(() => {
    return () => {
      clearInterval(blowIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (step === "cake") {
      const timer = setTimeout(() => setStep("pausingAfterCake"), 300);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === "blowButton") {
      setBlowIndex(0);
    }
  }, [step]);

  const completeBlow = () => {
    clearInterval(blowIntervalRef.current);
    blowIntervalRef.current = null;
    setStep("candleOffPause");
  };

  const handleBlowStart = () => {
    if (step !== "blowButton" && step !== "blowing") return;
    if (blowIntervalRef.current) return;

    if (!blowTexts?.length) {
      completeBlow();
      return;
    }

    setStep("blowing");
    blowIntervalRef.current = setInterval(() => {
      setBlowIndex((prev) => {
        const next = prev + 1;
        if (next >= blowTexts.length) {
          completeBlow();
          return prev;
        }
        return next;
      });
    }, blowStepInterval);
  };

  const handleBlowEnd = () => {
    clearInterval(blowIntervalRef.current);
    blowIntervalRef.current = null;
    if (step === "blowing") {
      setStep("blowButton");
    }
  };

  const candleOn = step !== "messageButton" && step !== "candleOffPause";

  // --- Actions ---
  const handleLightOnClick = () => {
    if (config.audio) {
      const audio = new Audio(config.audio.src);
      audio.loop = config.audio.loop;
      audio.volume = config.audio.volume;
      audio.play();
    }
    setLightOn(true);
    setLightsOn(true);
    setStep("pausingAfterLights");
  };

  const handleShowNameClick = () => setStep("pausingAfterShowName");
  const handleRevealCakeClick = () => setStep("cake");

  const showCake =
    step === "cake" ||
    step === "pausingAfterCake" ||
    step === "blowButton" ||
    step === "blowing" ||
    step === "candleOffPause" ||
    step === "messageButton";

  return (
    <div className="relative h-screen w-full p-4 overflow-hidden flex flex-col justify-between">
      {/* Fade overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: lightOn ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: "none" }}
      />

      {/* Main content area: Title, Cake, Blow Text, Buttons */}
      <div className="flex flex-col items-center justify-center flex-grow text-center pt-[6vh]">
        {titleVisible && <SplashParticles emojis={config.splashEmojis} config={config} />}
        <motion.h1
          className="text-5xl md:text-7xl font-pacifico text-center mb-[3vh]"
          style={{
            color: revealPage.titleText,
            textShadow: `0 0 10px var(--color-neutral-light), 0 0 20px var(--color-highlight-soft), 0 0 30px var(--color-highlight-medium)`,
            whiteSpace: "pre-line",
          }}
          variants={fallingVariants}
          initial="hidden"
          animate={titleVisible ? "visible" : "hidden"}
          onAnimationComplete={() => setStep("pausingAfterTitle")}
          dangerouslySetInnerHTML={{ __html: titleHTML }}
        />

        <motion.div
          className="w-full flex items-center justify-center min-h-[200px] cursor-pointer"
          onMouseDown={handleBlowStart}
          onMouseUp={handleBlowEnd}
          onMouseLeave={handleBlowEnd}
          onTouchStart={handleBlowStart}
          onTouchEnd={handleBlowEnd}
          variants={cakeVariants} // Apply the variants
          initial="hidden" // Start from hidden state
          animate={showCake ? "visible" : "hidden"} // Animate to visible when showCake is true
        >
          {showCake && <Cake candleOn={candleOn} config={config} />}
        </motion.div>

        {/* Blow text */}
        <div className="w-full flex items-center justify-center min-h-[64px]">
          <AnimatePresence mode="wait" initial={false}>
            {step === "blowing" && candleOn && (
              <motion.p
                key={`blow-${blowIndex}`}
                className="text-3xl md:text-4xl font-bold text-white text-center"
                style={{ textShadow: `0 0 10px var(--color-neutral-light), 0 0 20px var(--color-highlight-soft)` }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                {blowTexts?.[blowIndex]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="relative flex justify-center space-x-4 mt-4" style={{ height: "60px", minHeight: "60px" }}>
          <AnimatePresence mode="wait">
            {step === "lightButton" && (
              <motion.button
                key="turn-on-light"
                onClick={handleLightOnClick}
                className="px-8 py-3 font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                style={{
                  background: `linear-gradient(to right, ${revealPage.actionButtonBackgroundFrom}, ${revealPage.actionButtonBackgroundTo})`,
                  color: revealPage.actionButtonText,
                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = `linear-gradient(to right, ${revealPage.actionButtonHoverFrom}, ${revealPage.actionButtonHoverTo})`}
                onMouseLeave={(e) => e.currentTarget.style.background = `linear-gradient(to right, ${revealPage.actionButtonBackgroundFrom}, ${revealPage.actionButtonBackgroundTo})`}
                variants={popUpVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                {config.revealPrompts.turnOnLightButton}
              </motion.button>
            )}
            {step === "showNameButton" && (
              <motion.button
                key="show-name"
                onClick={handleShowNameClick}
                className="px-8 py-3 font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                style={{
                  background: `linear-gradient(to right, ${revealPage.actionButtonBackgroundFrom}, ${revealPage.actionButtonBackgroundTo})`,
                  color: revealPage.actionButtonText,
                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = `linear-gradient(to right, ${revealPage.actionButtonHoverFrom}, ${revealPage.actionButtonHoverTo})`}
                onMouseLeave={(e) => e.currentTarget.style.background = `linear-gradient(to right, ${revealPage.actionButtonBackgroundFrom}, ${revealPage.actionButtonBackgroundTo})`}
                variants={popUpVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {config.revealPrompts.showNameButton}
              </motion.button>
            )}
            {step === "cakeButton" && (
              <motion.button
                key="reveal-cake"
                onClick={handleRevealCakeClick}
                className="px-8 py-3 font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                style={{
                  background: `linear-gradient(to right, ${revealPage.actionButtonBackgroundFrom}, ${revealPage.actionButtonBackgroundTo})`,
                  color: revealPage.actionButtonText,
                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = `linear-gradient(to right, ${revealPage.actionButtonHoverFrom}, ${revealPage.actionButtonHoverTo})`}
                onMouseLeave={(e) => e.currentTarget.style.background = `linear-gradient(to right, ${revealPage.actionButtonBackgroundFrom}, ${revealPage.actionButtonBackgroundTo})`}
                variants={popUpVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {config.revealPrompts.revealCakeButton}
              </motion.button>
            )}
            {step === "blowButton" && (
              <motion.p
                key="blow-prompt"
                className="text-2xl font-bold text-white text-center"
                style={{ textShadow: `0 0 10px var(--color-neutral-light), 0 0 20px var(--color-highlight-soft)` }}
                variants={popUpVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {revealPrompts.blowPrompt}
              </motion.p>
            )}
            {step === "messageButton" && (
              <motion.button
                key="view-message"
                onClick={onComplete}
                className="px-8 py-3 font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                style={{
                  background: `linear-gradient(to right, ${revealPage.actionButtonBackgroundFrom}, ${revealPage.actionButtonBackgroundTo})`,
                  color: revealPage.actionButtonText,
                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = `linear-gradient(to right, ${revealPage.actionButtonHoverFrom}, ${revealPage.actionButtonHoverTo})`}
                onMouseLeave={(e) => e.currentTarget.style.background = `linear-gradient(to right, ${revealPage.actionButtonBackgroundFrom}, ${revealPage.actionButtonBackgroundTo})`}
                variants={popUpVariants}
                initial="hidden"
                animate="visible"
              >
                {config.revealPrompts.viewMessageButton}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RevealPage;