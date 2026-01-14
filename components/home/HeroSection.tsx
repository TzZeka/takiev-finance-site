"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, TrendingUp, Shield, Award } from "lucide-react";

interface HeroSectionProps {
  motto: string;
  videoUrl?: string;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const features = [
  { icon: TrendingUp, text: "Експертни решения", color: "#19BFB7" },
  { icon: Award, text: "Дългогодишен опит", color: "#19BFB7" },
];

const animations = [
  'animate-fadeInScale',
  'animate-slideInLeft',
  'animate-slideInRight',
  'animate-bounceIn',
  'animate-rotateIn',
];

export function HeroSection({ motto, videoUrl }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState(0);

  // Rotating feature text with different animations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
      setCurrentAnimation((prev) => (prev + 1) % animations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 150;
      const rect = canvas.getBoundingClientRect();

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
      particlesRef.current = particles;
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particlesRef.current.forEach((particle) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        // Mouse interaction
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.5;
          particle.vy -= Math.sin(angle) * force * 0.5;
        }

        // Return to base position
        particle.vx += (particle.baseX - particle.x) * 0.01;
        particle.vy += (particle.baseY - particle.y) * 0.01;

        // Apply friction
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(25, 191, 183, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((other) => {
          const dx2 = particle.x - other.x;
          const dy2 = particle.y - other.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(25, 191, 183, ${0.1 * (1 - distance2 / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const currentFeature = features[currentFeatureIndex];
  const IconComponent = currentFeature.icon;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(#19BFB7 1px, transparent 1px),
              linear-gradient(90deg, #19BFB7 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Background Video (if provided) */}
      {videoUrl && (
        <div className="absolute inset-0 opacity-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Content */}
      <div className="relative container mx-auto px-4 py-4 md:py-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="animate-fadeInDown">
              <div className="inline-flex items-center px-5 py-2.5 bg-slate-800/80 border-2 border-[#19BFB7]/40 rounded-full text-sm font-semibold text-[#19BFB7]">
                <Award className="w-4 h-4 mr-2" />
                Доверен партньор за Вашия бизнес
              </div>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fadeInUp">
              Избери своя доверен{" "}
              <span className="relative inline-block">
                <span className="text-[#19BFB7]">
                  бизнес партньор
                </span>
                <span className="absolute bottom-2 left-0 w-full h-1 bg-[#19BFB7]"></span>
              </span>
            </h1>

            {/* Description with more space */}
            <p className="text-lg md:text-xl text-white/80 leading-relaxed animate-fadeInUp delay-100 pr-8">
              {motto}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp delay-200 pt-4">
              <a
                href="/kontakti"
                className="group inline-flex items-center justify-center px-8 py-4 bg-[#19BFB7] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#40514E]"
              >
                Изпрати запитване
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="/uslugi"
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-[#19BFB7]"
              >
                Разгледай услугите
                <svg
                  className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Logo with Particles */}
          <div className="relative flex flex-col items-center justify-center animate-fadeInUp delay-400 space-y-6">
            {/* Canvas + Logo Container */}
            <div className="relative w-full h-[450px] flex items-center justify-center">
              {/* Particles Canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />

              {/* Logo */}
              <div className="relative z-10">
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#19BFB7]/20 animate-pulse" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-4 rounded-full border-2 border-[#40514E]/20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />

                  {/* Logo container */}
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="relative w-full h-full">
                      <Image
                        src="/icon.svg"
                        alt="Takiev Finance Logo"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rotating Feature Text */}
            <div className="relative h-16 w-full max-w-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  key={currentFeatureIndex}
                  className={`flex items-center space-x-3 ${animations[currentAnimation]}`}
                >
                  <IconComponent
                    className="h-7 w-7 flex-shrink-0"
                    style={{ color: currentFeature.color }}
                  />
                  <span className="text-lg font-bold text-white whitespace-nowrap">
                    {currentFeature.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 100L60 88.3C120 76.7 240 53.3 360 41.7C480 30 600 30 720 35C840 40 960 50 1080 55C1200 60 1320 60 1380 60L1440 60V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-30px);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-180deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-bounceIn {
          animation: bounceIn 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-rotateIn {
          animation: rotateIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}
