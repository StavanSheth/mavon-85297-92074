import { Sprout, Zap, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollSection } from './ScrollSection';
import { WhisperText } from './WhisperText';
import { GlowCard } from './GlowCard';

interface AboutProps {
  liteMode: boolean;
}

const About = ({ liteMode }: AboutProps) => {
  const milestones = [
    {
      icon: Sprout,
      year: '2024',
      title: 'Seeds of Innovation',
      color: 'hsl(var(--leaf-light))',
      description: 'Mavon was planted with a vision to merge technology and sustainability, creating digital solutions that grow naturally with business needs.',
    },
    {
      icon: Zap,
      year: 'Present',
      title: 'Rapid Growth',
      color: 'hsl(var(--neon-forest))',
      description: 'Our forest of innovation thrives with diverse projects spanning AI, web development, and digital transformation across multiple industries.',
    },
    {
      icon: Users,
      year: 'Today',
      title: 'Community Ecosystem',
      color: 'hsl(var(--gold))',
      description: 'Building a network of forward-thinking partners and clients who believe in conscious technology that creates lasting impact.',
    },
    {
      icon: Award,
      year: 'Future',
      title: 'Endless Horizons',
      color: 'hsl(var(--primary))',
      description: 'Continuing to pioneer sustainable tech solutions that push boundaries while staying rooted in our core values of excellence and innovation.',
    },
  ];

  return (
    <div className="container mx-auto px-4 relative">
      {/* Bioluminescent text highlights floating */}
      {!liteMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['Growth', 'Innovation', 'Partnership', 'Excellence'].map((word, i) => (
            <motion.div
              key={word}
              className="absolute text-3xl font-bold"
              style={{
                left: `${15 + i * 22}%`,
                top: `${25 + (i % 2) * 40}%`,
                background: `linear-gradient(135deg, hsl(var(--neon-forest)), hsl(var(--gold)))`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                opacity: 0.08,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.05, 0.12, 0.05],
              }}
              transition={{
                duration: 5,
                delay: i * 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {word}
            </motion.div>
          ))}
        </div>
      )}

      <ScrollSection disabled={liteMode} parallaxSpeed={0.2}>
        <div className="text-center mb-16">
          <WhisperText delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-neon-forest via-gold to-primary bg-clip-text text-transparent">
              Our Story
            </h2>
          </WhisperText>
          <WhisperText delay={0.3}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A journey through the forest of innovation, where technology meets nature's wisdom
            </p>
          </WhisperText>
        </div>
      </ScrollSection>

      <ScrollSection disabled={liteMode} delay={0.2}>
        <GlowCard className="max-w-4xl mx-auto mb-20" glowColor="hsl(var(--neon-forest))">
          <div className="p-8 md:p-12">
            <p className="text-lg text-foreground/90 leading-relaxed mb-6">
              At <motion.span
                className="font-bold text-neon-forest"
                animate={!liteMode ? {
                  textShadow: [
                    '0 0 10px hsl(var(--neon-forest) / 0.5)',
                    '0 0 20px hsl(var(--neon-forest) / 0.8)',
                    '0 0 10px hsl(var(--neon-forest) / 0.5)',
                  ],
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >Mavon</motion.span>, we believe in the power of technology to transform businesses. 
              Our team combines cutting-edge development practices with sustainable approaches to create solutions 
              that not only meet your needs today but also contribute to a better tomorrow.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              From custom software development to digital marketing strategies, we're your partner in digital transformation. 
              We take pride in delivering exceptional results that drive growth and{' '}
              <motion.span
                className="font-semibold text-gold"
                animate={!liteMode ? {
                  textShadow: [
                    '0 0 10px hsl(var(--gold) / 0.5)',
                    '0 0 20px hsl(var(--gold) / 0.8)',
                    '0 0 10px hsl(var(--gold) / 0.5)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >lasting impact</motion.span>.
            </p>
          </div>
        </GlowCard>
      </ScrollSection>

      {/* Timeline-narrative with leaf markers */}
      <div className="max-w-5xl mx-auto relative">
        {/* Central timeline stem */}
        {!liteMode && (
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-forest/30 via-gold/40 to-primary/30 -translate-x-1/2 hidden md:block" />
        )}

        <div className="space-y-16">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isEven = index % 2 === 0;
            
            return (
              <ScrollSection
                key={index}
                delay={index * 0.15}
                disabled={liteMode}
                fadeDirection={isEven ? 'right' : 'left'}
              >
                <div className={`flex flex-col md:flex-row gap-8 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  {/* Content side */}
                  <div className="flex-1">
                    <GlowCard glowColor={milestone.color} tiltIntensity={4}>
                      <div className="p-6">
                        {/* Year badge */}
                        <motion.div
                          className="inline-block px-4 py-1.5 rounded-full mb-4 text-sm font-bold"
                          style={{
                            backgroundColor: `${milestone.color}20`,
                            color: milestone.color,
                            border: `2px solid ${milestone.color}40`,
                          }}
                          animate={!liteMode ? {
                            boxShadow: [
                              `0 0 10px ${milestone.color}40`,
                              `0 0 20px ${milestone.color}60`,
                              `0 0 10px ${milestone.color}40`,
                            ],
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        >
                          {milestone.year}
                        </motion.div>

                        <h3
                          className="text-2xl font-bold mb-3"
                          style={{ color: milestone.color }}
                        >
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </GlowCard>
                  </div>

                  {/* Icon milestone marker */}
                  <motion.div
                    className="relative flex-shrink-0"
                    animate={!liteMode ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{
                      duration: 4,
                      delay: index * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center relative"
                      style={{
                        backgroundColor: `${milestone.color}20`,
                        border: `3px solid ${milestone.color}`,
                        boxShadow: `0 0 30px ${milestone.color}60, inset 0 0 20px ${milestone.color}20`,
                      }}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{ color: milestone.color }}
                      />
                    </div>
                    
                    {/* Leaf marker glow pulse */}
                    {!liteMode && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor: milestone.color,
                          filter: 'blur(15px)',
                        }}
                        animate={{
                          opacity: [0.2, 0.4, 0.2],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          delay: index * 0.2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Empty space for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollSection>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
