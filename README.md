# Surprise Wish - An Interactive Surprise

An engaging and personalized web application designed to deliver a unique surprise experience. This interactive app features a countdown to the special moment, a multi-stage reveal sequence with animations, a heartfelt message display, and a feedback mechanism to capture the recipient's response.

## Features

- **Personalized Countdown:** Dynamic countdown timer leading up to the birthday moment.
- **Interactive Reveal Sequence:** Step-by-step surprise unveiling including turning on lights, decorating, revealing a cake, and blowing out candles.
- **Heartfelt Message:** Timed narrative messages displayed line-by-line to convey warm wishes.
- **Interactive Elements:** Click or tap to generate floating heart emojis for added engagement.
- **Customizable Content:** Easily configure all text, timings, emojis, colors, and audio via a JSON configuration file.
- **Themed Design:** A visually appealing "Pink Surprise" theme with gradient backgrounds and smooth animations.
- **Sound Effects:** Background music and sound effects to enhance the celebratory atmosphere.

## Technology Stack

- **React:** Frontend UI library for building interactive components.
- **Vite:** Fast build tool and development server.
- **Framer Motion:** Declarative animations for smooth transitions.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **JavaScript (ES6+), HTML5, CSS3**

## Project Structure

- `public/config.json` - A default configuration file that can be used for development.
- `public/manifest.json` - PWA manifest file.
- `public/sw.js` - Service Worker for offline support.
- `src/config.js` - JavaScript configuration with default values.
- `src/App.jsx` - Main React component controlling the app flow.
- `src/constants.js` - Defines page states for navigation.
- `src/components/` - Contains React components for each stage of the birthday wish.
- `index.html` - Main HTML entry point.
- `index.css` - Global styles including Tailwind CSS imports.
- `vite.config.js` - Vite configuration with React and Tailwind plugins.
- `.gitignore` - Specifies files and folders to ignore in Git.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ashwin-Ash-09/surprise-wish.git
   ```
2. Navigate to the project directory:
   ```bash
   cd surprise-wish
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development

To run the application in development mode with hot-reloading, use the following command:

```bash
npm run dev
```

This will start a development server, usually at `http://localhost:5173`. In development mode, the application will use the configuration from `public/config.json` if it exists, otherwise it will fall back to the default configuration in `src/config.js`.

### Production

To build the application for production, use the following command:

```bash
npm run build
```

This will create a `dist` folder with the optimized production-ready files. To preview the production build, you can use the following command:

```bash
npm run preview
```

This will serve the `dist` folder locally.

## Customization

This project is designed to be highly customizable, even after it has been built.

### Production Customization (Recommended)

After you have built the project, you can customize it by editing the `dist/config.json` file directly. This allows you to create multiple variations of the surprise without rebuilding the application each time.

The workflow is as follows:

1.  Build the project once: `npm run build`.
2.  Open the `dist/config.json` file and edit the values to personalize the surprise.
3.  Serve the `dist` directory using a static file server, or deploy it to a web hosting service.

When the application is loaded in a browser, it will fetch the `dist/config.json` file and use its values to configure the surprise. If the `dist/config.json` file is not found, it will fall back to the default configuration from `src/config.js`.

### Configuration Options

The following table lists all the available customization options in the `config.json` file:

| Key                  | Type     | Description                                                                                             | Default Value                                      |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `birthdayPersonName` | `string` | The name of the person you want to surprise.                                                            | `"Your Loved One!"`                                |
| `countdownTarget`    | `string` | The date and time of the surprise in `YYYY-MM-DDTHH:mm:ss` format.                                      | `"2025-12-31T00:00:00"`                            |
| `messages`           | `Array`  | An array of messages to be displayed. Each message is an array of `[text, duration]`.                    | `[["Hello!", 3000], ...]`                           |
| `dialog`             | `Object` | The text for the feedback dialog.                                                                       | `{ question: "...", yesButton: "...", ... }`       |
| `revealPrompts`      | `Object` | The text for the buttons in the reveal sequence.                                                        | `{ turnOnLightButton: "...", ... }`                |
| `blowTexts`          | `Array`  | The text displayed during the candle blowing animation.                                                 | `["Blow in", "3", "2", "1", "Blow!"]`                |
| `finalMessage`       | `Object` | The header and body of the final message after the user gives feedback.                                 | `{ header: "YAY!", body: "..." }`                  |
| `heartEmojis`         | `Array`  | An array of emojis used for the interactive heart effect.                                               | `["💖", "💚", "❤️", ...]`                           |
| `splashEmojis`        | `Array`  | An array of emojis used for the splash effect.                                                          | `["🎉", "✨", "💥", ...]`                           |
| `audio`              | `Object` | The settings for the background music.                                                                  | `{ src: "/sfx/iwbysar.mp3", loop: true, ... }`     |
| `animationTimings`   | `Object` | The duration in milliseconds for various animations and pauses.                                         | `{ pauseAfterLightsOn: 3000, ... }`                |
| `uiText`             | `Object` | Various text strings used throughout the user interface.                                                | `{ loadingMessage: "...", ... }`                   |
| `globalColors`       | `Object` | The color palette of the application. You can change the entire theme by modifying these color values. | `{ mainBackground: "#0A0028", ... }`              |

---

This project provides a delightful and customizable way to create memorable birthday surprises with interactive animations and heartfelt messages. Enjoy personalizing it for your loved ones!
