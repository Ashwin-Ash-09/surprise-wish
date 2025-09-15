import React from 'react';

const LightBulb = ({ color, wireColor, baseColor, animationColor }) => {
  const filterId = `glow-${color.replace('#', '')}`;

  const duration = (Math.random() * 2 + 1).toFixed(2) + 's';
  const delay = (Math.random() * 2).toFixed(2) + 's';

  return (
    <svg
        width="50"
        height="150"
        viewBox="0 20 50 150"
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#${filterId})`}>
        <line x1="25" y1="0" x2="25" y2="60" stroke={wireColor} strokeWidth="2" />

        <rect x="18" y="60" width="14" height="10" fill={baseColor} />

        <path
          d="M18 70 C10 75, 10 90, 25 105 C40 90, 40 75, 32 70 Z"
          fill={color}
        >
         <animate
          attributeName="fill"
          values={`${animationColor};${color};${animationColor}`}
          dur={duration}
          begin={delay}
          repeatCount="indefinite"
        />
        </path>
      </g>
    </svg>
  );
};

export default LightBulb;
