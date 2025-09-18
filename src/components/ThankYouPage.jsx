import React from 'react';

const ThankYouPage = ({ config }) => {
  const thankYouPage = config.thankYouPage;

  return (
    <div
      data-testid="thank-you-page"
      className="min-h-screen flex items-center justify-center p-4 text-center relative"
    >
      <div
        className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-8 sm:p-12 shadow-2xl shadow-pink-900/20"
        style={{ zIndex: 10 }}
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
      </div>
    </div>
  );
};

export default ThankYouPage;
