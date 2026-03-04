
import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  isActive: boolean;
  intensity: number; // 0 to 1
  theme: 'red' | 'emerald' | 'orange';
  lowPower?: boolean; 
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
}

const Visualizer: React.FC<VisualizerProps> = ({ isActive, intensity, theme, lowPower = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Define Colors based on theme
    let primaryColor = '#ef4444'; 
    let secondaryColor = '#7f1d1d';
    let particleColor = '212, 175, 55'; // Gold default

    if (theme === 'emerald') {
        primaryColor = '#10b981';
        secondaryColor = '#064e3b';
        particleColor = '16, 185, 129';
    } else if (theme === 'orange') {
        primaryColor = '#f97316'; // Orange-500
        secondaryColor = '#7c2d12'; // Orange-900
        particleColor = '249, 115, 22';
    }

    // Initialize Particles
    const particleCount = lowPower ? 30 : 150;
    
    if (particlesRef.current.length !== particleCount) {
        particlesRef.current = [];
        for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    let animationFrameId: number;
    let frame = 0;

    const render = () => {
      // Clear
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // 1. Draw The Core
      const baseRadius = 50;
      const pulse = isActive ? intensity * 30 : 0;
      const currentRadius = baseRadius + pulse;

      // Outer Glow - Disable heavy gradients in low power
      if (!lowPower) {
        const gradient = ctx.createRadialGradient(centerX, centerY, baseRadius * 0.5, centerX, centerY, currentRadius * 1.5);
        gradient.addColorStop(0, primaryColor); 
        gradient.addColorStop(0.5, theme === 'emerald' ? 'rgba(16, 185, 129, 0.2)' : (theme === 'orange' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(239, 68, 68, 0.2)'));
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, currentRadius * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Inner Core Ring
      ctx.strokeStyle = isActive ? (lowPower ? primaryColor : (theme === 'emerald' ? '#6ee7b7' : (theme === 'orange' ? '#fdba74' : '#fca5a5'))) : secondaryColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Rotating data ring (The Matrix)
      const ringRadius = 70 + (pulse * 0.5);
      ctx.strokeStyle = `rgba(${particleColor}, ${isActive ? 0.5 : 0.1})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius, frame * 0.02, frame * 0.02 + Math.PI * 1.5);
      ctx.stroke();

      // 2. Draw Particles
      particlesRef.current.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`; 
        ctx.beginPath();
        const size = p.size + (intensity * 2); 
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive, intensity, theme, lowPower]);

  return (
    <div className="relative flex items-center justify-center w-full h-[400px]">
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={400} 
        className="w-full h-full"
      />
      {/* Central Icon */}
      <div className="absolute pointer-events-none flex flex-col items-center justify-center gap-2 opacity-80">
          <i className={`fas fa-microchip text-2xl transition-colors duration-500 ${isActive ? (theme === 'emerald' ? 'text-emerald-100' : (theme === 'orange' ? 'text-orange-100' : 'text-red-100')) : (theme === 'emerald' ? 'text-emerald-900' : (theme === 'orange' ? 'text-orange-900' : 'text-red-900'))}`}></i>
          {isActive && <span className={`text-[8px] ${theme === 'emerald' ? 'text-emerald-500' : (theme === 'orange' ? 'text-orange-500' : 'text-red-500')} tracking-[0.3em] font-mono animate-pulse`}>PROCESSING</span>}
      </div>
    </div>
  );
};

export default Visualizer;
