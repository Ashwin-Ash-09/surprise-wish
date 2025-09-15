import React, { useRef, useEffect } from 'react';

const SplashParticles = ({ emojis, config }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = 30;
    const gravity = 0.5;
    const splashParticleDelay = 1000;

    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 15 + 5;
        particlesRef.current.push({
          x: canvas.width / 2,
          y: 0,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          size: Math.random() * 4 + 2,
          delay: Math.random() * splashParticleDelay,
        });
      }
    };

    const updateParticles = () => {
      const now = Date.now();
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i];
        if (!particle.startTime) {
          particle.startTime = now + particle.delay;
        }
        if (now < particle.startTime) {
          // Not started yet, skip update
          continue;
        }
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += gravity;
        particle.life -= 0.01;
        if (particle.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle) => {
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = config.splashParticle.white;
        ctx.font = `${particle.size * 6}px Arial`;
        ctx.fillText(particle.emoji, particle.x, particle.y);
      });
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      if (particlesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    createParticles();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [emojis, config.splashParticle.white]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 5,
        marginTop: '-20px',
      }}
    />
  );
};

export default SplashParticles;
