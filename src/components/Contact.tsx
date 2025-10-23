import { Mail, MessageSquare, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface ContactProps {
  liteMode: boolean;
}

const Contact = ({ liteMode }: ContactProps) => {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      color: 'text-service-digital',
      bgColor: 'bg-service-digital/20',
      borderColor: 'border-service-digital/30',
      link: 'https://mail.google.com/mail/?view=cm&fs=1&to=mavontechsolutions@gmail.com',
      text: 'mavontechsolutions@gmail.com',
      type: 'email'
    },
    {
      icon: MessageSquare,
      title: 'Contact Us',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      borderColor: 'border-primary/30',
      phones: [
        { number: '+91 7678046520', link: 'tel:7678046520' },
        { number: '+91 7977457097', link: 'tel:7977457097' }
      ],
      type: 'phone'
    },
    {
      icon: Instagram,
      title: 'Follow Us',
      color: 'text-service-branding',
      bgColor: 'bg-service-branding/20',
      borderColor: 'border-service-branding/30',
      link: 'https://www.instagram.com/_mavon_?igsh=MWl3MmpmbHoyenB5',
      text: '@_mavon_',
      type: 'social'
    }
  ];

  return (
    <div className="container mx-auto px-4 relative">
      {/* Background confetti effect */}
      {!liteMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--service-digital))' : 'hsl(var(--service-branding))',
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal disabled={liteMode}>
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-holographic mb-4"
              animate={!liteMode ? {
                textShadow: [
                  '0 0 20px rgba(102, 187, 106, 0.5)',
                  '0 0 40px rgba(102, 187, 106, 0.8)',
                  '0 0 20px rgba(102, 187, 106, 0.5)',
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Get in Touch
            </motion.h2>
            <p className="text-xl text-muted-foreground">
              Let's bring your ideas to life. Reach out and we'll respond within 24 hours.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <ScrollReveal 
                key={index}
                delay={index * 0.15}
                direction="up"
                disabled={liteMode}
              >
                <motion.div
                  className={`glass-card rounded-xl p-6 border-2 transition-all duration-300 ${method.borderColor}`}
                  whileHover={!liteMode ? { 
                    scale: 1.05, 
                    y: -8,
                    boxShadow: '0 20px 40px rgba(102, 187, 106, 0.2)',
                  } : {}}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-400 ${method.bgColor} blur-xl`} />
                  
                  <div className="relative flex items-start gap-4">
                    <motion.div 
                      className={`w-12 h-12 rounded-lg ${method.bgColor} flex items-center justify-center flex-shrink-0`}
                      animate={!liteMode ? {
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{
                        duration: 3,
                        delay: index * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      <Icon className={method.color} size={24} />
                    </motion.div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${method.color}`}>
                        {method.title}
                      </h3>
                      {method.type === 'phone' && method.phones ? (
                        <div className="space-y-1">
                          {method.phones.map((phone, idx) => (
                            <p key={idx}>
                              <a 
                                href={phone.link} 
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                {phone.number}
                              </a>
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          <motion.a
                            href={method.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors inline-block"
                            whileHover={{ scale: 1.05 }}
                          >
                            {method.text}
                          </motion.a>
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Call to action */}
        <ScrollReveal disabled={liteMode} delay={0.5}>
          <motion.div 
            className="mt-12 text-center glass-card p-6 rounded-xl border-2 border-primary/30"
            whileHover={!liteMode ? { scale: 1.02 } : {}}
          >
            <p className="text-lg text-muted-foreground">
              Ready to start your project? We're excited to hear from you! 
              <motion.span
                className="text-primary font-semibold ml-2"
                animate={!liteMode ? { 
                  opacity: [0.7, 1, 0.7],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Let's build something amazing together.
              </motion.span>
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Contact;
