import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function FloatingLeaves() {
  const leaves = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 16 + Math.random() * 16,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute text-leaf-green/30"
          initial={{ 
            x: `${leaf.x}vw`, 
            y: '-10%',
            rotate: leaf.rotation,
            opacity: 0
          }}
          animate={{ 
            y: '110vh',
            x: [
              `${leaf.x}vw`,
              `${leaf.x + (Math.random() - 0.5) * 20}vw`,
              `${leaf.x + (Math.random() - 0.5) * 20}vw`,
              `${leaf.x}vw`,
            ],
            rotate: [
              leaf.rotation,
              leaf.rotation + 180,
              leaf.rotation + 360,
              leaf.rotation + 540,
            ],
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Leaf size={leaf.size} />
        </motion.div>
      ))}
    </div>
  );
}
