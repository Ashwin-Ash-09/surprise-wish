import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Page } from './constants';
import CountdownPage from './components/CountdownPage';
import RevealPage from './components/RevealPage';
import MessagePage from './components/MessagePage';
import ThankYouPage from './components/ThankYouPage';
import PhotoPage from './components/PhotoPage';

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

const pageComponents = {
  message: MessagePage,
  photo: PhotoPage,
  thankyou: ThankYouPage,
};

const App = ({ initialConfig }) => {
  const [config, setConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(Page.Start);
  const [pageSequenceIndex, setPageSequenceIndex] = useState(0);
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
        setConfig(initialConfig);
      }
    };

    fetchConfig();
  }, [initialConfig]);

  useEffect(() => {
    if (currentPage === 'sequence' && config?.pageSequence?.[pageSequenceIndex] === 'photo') {
      setLightsOn(true);
    }
  }, [currentPage, pageSequenceIndex, config]);

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

  const goToNextPage = useCallback(() => {
    setPageSequenceIndex(prevIndex => prevIndex + 1);
  }, []);

  const renderContent = () => {
    if (currentPage === Page.Start) {
      return <CountdownPage config={config} onComplete={() => setCurrentPage(Page.Surprise)} />;
    }

    if (currentPage === Page.Surprise) {
      return <RevealPage config={config} onComplete={() => setCurrentPage('sequence')} setLightsOn={setLightsOn} />;
    }

    if (currentPage === 'sequence') {
      const pageName = config.pageSequence[pageSequenceIndex];
      if (pageName) {
        const PageComponent = pageComponents[pageName];
        return <PageComponent config={config} onComplete={goToNextPage} lightsOn={lightsOn} />;
      }
      return null;
    }

    return <CountdownPage config={config} onComplete={() => setCurrentPage(Page.Surprise)} />;
  };

  if (!config) {
    return <div>Loading...</div>;
  }

  const lightColors = config.lightBulb;

  return (
    <main
      data-testid="app-container"
      className="relative h-screen w-screen overflow-hidden text-gray-800"
      style={{ backgroundColor: config.globalColors.mainBackground }}
      onPointerDown={handlePointerDown}
    >
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
          className="absolute pointer-events-auto"
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
