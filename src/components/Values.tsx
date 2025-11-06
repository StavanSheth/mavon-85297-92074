import { Target, Zap, Leaf, Award, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollSection } from './ScrollSection';
import { WhisperText } from './WhisperText';
import { GlowCard } from './GlowCard';
import { cn } from '@/lib/utils';

interface ValuesProps {
  liteMode: boolean;
}

/**
 * Forest Wisdom Nodes - Core values with glowing icons and hover whispers
 */
const Values = ({ liteMode }: ValuesProps) => {
  const wisdomNodes = [
    {
      icon: Sparkles,
      title: 'Innovation',
      whisper: 'Where ideas take root and grow',
      color: 'hsl(var(--neon-forest))',
      description: 'We pioneer cutting-edge solutions that transform industries and create new possibilities.',
    },
    {
      icon: Zap,
      title: 'Velocity',
      whisper: 'Moving at the speed of thought',
      color: 'hsl(var(--gold))',
      description: 'Rapid development cycles without compromising quality. Your vision, delivered faster.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      whisper: 'Growing with nature, not against it',
      color: 'hsl(var(--leaf-light))',
      description: 'Building conscious solutions that contribute to a better tomorrow for all.',
    },
    {
      icon: Target,
      title: 'Precision',
      whisper: 'Every detail matters',
      color: 'hsl(var(--service-marketing))',
      description: 'Laser-focused execution. We hit the mark every time with meticulous attention to detail.',
    },
    {
      icon: Heart,
      title: 'Partnership',
      whisper: 'Your success is our mission',
      color: 'hsl(var(--service-branding))',
      description: 'We grow together. Your challenges become our shared journey toward excellence.',
    },
    {
      icon: Award,
      title: 'Excellence',
      whisper: 'Settle for nothing less',
      color: 'hsl(var(--primary))',
      description: 'Uncompromising quality in every line of code, every pixel, every interaction.',
    },
  ];

  return (
    <div className="container mx-auto px-4 relative">
      {/* Background firefly spirits */}
      {!liteMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                backgroundColor: i % 2 === 0 ? 'hsl(var(--neon-forest))' : 'hsl(var(--gold))',
                boxShadow: `0 0 12px currentColor`,
              }}
              animate={{
                y: [-10, -25, -10],
                x: [-5, 5, -5],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + i * 0.5,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <ScrollSection disabled={liteMode} parallaxSpeed={0.2}>
        <div className="text-center mb-16">
          <WhisperText delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-neon-forest via-gold to-primary bg-clip-text text-transparent">
              Forest Wisdom
            </h2>
          </WhisperText>
          <WhisperText delay={0.3}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Core principles that guide our journey through the innovation forest
            </p>
          </WhisperText>
        </div>
      </ScrollSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {wisdomNodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <ScrollSection
              key={index}
              delay={index * 0.1}
              disabled={liteMode}
              fadeDirection="up"
            >
              <GlowCard
                className="h-full"
                glowColor={node.color}
                tiltIntensity={6}
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Icon with breathing glow */}
                  <motion.div
                    className="mb-4 relative"
                    animate={
                      !liteMode
                        ? {
                            scale: [1, 1.05, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 3,
                      delay: index * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div
                      className={cn(
                        'w-14 h-14 rounded-xl flex items-center justify-center relative',
                        'bg-background/50 backdrop-blur-sm border border-border/50'
                      )}
                      style={{
                        boxShadow: `0 0 30px ${node.color}40`,
                      }}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{ color: node.color }}
                      />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: node.color }}
                  >
                    {node.title}
                  </h3>

                  {/* Whisper text - appears on hover */}
                  <motion.p
                    className="text-sm italic text-muted-foreground/70 mb-4"
                    initial={{ opacity: 0, height: 0 }}
                    whileHover={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    "{node.whisper}"
                  </motion.p>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {node.description}
                  </p>

                  {/* Leaf marker milestone */}
                  <motion.div
                    className="mt-4 flex items-center gap-2"
                    animate={
                      !liteMode
                        ? {
                            x: [0, 3, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      delay: index * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: node.color,
                        boxShadow: `0 0 8px ${node.color}`,
                      }}
                    />
                    <div className="h-px flex-grow bg-gradient-to-r from-border/50 to-transparent" />
                  </motion.div>
                </div>
              </GlowCard>
            </ScrollSection>
          );
        })}
      </div>

      {/* Closing whisper */}
      <ScrollSection disabled={liteMode} delay={0.5} className="mt-16">
        <WhisperText>
          <p className="text-center text-lg text-muted-foreground italic max-w-2xl mx-auto">
            "In the forest of innovation, these principles light the path forward..."
          </p>
        </WhisperText>
      </ScrollSection>
    </div>
  );
};

export default Values;
