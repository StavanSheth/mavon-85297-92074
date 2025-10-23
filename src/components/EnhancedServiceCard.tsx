import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  example: {
    title: string;
    description: string;
    image: string;
    demoUrl: string;
  };
  color: 'software' | 'digital' | 'digital2' | 'branding' | 'branding2' | 'marketing' | 'marketing2';
  liteMode: boolean;
}

const EnhancedServiceCard = ({ example, color, liteMode }: ServiceCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (example.demoUrl && !example.demoUrl.includes('REPLACE_WITH_URL')) {
      window.open(example.demoUrl, '_blank', 'noopener,noreferrer');
    } else {
      setShowModal(true);
    }
  };

  const getColorClasses = () => {
    const colorMap = {
      software: {
        overlay: 'bg-service-software/40',
        icon: 'bg-service-software',
        text: 'text-service-software',
        glow: 'text-service-software-glow',
        particle: 'bg-service-software-glow',
        border: 'border-service-software/30',
        shadow: 'hover:shadow-[0_8px_40px_hsl(var(--service-software)/0.5)]',
      },
      digital: {
        overlay: 'bg-service-digital/40',
        icon: 'bg-service-digital',
        text: 'text-service-digital',
        glow: 'text-service-digital-glow',
        particle: 'bg-service-digital-glow',
        border: 'border-service-digital/30',
        shadow: 'hover:shadow-[0_8px_40px_hsl(var(--service-digital)/0.5)]',
      },
      digital2: {
        overlay: 'bg-service-digital/40',
        icon: 'bg-service-digital',
        text: 'text-service-digital',
        glow: 'text-service-digital-glow',
        particle: 'bg-service-digital-glow',
        border: 'border-service-digital/30',
        shadow: 'hover:shadow-[0_8px_40px_hsl(var(--service-digital)/0.5)]',
      },
      branding: {
        overlay: 'bg-service-branding/40',
        icon: 'bg-service-branding',
        text: 'text-service-branding',
        glow: 'text-service-branding-glow',
        particle: 'bg-service-branding-glow',
        border: 'border-service-branding/30',
        shadow: 'hover:shadow-[0_8px_40px_hsl(var(--service-branding)/0.5)]',
      },
      branding2: {
        overlay: 'bg-service-branding/40',
        icon: 'bg-service-branding',
        text: 'text-service-branding',
        glow: 'text-service-branding-glow',
        particle: 'bg-service-branding-glow',
        border: 'border-service-branding/30',
        shadow: 'hover:shadow-[0_8px_40px_hsl(var(--service-branding)/0.5)]',
      },
      marketing: {
        overlay: 'bg-service-marketing/40',
        icon: 'bg-service-marketing',
        text: 'text-service-marketing',
        glow: 'text-service-marketing-glow',
        particle: 'bg-service-marketing-glow',
        border: 'border-service-marketing/30',
        shadow: 'hover:shadow-[0_8px_40px_hsl(var(--service-marketing)/0.5)]',
      },
      marketing2: {
        overlay: 'bg-service-marketing/40',
        icon: 'bg-service-marketing',
        text: 'text-service-marketing',
        glow: 'text-service-marketing-glow',
        particle: 'bg-service-marketing-glow',
        border: 'border-service-marketing/30',
        shadow: 'hover:shadow-[0_8px_40px_hsl(var(--service-marketing)/0.5)]',
      },
    };
    return colorMap[color];
  };

  const colors = getColorClasses();

  return (
    <>
      <motion.div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative glass-card rounded-xl overflow-hidden cursor-pointer transition-all duration-400 border-2 ${colors.border} ${colors.shadow}`}
        whileHover={!liteMode ? { scale: 1.03, y: -8 } : {}}
        whileTap={{ scale: 0.98 }}
        data-example-url={example.demoUrl}
      >
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            src={example.image}
            alt={example.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            animate={isHovered && !liteMode ? { scale: 1.15 } : { scale: 1 }}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-card animate-pulse" />
          )}
          
          {/* Gradient Overlay with Icon */}
          <motion.div
            className={`absolute inset-0 ${colors.overlay} flex items-center justify-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`w-16 h-16 rounded-full ${colors.icon} flex items-center justify-center shadow-lg`}
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ExternalLink className="text-white" size={28} />
            </motion.div>
          </motion.div>

          {/* Particle Effects */}
          {!liteMode && isHovered && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <AnimatePresence>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 ${colors.particle} rounded-full`}
                    initial={{ 
                      x: '50%', 
                      y: '50%',
                      opacity: 1,
                      scale: 0,
                    }}
                    animate={{ 
                      x: `${50 + (Math.cos((i / 12) * Math.PI * 2) * 100)}%`,
                      y: `${50 + (Math.sin((i / 12) * Math.PI * 2) * 100)}%`,
                      opacity: [1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.05,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 relative">
          <motion.h5 
            className={`font-semibold text-foreground mb-2 transition-all duration-300 ${
              isHovered ? colors.text : ''
            }`}
            animate={isHovered && !liteMode ? {
              textShadow: '0 0 12px currentColor',
            } : {}}
          >
            {example.title}
          </motion.h5>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {example.description}
          </p>
          
          {/* Call to Action */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <motion.div
              animate={!liteMode ? { 
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              } : {}}
              transition={{ 
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Sparkles className={colors.text} size={16} />
            </motion.div>
            <motion.span 
              className={colors.glow}
              animate={!liteMode ? { opacity: [0.7, 1, 0.7] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click to explore
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="glass-card border-border/50 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-holographic text-2xl">{example.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <motion.img
              src={example.image}
              alt={example.title}
              className="w-full rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <p className="text-muted-foreground text-lg">{example.description}</p>
            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <p className="text-sm text-foreground/80">
                <strong>Note:</strong> This demo link is a placeholder. Replace with actual project URL.
              </p>
              <code className="block mt-2 text-xs bg-card p-2 rounded text-accent">
                {example.demoUrl}
              </code>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowModal(false)}
              className="w-full"
            >
              <X className="mr-2" size={16} />
              Close Preview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedServiceCard;
