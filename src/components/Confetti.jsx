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
    const {
      particleCount,
      life,
      gravity,
      friction,
      initialVelocityX,
      initialVelocityY,
      radius,
      emissionDuration,
    } = config.confetti;

    const random = (min, max) => Math.random() * (max - min) + min;
    const colors = [
      config.confetti.light,
      config.confetti.accentA,
      config.confetti.accentB,
    ];

    let animationFrameId;
    let emissionFrameId;
    const startTime = Date.now();

    const createParticle = () => {
      const isLeft = Math.random() > 0.5;
      const particleLife = random(life.min, life.max);
      return {
        x: isLeft ? random(0, w * 0.1) : random(w * 0.9, w),
        y: random(h * 0.9, h),
        radius: random(radius.min, radius.max),
        color: colors[Math.floor(random(0, colors.length))],
        vx: isLeft
          ? random(initialVelocityX.min, initialVelocityX.max)
          : random(-initialVelocityX.max, -initialVelocityX.min),
        vy: random(initialVelocityY.min, initialVelocityY.max),
        life: particleLife,
        initialLife: particleLife,
      };
    };

    const emitParticles = () => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < emissionDuration) {
        const particlesToCreate = Math.ceil((particleCount * 16) / emissionDuration);
        for (let i = 0; i < particlesToCreate; i++) {
          particles.push(createParticle());
        }
        emissionFrameId = requestAnimationFrame(emitParticles);
      } else {
        cancelAnimationFrame(emissionFrameId);
      }
    };

    const draw = () => {
      if (!context) return;
      context.clearRect(0, 0, w, h);

      particles.forEach((p, index) => {
        if (p.life <= 0) {
          particles.splice(index, 1);
        }
        p.life--;
        p.vy += gravity;
        p.vx *= friction;
        p.x += p.vx;
        p.y += p.vy;

        context.globalAlpha = p.life / p.initialLife;
        context.beginPath();
        context.fillStyle = p.color;
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(draw);
      if (particles.length === 0 && Date.now() - startTime > emissionDuration) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    emitParticles();
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
      cancelAnimationFrame(emissionFrameId);
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
