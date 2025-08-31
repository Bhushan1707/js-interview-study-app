import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = ({ variant = 'particles' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles = [];
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: `hsl(${220 + Math.random() * 40}, 70%, 60%)`
        });
      }
      return particles;
    };

    const createWaves = () => {
      const waves = [];
      for (let i = 0; i < 3; i++) {
        waves.push({
          amplitude: 50 + Math.random() * 30,
          frequency: 0.01 + Math.random() * 0.005,
          phase: Math.random() * Math.PI * 2,
          speed: 0.02 + Math.random() * 0.01,
          y: canvas.height * (0.3 + i * 0.2),
          opacity: 0.1 + Math.random() * 0.1,
          color: `hsl(${200 + i * 20}, 70%, 60%)`
        });
      }
      return waves;
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Draw connections
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 100) * 0.2;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
      
      animationId = requestAnimationFrame(animateParticles);
    };

    const animateWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(wave => {
        wave.phase += wave.speed;
        
        ctx.save();
        ctx.globalAlpha = wave.opacity;
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
        ctx.restore();
      });
      
      animationId = requestAnimationFrame(animateWaves);
    };

    const animateGeometric = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      
      particlesRef.current.forEach((shape, index) => {
        const x = shape.x + Math.sin(time + index) * 20;
        const y = shape.y + Math.cos(time + index * 0.5) * 15;
        
        ctx.save();
        ctx.globalAlpha = shape.opacity;
        ctx.translate(x, y);
        ctx.rotate(time + index);
        
        if (shape.type === 'triangle') {
          ctx.fillStyle = shape.color;
          ctx.beginPath();
          ctx.moveTo(0, -shape.size);
          ctx.lineTo(-shape.size, shape.size);
          ctx.lineTo(shape.size, shape.size);
          ctx.closePath();
          ctx.fill();
        } else if (shape.type === 'square') {
          ctx.fillStyle = shape.color;
          ctx.fillRect(-shape.size/2, -shape.size/2, shape.size, shape.size);
        } else {
          ctx.strokeStyle = shape.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        ctx.restore();
      });
      
      animationId = requestAnimationFrame(animateGeometric);
    };

    const init = () => {
      resizeCanvas();
      
      if (variant === 'particles') {
        particlesRef.current = createParticles();
        animateParticles();
      } else if (variant === 'waves') {
        particlesRef.current = createWaves();
        animateWaves();
      } else if (variant === 'geometric') {
        const shapes = [];
        const shapeCount = Math.min(20, Math.floor(window.innerWidth / 50));
        const types = ['triangle', 'square', 'circle'];
        
        for (let i = 0; i < shapeCount; i++) {
          shapes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 20 + 10,
            opacity: Math.random() * 0.3 + 0.1,
            color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`,
            type: types[Math.floor(Math.random() * types.length)]
          });
        }
        particlesRef.current = shapes;
        animateGeometric();
      }
    };

    init();
    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [variant]);

  return (
    <div className="animated-background">
      <canvas
        ref={canvasRef}
        className="background-canvas"
      />
    </div>
  );
};

export default AnimatedBackground;
