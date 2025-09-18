export const defaultConfig = {
  // 🎉 Who's the star today?
  birthdayPersonName: "Birthday Star",

  // ⏳ Surprise countdown
  countdownTarget: "2024-12-31T00:00:00",
  // Date and time of the surprise
  // Format: YYYY-MM-DDTHH:mm:ss
  countdownTarget: "2024-10-09T00:00:00",

  // ✨ Surprise messages
  messages: [
    ["Hey there!", 2500],
    ["", 1200],
    ["Today's not just another day…", 3500],
    ["", 1200],
    ["It's YOUR special day! 🥳", 3500],
    ["", 1200],
    ["Here's to more joy, love, and dreams coming true 💖", 4500],
    ["", 1200],
    ["May your smile shine brighter than ever 🌟", 4000],
    ["", 1200],
    ["Happy Birthday Amazing Person! 🎂🎉", 7000],
  ],

  // 💬 Ending dialog
  dialog: {
    question: "Did this make you smile?",
    yesButton: "Yes! Absolutely 😍",
    noButton: "Not really 😔",
  },

  // 🎬 Sequence of pages
  pageSequence: [
    "message", 
    "photo",
    "thankyou"
  ],

  // 🔑 Reveal prompts
  revealPrompts: {
    turnOnLightButton: "💡 Light it Up!",
    showNameButton: "🎊 Add Some Magic ✨",
    revealCakeButton: "🍰 Bring in the Cake!",
    blowPrompt: "🎂 Hold to Blow the Candles 🎂",
    viewMessageButton: "💌 Open Birthday Wishes 💌",
  },

  // 🎵 Blow animation countdown
  blowTexts: ["3", "2", "1", "✨"],

  // 🎁 Final message
  finalMessage: {
    header: "YAY 🎉",
    body: "So happy you enjoyed this birthday surprise! 💖",
  },

  // ❤️ Emojis
  heartEmojis: ["💖", "💜", "💙", "💚", "🧡", "💕"],
  splashEmojis: ["🎉", "✨", "🌟", "🎊", "🎈", "💫"],

  // 🎶 Background music
  audio: {
    src: "/sfx/iwbysar.mp3",
    loop: true,
    volume: 0.08,
  },

  // ⏱️ Animation timings
  animationTimings: {
    pauseAfterLightsOn: 2500,
    pauseAfterTitleReveal: 2500,
    pauseAfterCakeReveal: 3000,
    pauseAfterBlow: 4500,
    holdToStartMs: 400,
    blowStepInterval: 1200,
  },

  // 🖼️ UI Text
  uiText: {
    loadingMessage: "Loading your surprise gift 🎁…",
    errorMessagePrefix: "Oops! ",
    configLoadError: "Could not load the party setup!",
    countdownTitle: "The Birthday Countdown ⏳",
    countdownCompleteTitle: "Let's Begin 🎉",
    countdownCompleteMessage: "Time to celebrate! 🥳",
    revealTitleTemplate: "Happy Birthday <br /> {{name}}! 🎂",
    finalMessagePrompt: "💫",
  },

  // 🌈 Vibrant Rainbow Color Palette
  globalColors: {
    mainBackground: "#1a0933",       // Deep purple night
    neutralLight: "#ffffff",         // Pure white
    highlightSoft: "#ff6b9d",       // Hot pink
    highlightMedium: "#ff3366",     // Bright red-pink
    highlightStrong: "#ff9500",     // Electric orange
    highlightDeep: "#e91e63",       // Deep pink
    elementDark: "#9c27b0",         // Purple
    elementMedium: "#2196f3",       // Bright blue
    elementNeutral: "#00bcd4",      // Cyan
    effectBright: "#ffeb3b",        // Bright yellow
    effectVibrant: "#4caf50",       // Green
    neutralDark: "#212121",         // Dark gray
    shadowSubtle: "rgba(0, 0, 0, 0.6)", // Strong shadow
  },

  countdownPage: {
    timeBoxBackground: "#212121",
    timeBoxBorder: "#ff3366",
    timeBoxShadow: "#ff9500",
    timeBoxValueGradientFrom: "#ffeb3b",
    timeBoxValueGradientTo: "#e91e63",
    timeBoxLabelText: "#4caf50",
    separatorText: "#2196f3",
    completeMessageText: "#00bcd4",
  },

  messagePage: {
    background: "linear-gradient(135deg, #ff6b9d, #ff3366, #ff9500)",
    text: "#ffffff",
  },

  photoPage: {
    background: "linear-gradient(180deg, #1a0933, #2d1b69, #4a148c)", 
    title: "Beautiful Memories ✨",
    slides: [
      {
        image: "/images/image1.png",
        message: "Every moment is a gift, every smile a treasure. Life is full of wonderful surprises and magical moments that make us who we are. Here's to celebrating the beautiful journey! 🌟",
      },
      {
        image: "/images/image2.png",
        message: "Friendship, laughter, and joy - these are the ingredients that make life extraordinary. May your days be filled with endless happiness and unforgettable adventures! 🎈",
      },
      {
        image: "/images/image3.png",
        message: "Dreams do come true when we believe in ourselves and the magic of possibilities. Keep shining bright and inspiring everyone around you with your amazing spirit! ✨",
      },
    ],
    slideDuration: 8000,
    animationDuration: 1200,
    frameColor: "#ff6b9d", // Hot pink frame
    textColor: "#ffffff",  // White text
    titleColor: "#ffeb3b", // Bright yellow
    frameBorderWidth: "4px",
    frameBoxShadow: "0 8px 20px rgba(255,107,157,0.4)",
    slideBackgroundColor: "rgba(255,255,255,0.1)", // Glass effect
    slidePadding: "p-5 sm:p-7",
    slideBorderRadius: "rounded-xl",
    imageBorderRadius: "rounded-xl",
    imageMaxHeightSmall: "max-h-[28vh]",
    imageMaxHeightMedium: "max-h-[38vh]",
    imageMaxHeightLarge: "max-h-[42vh]",
    titleFontSizes: "text-3xl sm:text-4xl md:text-5xl",
    messageFontSizes: "text-base sm:text-lg md:text-xl",
    titleFontWeight: "font-bold",
    messageFontWeight: "font-normal",
  },

  thankYouPage: {
    headerText: "#ff3366",
    paragraphText: "#ffffff",
    background: "linear-gradient(135deg, #9c27b0, #2196f3, #00bcd4)",
  },

  revealPage: {
    titleText: "#ffeb3b",
    actionButtonBackgroundFrom: "#ff6b9d",
    actionButtonBackgroundTo: "#9c27b0",
    actionButtonText: "#ffffff",
    actionButtonHoverFrom: "#e91e63",
    actionButtonHoverTo: "#673ab7",
  },

  heart: {
    shadowSubtle: "rgba(0, 0, 0, 0.5)",
    duration: 3, // seconds
  },

  // 🎊 Rainbow confetti explosion
  confetti: {
    light: "rgba(255, 255, 255, 0.9)",
    accentA: "rgba(255, 107, 157, 0.9)", // Hot pink
    accentB: "rgba(33, 150, 243, 0.9)",  // Bright blue
    accentC: "rgba(76, 175, 80, 0.9)",   // Green
    accentD: "rgba(255, 235, 59, 0.9)",  // Yellow
    accentE: "rgba(156, 39, 176, 0.9)",  // Purple
    particleCount: 5000,
    life: { min: 120, max: 180 },
    gravity: 0.16,
    friction: 0.95,
    initialVelocityX: { min: -10, max: 10 },
    initialVelocityY: { min: -25, max: -15 },
    radius: { min: 2, max: 5 },
    emissionDuration: 6000,
  },

  candleBlownConfetti: {
    light: "rgba(255, 255, 255, 0.9)",
    accentA: "rgba(255, 51, 102, 0.9)",   // Bright pink
    accentB: "rgba(0, 188, 212, 0.9)",    // Cyan
    accentC: "rgba(255, 149, 0, 0.9)",    // Orange
    accentD: "rgba(76, 175, 80, 0.9)",    // Green
    particleCount: 1000,
    life: { min: 100, max: 140 },
    gravity: 0.12,
    friction: 0.98,
    initialVelocityX: { min: -8, max: 8 },
    initialVelocityY: { min: -18, max: -10 },
    radius: { min: 1, max: 4 },
    emissionDuration: 800,
  },

  // 🎂 Rainbow cake theme
  cake: {
    detailShadow: "rgba(0, 0, 0, 0.3)",
    candleFlame: "#ffeb3b",   // Bright yellow flame
    candle: "#ffffff",        // White candle
    icing: "#ff6b9d",        // Hot pink icing
    layerTop: "#2196f3",     // Blue layer
    filling: "#ffeb3b",      // Yellow filling
    layerBottom: "#4caf50",  // Green layer
    layerMiddle: "#9c27b0",  // Purple layer
    effectBright: "#ff9500", // Orange effect
    effectVibrant: "#e91e63", // Deep pink effect
  },

  splashParticle: {
    white: "#ffffff",
    colors: ["#ff6b9d", "#ff3366", "#ff9500", "#ffeb3b", "#4caf50", "#2196f3", "#9c27b0"],
  },

  // 💡 Rainbow lights
  lightBulb: [
    "#ff6b9d", // Hot pink
    "#4caf50", // Green
    "#2196f3", // Blue
    "#9c27b0", // Purple
    "#ff9500", // Orange
    "#e91e63"  // Deep pink
  ],

  // 🌈 Additional rainbow theme elements
  rainbowGradient: "linear-gradient(90deg, #ff6b9d, #ff9500, #ffeb3b, #4caf50, #2196f3, #9c27b0)",
  
  // 🎨 Theme-specific animations
  animations: {
    rainbowPulse: {
      duration: "2s",
      iteration: "infinite",
      colors: ["#ff6b9d", "#ff9500", "#ffeb3b", "#4caf50", "#2196f3", "#9c27b0"]
    },
    sparkleEffect: {
      colors: ["#ffffff", "#ffeb3b", "#ff6b9d", "#2196f3"],
      size: { min: 2, max: 6 },
      duration: { min: 1000, max: 3000 }
    }
  },
  lightBulb: ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA"],
};
