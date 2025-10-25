import { ArrowRight, Sparkles, Lightbulb, Star, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import heroForest from '@/assets/hero-forest.jpg';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedHeroParticles from '@/components/AnimatedHeroParticles';

interface EnhancedHeroProps {
  onScrollToServices: () => void;
  liteMode: boolean;
}

const EnhancedHero = ({ onScrollToServices, liteMode }: EnhancedHeroProps) => {
  const floatingIcons = [
    { Icon: Lightbulb, delay: 0, position: 'top-1/4 left-10', color: 'text-primary' },
    { Icon: Rocket, delay: 0.2, position: 'top-1/3 right-20', color: 'text-secondary' },
    { Icon: Star, delay: 0.4, position: 'bottom-1/3 left-20', color: 'text-accent' },
    { Icon: Sparkles, delay: 0.6, position: 'bottom-1/4 right-10', color: 'text-primary-glow' },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={heroForest}
          alt="Bioluminescent forest"
          className="w-full h-full object-cover"
          loading="eager"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-forest-deep/60 to-background" />

        {/* Animated Mist Effect */}
        {!liteMode && (
          <>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
              animate={{ 
                backgroundPosition: ['0% center', '200% center'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ backgroundSize: '200% 100%' }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />
          </>
        )}
      </div>

      {/* 3D Floating Icons/Particles */}
      {!liteMode && <AnimatedHeroParticles />}

      {/* Fireflies */}
      {!liteMode && (
        <div className="absolute inset-0 z-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.3, 1],
                x: [0, Math.random() * 40 - 20, 0],
                y: [0, Math.random() * 40 - 20, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                delay: Math.random() * 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Icons around content */}
      {!liteMode && floatingIcons.map(({ Icon, delay, position, color }, index) => (
        <motion.div
          key={index}
          className={`absolute ${position} hidden lg:block z-15 ${color}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1],
            y: [0, -20, 0],
          }}
          transition={{
            delay: delay,
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Icon size={48} className="drop-shadow-glow" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="text-primary" size={16} />
            </motion.div>
            <span className="text-sm text-primary-glow font-medium">Technology Solutions</span>
          </motion.div>

          {/* Main Heading with Neon Glow */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-holographic"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(102, 187, 106, 0.5)',
                  '0 0 40px rgba(102, 187, 106, 0.8)',
                  '0 0 20px rgba(102, 187, 106, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Moving Innovation Forward
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Futuristic software solutions
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <AnimatedButton
              onClick={onScrollToServices}
              className="bg-primary hover:bg-primary-glow text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl group"
            >
              Explore Services
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </AnimatedButton>
            
            <AnimatedButton
              variant="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-6 text-lg rounded-xl"
            >
              Get in Touch
            </AnimatedButton>
          </motion.div>

          {/* Stats / Icons */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { icon: <Lightbulb size={60} />, label: 'Innovation', color: 'text-primary' },
              { icon: <Star size={60} />, label: 'Excellence', color: 'text-secondary' },
              { icon: <Sparkles size={60} />, label: 'Creativity', color: 'text-accent' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-xl p-6 transition-all duration-300 hover:scale-105"
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 40px rgba(102, 187, 106, 0.3)',
                }}
              >
                <motion.div
                  className={`flex justify-center mb-2 ${stat.color}`}
                  animate={!liteMode ? { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  } : {}}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-sm text-muted-foreground text-center">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div> */}
    </div>
  );
};

export default EnhancedHero;
