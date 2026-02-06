import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import TransitionPetals from "@/components/TransitionPetals";
import BloomingRoses from "@/components/BloomingRoses";
import { letterParagraphs } from "@/components/LetterContent";
import bouquetImage from "@/assets/bouquet.png";

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionTrigger, setTransitionTrigger] = useState(0);
  
  const isLastParagraph = currentIndex === letterParagraphs.length - 1;
  const currentParagraph = letterParagraphs[currentIndex];

  const handleContinue = useCallback(() => {
    if (!isLastParagraph) {
      setTransitionTrigger((prev) => prev + 1);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 200);
    }
  }, [isLastParagraph]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <FloatingHearts />
      <TransitionPetals trigger={transitionTrigger} />
      
      {isLastParagraph && <BloomingRoses />}
      
      {/* Grand bouquet on final screen */}
      <AnimatePresence>
        {isLastParagraph && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1.5, 
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          >
            <motion.img
              src={bouquetImage}
              alt="Beautiful bouquet of roses and peonies"
              className="w-[320px] md:w-[450px] lg:w-[550px] h-auto drop-shadow-2xl"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative z-20 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              className="text-center"
            >
              {/* Decorative element */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 flex justify-center"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-primary/40"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>

              {/* Letter content */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="letter-text text-lg md:text-xl lg:text-2xl whitespace-pre-line leading-relaxed tracking-wide"
              >
                {currentParagraph.content}
              </motion.p>

              {/* Button */}
              {currentParagraph.buttonText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-12"
                >
                  <button
                    onClick={handleContinue}
                    className="valentine-button"
                  >
                    {currentParagraph.buttonText}
                  </button>
                </motion.div>
              )}

              {/* Progress indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-16 flex justify-center gap-2"
              >
                {letterParagraphs.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? "w-6 bg-primary"
                        : index < currentIndex
                        ? "w-1.5 bg-primary/50"
                        : "w-1.5 bg-primary/20"
                    }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Soft vignette overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, hsl(var(--background) / 0.3) 100%)`,
        }}
      />
    </div>
  );
};

export default Index;
