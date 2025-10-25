import { Package, Zap, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface SolutionsProps {
  liteMode: boolean;
}

const Solutions = ({ liteMode }: SolutionsProps) => {
  const solutions = [
    {
      icon: Package,
      title: 'Enterprise Solutions',
      color: 'text-service-marketing',
      bgColor: 'bg-service-marketing/20',
      borderColor: 'border-service-marketing/30',
      glowColor: 'hover:shadow-[0_0_30px_hsl(var(--service-marketing)/0.4)]',
      description: '',
      features: ['Custom ERP Systems', 'Business Intelligence', 'Process Automation']
    },
    {
      icon: Zap,
      title: 'Rapid Development',
      color: 'text-service-digital',
      bgColor: 'bg-service-digital/20',
      borderColor: 'border-service-digital/30',
      glowColor: 'hover:shadow-[0_0_30px_hsl(var(--service-digital)/0.4)]',
      description: '',
      features: ['MVP Development', 'Prototype Design', 'Quick Deployment']
    },
    {
      icon: Shield,
      title: 'Secure Infrastructure',
      color: 'text-service-branding',
      bgColor: 'bg-service-branding/20',
      borderColor: 'border-service-branding/30',
      glowColor: 'hover:shadow-[0_0_30px_hsl(var(--service-branding)/0.4)]',
      description: '',
      features: ['Data Encryption', 'Compliance Management', 'Security Audits']
    },
    {
      icon: TrendingUp,
      title: 'Growth Solutions',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      borderColor: 'border-primary/30',
      glowColor: 'hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]',
      description: '',
      features: ['Analytics Dashboard', 'Performance Monitoring', 'Growth Strategy']
    }
  ];

  return (
    <div className="container mx-auto px-4 relative">
      {/* Background particles */}
      {!liteMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      )}

      <ScrollReveal disabled={liteMode}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#ff8c42] via-[#6366f1] to-[#10b981] bg-clip-text text-transparent">
            Our Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {solutions.map((solution, index) => {
          const Icon = solution.icon;
          return (
            <ScrollReveal 
              key={index}
              delay={index * 0.15}
              disabled={liteMode}
            >
              <motion.div
                className={`glass-card p-8 rounded-2xl border-2 transition-all duration-300 group ${solution.borderColor} ${solution.glowColor}`}
                whileHover={!liteMode ? { scale: 1.02, y: -8 } : {}}
              >
                {/* Glow effect background */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 ${solution.bgColor} blur-xl`} />
                
                <div className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div 
                      className={`p-3 rounded-xl ${solution.bgColor} transition-all`}
                      animate={!liteMode ? {
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={{
                        duration: 3,
                        delay: index * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      <Icon className={`w-6 h-6 ${solution.color}`} />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold mb-2 ${solution.color}`}>
                        {solution.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-6">
                    {solution.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-center gap-2 text-foreground/80"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${solution.bgColor}`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};

export default Solutions;
