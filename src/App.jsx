import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Page } from './constants';
import CountdownPage from './components/CountdownPage';
import RevealPage from './components/RevealPage';
import MessagePage from './components/MessagePage';
import FeedbackPage from './components/FeedbackPage';
import ParticleBackground from './components/Confetti';
import Heart from './components/Heart';
import LightBulb from './components/icons/LightBulb';

const lightItemVariants = {
  hidden: { opacity: 0, y: -200, rotate: 0 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: [0, 5, -5, 5, -5, 0],
    transition: {
      y: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8,
      },
      rotate: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 4,
        ease: "easeInOut",
      }
    }
  },
};

const App = ({ initialConfig }) => {
  const [config, setConfig] = useState(null);
  const [page, setPage] = useState(Page.Start);
  const [hearts, setHearts] = useState([]);
  const [lightsOn, setLightsOn] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/config.json');
        if (response.ok) {
          const externalConfig = await response.json();
          setConfig({ ...initialConfig, ...externalConfig });
        } else {
          setConfig(initialConfig);
        }
      } catch (error) {
        console.error('Could not load external config.json, using default config:', error);
        setConfig(initialConfig);
      }
    };

    fetchConfig();
  }, [initialConfig]);

  const handlePointerDown = useCallback((e) => {
    if (!config?.heartEmojis || config.heartEmojis.length === 0) return;

    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      emoji: config.heartEmojis[Math.floor(Math.random() * config.heartEmojis.length)],
    };

    setHearts(prevHearts => [...prevHearts, newHeart]);
  }, [config]);

  const removeHeart = useCallback((id) => {
    setHearts(prevHearts => prevHearts.filter(h => h.id !== id));
  }, []);

  const renderContent = () => {
    switch (page) {
      case Page.Start:
        return <CountdownPage config={config} onComplete={() => setPage(Page.Surprise)} />;
      case Page.Surprise:
        return <RevealPage config={config} onComplete={() => setPage(Page.Message)} setLightsOn={setLightsOn} />;
      case Page.Message:
        return <MessagePage config={config} onComplete={() => setPage(Page.Feedback)} lightsOn={lightsOn} />;
      case Page.Feedback:
        return <FeedbackPage config={config} lightsOn={lightsOn} />;
      default:
        return <CountdownPage config={config} onComplete={() => setPage(Page.Surprise)} />;
    }
  };

  if (!config) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }

  const lightColors = config.lightBulb;

  return (
    <main
      data-testid="app-container"
      className="relative h-screen w-full overflow-hidden text-gray-800"
      style={{ backgroundColor: config.globalColors.mainBackground }}
      onPointerDown={handlePointerDown}
    >
      <ParticleBackground config={config} />
      <motion.div
        className="absolute p-0 pl-[30px] m-[-20px] flex flex-row align-center justify-between items-center w-full"
        initial="hidden"
        animate={lightsOn ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 150 / 1000,
            }
          }
        }}
        style={{ willChange: 'opacity', zIndex: 5 }}
      >
        {lightColors.map((color, index) => (
          <motion.div key={index} variants={lightItemVariants} style={{ transformOrigin: "top center" }}>
            <LightBulb
              color={color}
              wireColor={config.globalColors.elementDark}
              baseColor={config.globalColors.elementMedium}
              animationColor={config.globalColors.elementNeutral}
            />
          </motion.div>
        ))}
      </motion.div>
      {hearts.map(({ id, x, y, emoji }) => (
        <div
          key={id}
          className="absolute pointer-events-none"
          style={{ top: y, left: x, transform: 'translate(-50%, -50%)', zIndex: 1000 }}
        >
          <Heart emoji={emoji} onComplete={() => removeHeart(id)} config={config} />
        </div>
      ))}
      <div className="relative z-10">
        {renderContent()}
      </div>
    </main>
  );
};

export default App;
