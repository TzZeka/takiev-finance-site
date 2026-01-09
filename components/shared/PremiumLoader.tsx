"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function PremiumLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add loader-active class to body
    document.body.classList.add('loader-active');

    // Hide loader after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.remove('loader-active');
    }, 4000); // Total animation time

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('loader-active');
    };
  }, []);

  // Brick pattern matching the logo (4 squares)
  // Top row: 3 squares, Bottom row: 1 centered square
  const brickPattern = [
    { x: 0, y: 0, delay: 0 },      // Top left
    { x: 1, y: 0, delay: 0.1 },    // Top center
    { x: 2, y: 0, delay: 0.2 },    // Top right
    { x: 1, y: 1, delay: 0.3 },    // Bottom center
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2
            }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #40514E 0%, #2a3634 50%, #1a2220 100%)'
          }}
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0px 0px', '40px 40px'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundImage: `
                  linear-gradient(#19BFB7 1px, transparent 1px),
                  linear-gradient(90deg, #19BFB7 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          {/* Decorative corner ornaments */}
          {[
            { top: '40px', left: '40px', rotate: 0 },
            { top: '40px', right: '40px', rotate: 90 },
            { bottom: '40px', right: '40px', rotate: 180 },
            { bottom: '40px', left: '40px', rotate: 270 },
          ].map((position, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              className="absolute"
              style={position}
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <path
                  d="M0,0 L30,0 L30,2 L20,2 L20,20 L18,20 L18,2 L2,2 L2,18 L0,18 Z"
                  fill="url(#corner-gradient)"
                  transform={`rotate(${position.rotate} 30 30)`}
                />
                <defs>
                  <linearGradient id="corner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#19BFB7" />
                    <stop offset="100%" stopColor="#147d6c" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          ))}

          {/* Center ornamental frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute"
            style={{
              width: '400px',
              height: '400px',
              border: '2px solid rgba(25, 191, 183, 0.2)',
              borderRadius: '8px',
              transform: 'rotate(45deg)',
            }}
          >
            <div className="absolute inset-4 border-2 border-primary/10 rounded-lg" />
          </motion.div>

          {/* Content */}
          <div className="relative flex flex-col items-center z-10">
            {/* Logo Animation */}
            <div className="relative mb-12">
              {/* Outer glow rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    scale: [0.8, 1.5 + i * 0.3, 2 + i * 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut"
                  }}
                  className="absolute rounded-full border-2 border-primary/40"
                  style={{
                    width: '220px',
                    height: '220px',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-110px',
                    marginTop: '-110px',
                  }}
                />
              ))}

              {/* Main glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute blur-3xl rounded-full"
                style={{
                  width: '280px',
                  height: '280px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-140px',
                  marginTop: '-140px',
                  background: 'radial-gradient(circle, rgba(25, 191, 183, 0.4) 0%, transparent 70%)',
                }}
              />

              {/* Brick squares - matching logo exactly */}
              <div className="relative" style={{ width: '200px', height: '140px' }}>
                {brickPattern.map((brick, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      scale: 0,
                      opacity: 0,
                      rotate: -90,
                      y: -50,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotate: 0,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.8 + brick.delay,
                      duration: 0.8,
                      ease: [0.34, 1.56, 0.64, 1], // Elastic spring
                    }}
                    className="absolute"
                    style={{
                      left: `${brick.x * 66 + 1}px`,
                      top: `${brick.y * 70}px`,
                      width: '64px',
                      height: '64px',
                    }}
                  >
                    {/* Outer border (like logo) */}
                    <div
                      className="absolute inset-0 rounded-md"
                      style={{
                        background: 'linear-gradient(135deg, #147d6c 0%, #1effff 100%)',
                        padding: '3px',
                      }}
                    >
                      {/* Inner square */}
                      <div
                        className="w-full h-full rounded-sm relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #19BFB7 0%, #15a39d 100%)',
                          boxShadow: '0 0 30px rgba(25, 191, 183, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: brick.delay + 1,
                            ease: "linear"
                          }}
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            width: '50%',
                          }}
                        />

                        {/* Pulsing glow */}
                        <motion.div
                          animate={{
                            opacity: [0.2, 0.5, 0.2],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: brick.delay,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-white/20 rounded-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Company Name with ornamental dividers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="text-center"
            >
              {/* Top ornament */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.4, duration: 0.6 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-primary" />
                <div className="w-2 h-2 rotate-45 border-2 border-primary" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent via-primary to-primary" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold mb-3 tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, #1effff 0%, #19BFB7 50%, #FFFFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 40px rgba(25, 191, 183, 0.3)',
                }}
              >
                Takiev Finance
              </motion.h1>

              {/* Bottom ornament */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.6, duration: 0.6 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-primary" />
                <div className="w-2 h-2 rotate-45 border-2 border-primary" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent via-primary to-primary" />
              </motion.div>

              {/* Elegant tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8, duration: 0.8 }}
                className="text-primary/60 text-sm tracking-widest uppercase"
              >
                Professional Excellence
              </motion.p>

              {/* Loading indicator */}
              <motion.div
                className="flex justify-center gap-2 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #19BFB7, #1effff)',
                      boxShadow: '0 0 10px rgba(25, 191, 183, 0.8)',
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
