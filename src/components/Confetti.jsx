import React, { useEffect, useRef } from 'react';

const Confetti = ({ config }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const particles = [];
    const particleCount = 100;
    const random = (min, max) => Math.random() * (max - min) + min;
    const colors = [
        config.confetti.light,
        config.confetti.accentA,
        config.confetti.accentB,
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: random(0, w),
        y: random(-h, 0), // Start at the top or above the screen
        radius: random(0.5, 2.5),
        color: colors[Math.floor(random(0, colors.length))],
        vx: random(-0.5, 0.5), // Gentle horizontal drift
        vy: random(1, 3), // Fast downward velocity
      });
    }

    let animationFrameId;

    const draw = () => {
      if (!context) return;
      context.clearRect(0, 0, w, h);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Reset particle to the top when it falls off the bottom
        if (p.y > h) {
          p.x = random(0, w);
          p.y = random(-20, 0);
        }

        // Wrap around horizontally
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;


        context.beginPath();
        context.fillStyle = p.color;
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const resizeHandler = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      if (canvas) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config.confetti]);

  return (
    <canvas
      data-testid="confetti-canvas"
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default Confetti;
