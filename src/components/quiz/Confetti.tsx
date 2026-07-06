'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const colors = ['#fce18a', '#ff726d', '#b48def', '#f4306d', '#00f0ff', '#4caf50'];

export default function Confetti() {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage vw
      y: -20 - Math.random() * 100, // start above screen
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 0.5,
    }));
    setPieces(newPieces);
  }, []);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: `${p.y}vh`,
            rotate: 0,
            scale: p.scale,
            opacity: 1
          }}
          animate={{
            y: '120vh',
            rotate: p.rotation + 360,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '20px',
            backgroundColor: p.color,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
}
