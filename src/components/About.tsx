import { Target, Users, Leaf, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface AboutProps {
  liteMode: boolean;
}

const About = ({ liteMode }: AboutProps) => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      color: 'text-service-marketing',
      bgColor: 'bg-service-marketing/20',
      borderColor: 'border-service-marketing/30',
      description: 'To deliver innovative technology solutions that empower businesses.'
    },
    {
      icon: Users,
      title: 'Innovative Solutions',
      color: 'text-service-digital',
      bgColor: 'bg-service-digital/20',
      borderColor: 'border-service-digital/30',
      description: 'Driven by Technology & Vision.'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      color: 'text-service-branding',
      bgColor: 'bg-service-branding/20',
      borderColor: 'border-service-branding/30',
      description: 'Building conscious solutions that grow with nature and contribute to better future.'
    },
    {
      icon: Award,
      title: 'Excellence Focused',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      borderColor: 'border-primary/30',
      description: 'Building the Future'
    }
  ];

  return (
    <div className="container mx-auto px-4 relative">
      {/* Floating keywords animation */}
      {!liteMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {['Innovation', 'Sustainable', 'Technology', 'Future'].map((word, i) => (
            <motion.div
              key={word}
              className="absolute text-2xl font-bold text-primary"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
              }}
            >
              {word}
            </motion.div>
          ))}
        </div>
      )}

      <ScrollReveal disabled={liteMode}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            About Mavon
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A Futuristic Software Solutions Company in India.
            Pioneering the future of technology solutions
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal disabled={liteMode} delay={0.2}>
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div 
            className="glass-card p-8 rounded-2xl border-2 border-primary/20"
            whileHover={!liteMode ? { scale: 1.01, boxShadow: '0 0 40px rgba(102, 187, 106, 0.3)' } : {}}
          >
            <p className="text-lg text-foreground/90 leading-relaxed mb-6">
              Mavon is a software development & automation company based in India, combining creativity with technology to build future-ready solutions.
              As a top software solutions provider, Mavon delivers innovative apps, automation tools, & digital products.
            </p>
            <motion.p 
              className="text-lg text-foreground/90 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              From custom software development to digital marketing strategies, we're your partner in digital transformation. 
              We take pride in delivering exceptional results that drive growth and <motion.span
                className="text-primary font-semibold"
                animate={!liteMode ? { 
                  textShadow: [
                    '0 0 10px rgba(102, 187, 106, 0.5)',
                    '0 0 20px rgba(102, 187, 106, 0.8)',
                    '0 0 10px rgba(102, 187, 106, 0.5)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >innovation</motion.span>.
            </motion.p>
          </motion.div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <ScrollReveal 
              key={index}
              delay={index * 0.15}
              disabled={liteMode}
            >
              <motion.div
                className={`glass-card p-6 rounded-xl border-2 transition-all duration-300 group ${value.borderColor}`}
                whileHover={!liteMode ? { 
                  scale: 1.03, 
                  y: -6,
                  boxShadow: '0 20px 40px rgba(102, 187, 106, 0.2)',
                } : {}}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 ${value.bgColor} blur-xl`} />
                
                <div className="relative flex items-start gap-4">
                  <motion.div 
                    className={`p-3 rounded-lg ${value.bgColor} flex-shrink-0`}
                    animate={!liteMode ? {
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{
                      duration: 4,
                      delay: index * 0.3,
                      repeat: Infinity,
                    }}
                  >
                    <Icon className={`w-6 h-6 ${value.color}`} />
                  </motion.div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${value.color}`}>
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};

export default About;
