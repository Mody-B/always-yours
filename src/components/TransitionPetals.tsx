import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;
  delay: number;
  rotation: number;
  size: number;
}

interface TransitionPetalsProps {
  trigger: number;
}

const TransitionPetals = ({ trigger }: TransitionPetalsProps) => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger > 0) {
      const newPetals: Petal[] = [];
      for (let i = 0; i < 12; i++) {
        newPetals.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 0.3,
          rotation: Math.random() * 360,
          size: 16 + Math.random() * 12,
        });
      }
      setPetals(newPetals);
      setShow(true);
      
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {petals.map((petal) => (
            <motion.div
              key={`${trigger}-${petal.id}`}
              initial={{
                y: "50vh",
                x: `${petal.x}vw`,
                opacity: 0,
                rotate: petal.rotation,
                scale: 0,
              }}
              animate={{
                y: "-20vh",
                opacity: [0, 0.8, 0.6, 0],
                rotate: petal.rotation + 180,
                scale: [0, 1.2, 1, 0.8],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                delay: petal.delay,
                ease: "easeOut",
              }}
              className="absolute"
            >
              <svg
                width={petal.size}
                height={petal.size * 1.2}
                viewBox="0 0 24 30"
                fill="currentColor"
                className="text-petal-rose"
              >
                <ellipse cx="12" cy="15" rx="10" ry="14" opacity="0.8" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default TransitionPetals;
