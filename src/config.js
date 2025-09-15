export const defaultConfig = {
  // Name of the person you want to surprise
  birthdayPersonName: "Your Loved One!",

  // Date and time of the surprise
  // Format: YYYY-MM-DDTHH:mm:ss
  countdownTarget: "2025-12-31T00:00:00",

  // Messages to be displayed
  messages: [
    ["Hello!", 3000],
    ["", 1200],
    ["I have a little surprise for you.", 4000],
    ["", 1200],
    ["I hope you like it.", 3000],
    ["", 1200],
    ["Wishing you the best on your special day.", 5000],
    ["", 1200],
    ["May all your dreams come true.", 4000],
    ["", 1200],
    ["Happy Birthday!", 6000],
  ],

  // Dialog settings
  dialog: {
    question: "Did you like the surprise?",
    yesButton: "Yes! Loved it! 😊",
    noButton: "No 😔",
  },

  // Page settings
  showSurprisePage: false,

  // Reveal prompts
  revealPrompts: {
    turnOnLightButton: "💡💡Turn on the Light!💡💡",
    showNameButton: "🎉🎉 Decorate a Little Bit 🎉🎉",
    revealCakeButton: "🍰🎂 Get a Tasty Cake 🍰🎂",
    blowPrompt: "🎂 Tap and Hold Cake to Blow Candle 🎂",
    viewMessageButton: "📫📫 View Message 💌💌",
  },

  // Blowing animation texts
  blowTexts: ["Blow in", "3", "2", "1", "Blow!"],

  // Final message after the surprise
  finalMessage: {
    header: "YAY!",
    body: "So glad you enjoyed your birthday surprise!",
  },

  // Emojis used in the surprise
  heartEmojis: ["💖", "💚", "❤️", "💜", "💗", "💕"],
  splashEmojis: ["🎉", "✨", "💥", "🎊", "🌟", "💫", "🎈", "🎆"],

  // Audio settings
  audio: {
    src: "/sfx/iwbysar.mp3",
    loop: true,
    volume: 0.065,
  },

  // Animation timings
  animationTimings: {
    pauseAfterLightsOn: 3000,
    pauseAfterTitleReveal: 3000,
    pauseAfterCakeReveal: 3000,
    pauseAfterBlow: 3000,
    holdToStartMs: 300,
    blowStepInterval: 1500,
  },

  // UI text
  uiText: {
    loadingMessage: "Loading Surprise…",
    errorMessagePrefix: "Error: ",
    configLoadError: "Could not load configuration.",
    countdownTitle: "The Surprise Begins In…",
    countdownCompleteTitle: "Get Ready!",
    countdownCompleteMessage: "Starting the celebration…",
    revealTitleTemplate: "Happy Birthday <br /> {{name}}!",
    finalMessagePrompt: " ",
  },

  // Color palette
  globalColors: {
    mainBackground: "#0A0028",
    neutralLight: "#F5F3FF",
    highlightSoft: "#C084FC",
    highlightMedium: "#F472B6",
    highlightStrong: "#FB923C",
    highlightDeep: "#E11D48",
    elementDark: "#FDE68A",
    elementMedium: "#F9A8D4",
    elementNeutral: "#93C5FD",
    effectBright: "#F87171",
    effectVibrant: "#22D3EE",
    neutralDark: "#1E003B",
    shadowSubtle: "rgba(0, 0, 0, 0.45)",
  },

  countdownPage: {
    timeBoxBackground: "#1E003B",
    timeBoxBorder: "#F472B6",
    timeBoxShadow: "#9333EA",
    timeBoxValueGradientFrom: "#FBBF24",
    timeBoxValueGradientTo: "#F97316",
    timeBoxLabelText: "#F9A8D4",
    separatorText: "#60A5FA",
    completeMessageText: "#34D399",
  },

  messagePage: {
    background: "#312E81",
    text: "#F5F3FF",
  },

  feedbackPage: {
    headerText: "#F5F3FF",
    paragraphText: "#E0E7FF",
    questionText: "#F9A8D4",
    yesButtonBackgroundFrom: "#34D399",
    yesButtonBackgroundTo: "#10B981",
    yesButtonText: "#FFFFFF",
    noButtonBackground: "#F87171",
    noButtonText: "#FFFFFF",
  },

  revealPage: {
    titleText: "#FFFFFF",
    actionButtonBackgroundFrom: "#60A5FA",
    actionButtonBackgroundTo: "#3B82F6",
    actionButtonText: "#FFFFFF",
    actionButtonHoverFrom: "#2563EB",
    actionButtonHoverTo: "#1D4ED8",
  },

  heart: {
    shadowSubtle: "rgba(0, 0, 0, 0.4)",
  },

  confetti: {
    light: "rgba(255, 255, 255, 0.9)",
    accentA: "rgba(244, 114, 182, 0.8)",
    accentB: "rgba(96, 165, 250, 0.75)",
  },

  cake: {
    detailShadow: "rgba(0, 0, 0, 0.3)",
    candleFlame: "#FACC15",
    candle: "#FFFFFF",
    icing: "#F472B6",
    layerTop: "#60A5FA",
    filling: "FBBF24",
    layerBottom: "#34D399",
    effectBright: "#FB923C",
    effectVibrant: "#E11D48",
  },

  splashParticle: {
    white: "#FFFFFF",
  },

  lightBulb: ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA"],
};