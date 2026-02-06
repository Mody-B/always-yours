import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Rose {
  id: number;
  x: number;
  y: number;
  delay: number;
  scale: number;
  duration: number;
}

const Rose = ({ rose }: { rose: Rose }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0, y: 50 }}
    animate={{ 
      scale: rose.scale, 
      opacity: 1,
      y: [50, -20, -50],
    }}
    transition={{
      duration: rose.duration,
      delay: rose.delay,
      ease: "easeOut",
      y: {
        duration: rose.duration * 3,
        delay: rose.delay + 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }}
    className="absolute animate-glow-pulse"
    style={{ left: `${rose.x}%`, top: `${rose.y}%` }}
  >
    <svg
      width={60 * rose.scale}
      height={80 * rose.scale}
      viewBox="0 0 60 80"
      className="drop-shadow-lg"
    >
      {/* Stem */}
      <motion.path
        d="M30 80 Q28 60 30 45"
        stroke="hsl(120, 35%, 35%)"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: rose.delay }}
      />
      
      {/* Leaves */}
      <motion.path
        d="M30 65 Q20 58 25 50 Q30 55 30 60"
        fill="hsl(120, 40%, 40%)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: rose.delay + 0.5 }}
      />
      <motion.path
        d="M30 55 Q40 48 35 40 Q30 45 30 50"
        fill="hsl(120, 40%, 40%)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: rose.delay + 0.7 }}
      />
      
      {/* Rose petals - outer layer */}
      <motion.ellipse
        cx="30" cy="25" rx="18" ry="20"
        fill="hsl(350, 70%, 40%)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: rose.delay + 0.3, ease: "easeOut" }}
      />
      
      {/* Rose petals - middle layer */}
      <motion.ellipse
        cx="30" cy="23" rx="14" ry="16"
        fill="hsl(350, 65%, 50%)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: rose.delay + 0.5, ease: "easeOut" }}
      />
      
      {/* Rose petals - inner layer */}
      <motion.ellipse
        cx="30" cy="22" rx="10" ry="12"
        fill="hsl(350, 60%, 55%)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: rose.delay + 0.7, ease: "easeOut" }}
      />
      
      {/* Rose center */}
      <motion.circle
        cx="30" cy="20" r="5"
        fill="hsl(350, 70%, 35%)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: rose.delay + 0.9, ease: "easeOut" }}
      />
      
      {/* Spiral detail */}
      <motion.path
        d="M30 18 Q32 20 30 22 Q28 20 30 18"
        fill="hsl(350, 75%, 30%)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: rose.delay + 1.1 }}
      />
    </svg>
  </motion.div>
);

const BloomingRoses = () => {
  const [roses, setRoses] = useState<Rose[]>([]);

  useEffect(() => {
    const newRoses: Rose[] = [];
    const positions = [
      { x: 5, y: 70 }, { x: 15, y: 55 }, { x: 25, y: 75 },
      { x: 35, y: 60 }, { x: 45, y: 80 }, { x: 55, y: 65 },
      { x: 65, y: 75 }, { x: 75, y: 55 }, { x: 85, y: 70 },
      { x: 10, y: 85 }, { x: 50, y: 90 }, { x: 90, y: 80 },
    ];

    positions.forEach((pos, i) => {
      newRoses.push({
        id: i,
        x: pos.x + (Math.random() - 0.5) * 8,
        y: pos.y + (Math.random() - 0.5) * 10,
        delay: i * 0.15,
        scale: 0.7 + Math.random() * 0.5,
        duration: 1.5 + Math.random() * 0.5,
      });
    });

    setRoses(newRoses);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {roses.map((rose) => (
        <Rose key={rose.id} rose={rose} />
      ))}
    </div>
  );
};

export default BloomingRoses;
