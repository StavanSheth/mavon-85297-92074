import { Home, Settings, Package, Briefcase, Mail, Menu, Zap } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLiteMode } from "@/contexts/LiteModeContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import mavonLogo from '@/assets/mavon-logo.jpg';

export const Navigation = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(location.hash || '');
  const { liteMode, toggleLiteMode } = useLiteMode();

  const navItems = [
    { icon: Home, label: "Home", path: "#home" },
    { icon: Settings, label: "Services", path: "#services" },
    { icon: Package, label: "Solutions", path: "#solutions" },
    { icon: Briefcase, label: "About", path: "#about" },
    { icon: Mail, label: "Contact", path: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const sectionId = path.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.location.hash = path;
      setActiveHash(path);
      setOpen(false); // Close the menu after navigation
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['home', 'services', 'solutions', 'about', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      {/* Top Header with Logo and Name */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/80 border-b border-primary/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <img 
              src={mavonLogo} 
              alt="Mavon Logo" 
              className="w-12 h-12 rounded-full object-cover shadow-glow"
            />
            <span className="text-2xl font-bold text-primary">
              Mavon
            </span>
          </div>
        </div>
      </header>

      {/* Hamburger Menu Button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="fixed top-6 left-6 z-50 p-3 rounded-full backdrop-blur-xl bg-card/30 border border-primary/20 shadow-glow hover:bg-card/50 transition-all duration-300 hover:scale-110"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6 text-primary" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-80 backdrop-blur-xl bg-background/95 border-primary/20">
          <SheetHeader className="mb-8">
            <SheetTitle className="flex items-center gap-3">
              <img 
                src={mavonLogo} 
                alt="Mavon Logo" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-2xl font-bold text-primary">Mavon</span>
            </SheetTitle>
          </SheetHeader>

          {/* Lite Mode Toggle */}
          <div className="mb-6 p-4 rounded-lg bg-card/30 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <Label htmlFor="lite-mode" className="text-sm font-medium cursor-pointer">
                  Performance Mode
                </Label>
              </div>
              <Switch 
                id="lite-mode" 
                checked={liteMode} 
                onCheckedChange={toggleLiteMode}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {liteMode ? 'Animations disabled for better performance' : 'Full experience with animations'}
            </p>
          </div>

          <nav>
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeHash === item.path;
                
                return (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => handleNavClick(e, item.path)}
                      className={`group flex items-center gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? "bg-primary/10 text-primary border border-primary/20" 
                          : "text-foreground/70 hover:bg-card/50 hover:text-primary"
                      }`}
                    >
                      <Icon 
                        className={`w-6 h-6 transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-12 ${
                          isActive ? "animate-glow-pulse drop-shadow-[0_0_8px_hsl(var(--glow-primary))]" : ""
                        }`} 
                      />
                      <span className="text-base font-medium group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
