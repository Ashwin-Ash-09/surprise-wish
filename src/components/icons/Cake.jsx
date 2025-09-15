import React from 'react';

const Cake = ({ candleOn = true, config }) => {
  return (
    <div className="relative w-48 h-80 sm:w-64 sm:h-64" style={{ filter: `drop-shadow(0 0 10px ${config.cake.detailShadow})` }}>
        {/* Candle Flame */}
        {candleOn && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6 rounded-t-full rounded-b-lg" style={{ animation: 'flame 2s infinite', boxShadow: `0 0 10px ${config.cake.effectBright}, 0 0 20px ${config.cake.effectVibrant}`, backgroundColor: config.cake.candleFlame }}></div>
        )}
        {/* Candle */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-8" style={{ backgroundColor: config.cake.candle }}></div>

        {/* Icing */}
        <div className="absolute top-14 w-full h-8 rounded-lg" style={{ backgroundColor: config.cake.icing }}></div>

        {/* Top Layer */}
        <div className="absolute top-20 w-full h-12 rounded-lg" style={{ backgroundColor: config.cake.layerTop }}></div>

        {/* Middle Layer (Filling) */}
        <div className="absolute top-32 w-full h-4" style={{ backgroundColor: config.cake.filling }}></div>

        {/* Bottom Layer */}
        <div className="absolute top-36 w-full h-12 rounded-lg" style={{ backgroundColor: config.cake.layerBottom }}></div>

        {/* Plate */}
        <div className="absolute top-48 w-full h-8 bg-white rounded-full shadow-lg"></div>

    </div>
  );
};

export default Cake;