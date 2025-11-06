import { Code, Smartphone, Server, Palette, Bot, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollSection } from './ScrollSection';
import { WhisperText } from './WhisperText';
import { GlowCard } from './GlowCard';

interface SolutionsProps {
  liteMode: boolean;
}

const Solutions = ({ liteMode }: SolutionsProps) => {
  const solutions = [
    {
      icon: Code,
      title: 'Web Applications',
      primaryColor: 'hsl(var(--neon-forest))',
      secondaryColor: 'hsl(var(--leaf-light))',
      description: 'Full-stack web solutions that scale with your ambitions',
      features: ['React & Next.js Expertise', 'RESTful & GraphQL APIs', 'Progressive Web Apps', 'Cloud Infrastructure'],
    },
    {
      icon: Smartphone,
      title: 'Mobile Solutions',
      primaryColor: 'hsl(var(--service-digital))',
      secondaryColor: 'hsl(var(--service-digital-glow))',
      description: 'Native and cross-platform mobile experiences',
      features: ['iOS & Android Development', 'React Native Apps', 'Mobile-First Design', 'App Store Optimization'],
    },
    {
      icon: Server,
      title: 'Backend Systems',
      primaryColor: 'hsl(var(--service-branding))',
      secondaryColor: 'hsl(var(--service-branding-glow))',
      description: 'Robust server architectures powering modern applications',
      features: ['Microservices Architecture', 'Database Design & Optimization', 'API Development', 'Real-time Systems'],
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      primaryColor: 'hsl(var(--gold))',
      secondaryColor: 'hsl(var(--neon-forest))',
      description: 'Stunning interfaces that users love to interact with',
      features: ['User Research & Testing', 'Design Systems', 'Prototyping & Wireframing', 'Brand Identity'],
    },
    {
      icon: Bot,
      title: 'AI Integration',
      primaryColor: 'hsl(var(--service-marketing))',
      secondaryColor: 'hsl(var(--service-marketing-glow))',
      description: 'Intelligent automation and machine learning solutions',
      features: ['Chatbots & Virtual Assistants', 'Computer Vision', 'Natural Language Processing', 'Predictive Analytics'],
    },
    {
      icon: Rocket,
      title: 'Digital Growth',
      primaryColor: 'hsl(var(--primary))',
      secondaryColor: 'hsl(var(--accent))',
      description: 'Strategic digital marketing for exponential reach',
      features: ['SEO & Content Strategy', 'Social Media Campaigns', 'Performance Analytics', 'Conversion Optimization'],
    },
  ];

  return (
    <div className="container mx-auto px-4 relative">
      {/* Moonlight spotlight effect */}
      {!liteMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main moonlight beam */}
          <motion.div
            className="absolute top-0 left-1/2 w-[600px] h-full -translate-x-1/2"
            style={{
              background: 'radial-gradient(ellipse at top, hsl(var(--neon-forest) / 0.15) 0%, transparent 50%)',
              filter: 'blur(60px)',
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Dancing moonlight particles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 2 === 0 ? 4 : 3,
                height: i % 2 === 0 ? 4 : 3,
                left: `${20 + i * 8}%`,
                top: `${10 + (i % 3) * 30}%`,
                backgroundColor: i % 3 === 0 ? 'hsl(var(--neon-forest))' : 'hsl(var(--gold))',
                boxShadow: `0 0 20px currentColor`,
              }}
              animate={{
                y: [-15, -35, -15],
                x: [0, (i % 2 === 0 ? 10 : -10), 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: 5 + i * 0.3,
                delay: i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <ScrollSection disabled={liteMode} parallaxSpeed={0.25}>
        <div className="text-center mb-16">
          <WhisperText delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-neon-forest via-gold to-primary bg-clip-text text-transparent">
              Impact Showcase
            </h2>
          </WhisperText>
          <WhisperText delay={0.3}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Moonlit revelations of comprehensive solutions powered by cutting-edge technology
            </p>
          </WhisperText>
        </div>
      </ScrollSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {solutions.map((solution, index) => {
          const Icon = solution.icon;
          return (
            <ScrollSection key={index} delay={index * 0.1} disabled={liteMode}>
              <GlowCard
                className="h-full"
                glowColor={solution.primaryColor}
                tiltIntensity={5}
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Icon with gradient background */}
                  <motion.div
                    className="mb-4 relative"
                    animate={
                      !liteMode
                        ? {
                            rotate: [0, 3, -3, 0],
                            scale: [1, 1.05, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 4,
                      delay: index * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${solution.primaryColor}, ${solution.secondaryColor})`,
                        boxShadow: `0 0 30px ${solution.primaryColor}40`,
                      }}
                    >
                      <Icon className="w-8 h-8 text-white relative z-10" />
                      {/* Moonlight shine effect */}
                      {!liteMode && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ['-200%', '200%'],
                          }}
                          transition={{
                            duration: 3,
                            delay: index * 0.5 + 2,
                            repeat: Infinity,
                            repeatDelay: 6,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: solution.primaryColor }}
                  >
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {solution.description}
                  </p>

                  {/* Feature list with bioluminescent markers */}
                  <ul className="space-y-2.5">
                    {solution.features.map((feature, fIndex) => (
                      <motion.li
                        key={fIndex}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: fIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.span
                          className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                          style={{
                            backgroundColor: solution.primaryColor,
                            boxShadow: `0 0 8px ${solution.primaryColor}`,
                          }}
                          animate={
                            !liteMode
                              ? {
                                  scale: [1, 1.3, 1],
                                  opacity: [0.7, 1, 0.7],
                                }
                              : {}
                          }
                          transition={{
                            duration: 2,
                            delay: fIndex * 0.2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </ScrollSection>
          );
        })}
      </div>
    </div>
  );
};

export default Solutions;
