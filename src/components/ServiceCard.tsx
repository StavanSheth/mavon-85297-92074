import { useState } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
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

const ServiceCard = ({ example, color, liteMode }: ServiceCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);

  const handleCardClick = () => {
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 600);

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
        shadow: 'group-hover:shadow-[0_8px_30px_hsl(var(--service-software)/0.4)]',
        ring: 'ring-service-software/50',
      },
      digital: {
        overlay: 'bg-service-digital/40',
        icon: 'bg-service-digital',
        text: 'text-service-digital',
        glow: 'text-service-digital-glow',
        particle: 'bg-service-digital-glow',
        shadow: 'group-hover:shadow-[0_8px_30px_hsl(var(--service-digital)/0.4)]',
        ring: 'ring-service-digital/50',
      },
      digital2: {
        overlay: 'bg-service-digital/40',
        icon: 'bg-service-digital',
        text: 'text-service-digital',
        glow: 'text-service-digital-glow',
        particle: 'bg-service-digital-glow',
        shadow: 'group-hover:shadow-[0_8px_30px_hsl(var(--service-digital)/0.4)]',
        ring: 'ring-service-digital/50',
      },
      branding: {
        overlay: 'bg-service-branding/40',
        icon: 'bg-service-branding',
        text: 'text-service-branding',
        glow: 'text-service-branding-glow',
        particle: 'bg-service-branding-glow',
        shadow: 'group-hover:shadow-[0_8px_30px_hsl(var(--service-branding)/0.4)]',
        ring: 'ring-service-branding/50',
      },
      branding2: {
        overlay: 'bg-service-branding/40',
        icon: 'bg-service-branding',
        text: 'text-service-branding',
        glow: 'text-service-branding-glow',
        particle: 'bg-service-branding-glow',
        shadow: 'group-hover:shadow-[0_8px_30px_hsl(var(--service-branding)/0.4)]',
        ring: 'ring-service-branding/50',
      },
      marketing: {
        overlay: 'bg-service-marketing/40',
        icon: 'bg-service-marketing',
        text: 'text-service-marketing',
        glow: 'text-service-marketing-glow',
        particle: 'bg-service-marketing-glow',
        shadow: 'group-hover:shadow-[0_8px_30px_hsl(var(--service-marketing)/0.4)]',
        ring: 'ring-service-marketing/50',
      },
      marketing2: {
        overlay: 'bg-service-marketing/40',
        icon: 'bg-service-marketing',
        text: 'text-service-marketing',
        glow: 'text-service-marketing-glow',
        particle: 'bg-service-marketing-glow',
        shadow: 'group-hover:shadow-[0_8px_30px_hsl(var(--service-marketing)/0.4)]',
        ring: 'ring-service-marketing/50',
      },
    };
    return colorMap[color];
  };

  const colors = getColorClasses();

  return (
    <>
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          group relative glass-card rounded-xl overflow-hidden cursor-pointer
          transition-all duration-400 border border-border/50
          ${isHovered && !liteMode ? 'animate-tilt-hover' : ''}
          ${colors.shadow}
        `}
        data-example-url={example.demoUrl}
      >
        {/* Ripple effect on click */}
        {rippleActive && (
          <div className={`absolute inset-0 ${colors.ring} ring-4 rounded-xl animate-ripple pointer-events-none z-20`} />
        )}

        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={example.image}
            alt={`${example.title} - Mavon software solution showcase example`}
            className={`
              w-full h-full object-cover transition-all duration-500
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              ${isHovered ? 'scale-108' : 'scale-100'}
            `}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-card animate-pulse" />
          )}
          
          {/* Gradient Overlay */}
          <div className={`
            absolute inset-0 ${colors.overlay} opacity-0 
            group-hover:opacity-100 transition-opacity duration-400
            flex items-center justify-center
          `}>
            <div className={`
              w-14 h-14 rounded-full ${colors.icon} flex items-center justify-center
              transform scale-0 group-hover:scale-100 transition-transform duration-400
              shadow-lg
            `}>
              <ExternalLink className="text-white" size={22} />
            </div>
          </div>

          {/* Leaf Particle Effect */}
          {!liteMode && isHovered && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Bottom corner particles */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className={`absolute w-1.5 h-1.5 ${colors.particle} rounded-full animate-particle-float`}
                  style={{
                    left: `${10 + i * 25}%`,
                    bottom: '8%',
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 relative">
          <h5 className={`
            font-semibold text-foreground mb-2 transition-all duration-300
            ${isHovered ? colors.text + ' drop-shadow-[0_0_8px_currentColor]' : ''}
          `}>
            {example.title}
          </h5>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {example.description}
          </p>
          
          {/* Call to Action with eye-catching pop animation */}
       {/* Call to Action with eye-catching shimmer */}
<div className={`${!liteMode ? 'animate-pop-intense' : ''} flex items-center gap-2`}>
  <Sparkles
    size={16}
    className={`${colors.glow} ${!liteMode ? 'animate-pop-intense [animation-delay:0s]' : ''} bg-clip-text text-transparent bg-[length:200%_200%] bg-gradient-to-tr from-current/20 via-current/60 to-current/20`}
  />

  <span
    className={`${colors.glow} font-semibold bg-clip-text text-transparent bg-[length:200%_200%] bg-gradient-to-tr from-current/20 via-current/60 to-current/20 animate-pop-intense [animation-delay:0.1s]`}
  >
    Click me to Explore
  </span>
</div>

        

      {/* Modal for placeholder URLs */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="glass-card border-border/50">
          <DialogHeader>
            <DialogTitle className="text-holographic">{example.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img
              src={example.image}
              alt={`${example.title} - Mavon software solution detailed view`}
              className="w-full rounded-lg"
              loading="lazy"
            />
            <p className="text-muted-foreground">{example.description}</p>
            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <p className="text-sm text-foreground/80">
                <strong>Note for developer:</strong> Replace the placeholder URL in the data file with the actual project link.
              </p>
              <code className="block mt-2 text-xs bg-card p-2 rounded text-amber">
                data-example-url="{example.demoUrl}"
              </code>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowModal(false)}
              className="w-full"
            >
              Close Preview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceCard;
