import React, { useState, useEffect, useCallback } from 'react';

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const TimeBox = ({ value, label, colors }) => {
  const timeBoxBg = hexToRgba(colors.timeBoxBackground, 0.3);
  const timeBoxBorder = hexToRgba(colors.timeBoxBorder, 0.5);
  const timeBoxShadow = hexToRgba(colors.timeBoxShadow, 0.1);
  const timeBoxLabelColor = hexToRgba(colors.timeBoxLabelText, 0.8);

  return (
    <div
      className="flex flex-col items-center justify-center backdrop-blur-md rounded-2xl p-3 sm:p-6 w-20 h-20 sm:w-32 sm:h-32 transition-transform duration-300 hover:scale-105"
      style={{
        backgroundColor: timeBoxBg,
        border: `1px solid ${timeBoxBorder}`,
        boxShadow: `0 0 10px ${timeBoxShadow}`,
      }}
    >
      <span
        className="text-2xl sm:text-5xl font-bold text-transparent bg-clip-text"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${colors.timeBoxValueGradientFrom}, ${colors.timeBoxValueGradientTo})`,
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs sm:text-base uppercase tracking-widest mt-1" style={{ color: timeBoxLabelColor }}>{label}</span>
    </div>
  );
};

const CountdownPage = ({ config, onComplete }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(config.countdownTarget) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [config.countdownTarget]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (Object.keys(newTimeLeft).length === 0) {
        onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, onComplete]);

  const timerUnits = ['days', 'hours', 'minutes', 'seconds'];
  const activeUnits = timerUnits.filter(unit => unit === 'seconds' || timeLeft[unit] > 0);
  const hasTimeLeft = Object.keys(timeLeft).length > 0;

  const { countdownPage, globalColors } = config;

  return (
    <div data-testid="countdown-page" className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-8">
       <h1 className="text-5xl sm:text-7xl font-pacifico text-white" style={{ textShadow: `0 0 10px var(--color-neutral-light), 0 0 20px var(--color-highlight-soft), 0 0 30px var(--color-highlight-medium), 0 0 40px var(--color-highlight-medium)` }}>
        {hasTimeLeft ? config.uiText.countdownTitle : config.uiText.countdownCompleteTitle}
      </h1>
      <p className=" font-pacifico text-white" style={{ textShadow: `0 0 10px var(--color-neutral-light), 0 0 10px var(--color-highlight-soft), 0 0 10px var(--color-highlight-medium), 0 0 10px var(--color-highlight-medium)` }}>Touch anywhere </p>
      {hasTimeLeft ? (
        <div className="flex items-center justify-center gap-1 sm:gap-4">
          {activeUnits.map((unit, index) => (
            <React.Fragment key={unit}>
              <TimeBox value={timeLeft[unit] ?? 0} label={unit} colors={countdownPage} />
              {index < activeUnits.length - 1 && (
                <span className="text-2xl sm:text-5xl font-light pb-4 sm:pb-10" style={{ color: hexToRgba(countdownPage.separatorText, 0.8) }}>:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p className="text-xl animate-pulse" style={{ color: countdownPage.completeMessageText }}>{config.uiText.countdownCompleteMessage}</p>
      )}
    </div>
  );
};

export default CountdownPage;
