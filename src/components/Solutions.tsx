import React from "react";
import { motion } from "framer-motion";

const solutionsData = [
  { title: "ERP Systems", emoji: "🏢" },
  { title: "Business Intelligence", emoji: "📊" },
  { title: "Process Automation", emoji: "⚡" },
  { title: "Rapid Development", emoji: "🚀" },
  { title: "Secure Infrastructure", emoji: "💾" },
  { title: "Data Encryption", emoji: "🔐" },
];

const Solutions = () => {
  return (
    <section className="relative w-full min-h-screen bg-green-800 text-white flex flex-col items-center py-20 px-4">
      <h2 className="text-4xl font-bold mb-12">Our Solutions</h2>

      <div className="relative w-full h-96 flex items-center justify-center">
        {/* Central glowing emoji */}
        <motion.div
          className="text-6xl text-green-300 absolute"
          animate={{ rotate: [0, 360, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          🏢
        </motion.div>

        {/* Orbiting sub-solutions */}
        {solutionsData.map((s, idx) => {
          const angle = (360 / solutionsData.length) * idx;
          const radius = 140;
          return (
            <motion.div
              key={idx}
              className="absolute text-5xl bg-green-700 p-4 rounded-lg cursor-pointer flex flex-col items-center justify-center"
              style={{
                top: "50%",
                left: "50%",
                x: radius * Math.cos((angle * Math.PI) / 180),
                y: radius * Math.sin((angle * Math.PI) / 180),
              }}
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>{s.emoji}</span>
              <p className="text-sm mt-2">{s.title}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Solutions;

