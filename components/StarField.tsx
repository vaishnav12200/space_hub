'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  twinklePhase: number;
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const createStars = () => {
      const stars: Star[] = [];
      const numStars = 200;
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 0.5,
          color: ['#ffffff', '#1dd1f2', '#8a2be2', '#ffd700'][Math.floor(Math.random() * 4)],
          twinklePhase: Math.random() * Math.PI * 2
        });
      }
      
      starsRef.current = stars;
    };

    createStars();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      starsRef.current.forEach(star => {
        // Move stars
        star.z -= 2;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        // Calculate perspective
        const x = (star.x - canvas.width / 2) * (1000 / star.z) + canvas.width / 2;
        const y = (star.y - canvas.height / 2) * (1000 / star.z) + canvas.height / 2;
        const size = (1 - star.z / 1000) * star.size;

        // Twinkling effect
        star.twinklePhase += 0.05;
        const alpha = (Math.sin(star.twinklePhase) + 1) * 0.5 * 0.8 + 0.2;

        // Draw star
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height && size > 0) {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default StarField;