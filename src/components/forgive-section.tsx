import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";

interface BurstHeart {
  id: number;
  tx: number;
  ty: number;
  rotation: number;
  size: number;
}

const ForgiveSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([]);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonEscaped, setNoButtonEscaped] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleYesClick = () => {
    if (accepted) return;
    
    // Generate burst hearts
    const hearts: BurstHeart[] = [];
    for (let i = 0; i < 25; i++) {
      const angle = (i / 25) * 360;
      const distance = 100 + Math.random() * 200;
      hearts.push({
        id: i,
        tx: Math.cos((angle * Math.PI) / 180) * distance,
        ty: Math.sin((angle * Math.PI) / 180) * distance - 50,
        rotation: Math.random() * 360,
        size: 12 + Math.random() * 20,
      });
    }
    setBurstHearts(hearts);
    setAccepted(true);
  };

  const handleNoButtonHover = () => {
    if (!containerRef.current || !noButtonRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    // Calculate random position within bounds
    const maxX = container.width - button.width - 20;
    const maxY = 150; // Limit vertical movement
    
    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = Math.random() * maxY - maxY / 2;
    
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoButtonEscaped(true);
  };

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-24 relative">
      <div className="max-w-2xl mx-auto text-center w-full">
        {!accepted ? (
          <>
            {/* Pre-click state */}
            <div className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                One last thing...
              </h2>
              <p className="font-body text-muted-foreground text-lg mb-2">
                I need to ask you something important
              </p>
              <p className="font-display text-2xl sm:text-3xl text-primary italic mt-8">
                Can you forgive me?
              </p>
            </div>

            {/* Buttons container */}
            <div 
              ref={containerRef}
              className={`relative h-32 flex items-center justify-center gap-8 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            >
              {/* Yes Button */}
              <button
                onClick={handleYesClick}
                className="heart-button text-lg sm:text-xl font-display group relative overflow-hidden z-10"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Heart className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
                  Yes, I forgive you
                  <Heart className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
                </span>
              </button>

              {/* No Button - runs away! */}
              <button
                ref={noButtonRef}
                onMouseEnter={handleNoButtonHover}
                onTouchStart={handleNoButtonHover}
                className="px-8 py-4 rounded-full font-display text-lg sm:text-xl border-2 border-muted-foreground/30 text-muted-foreground hover:border-primary/50 transition-all duration-300 absolute"
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                  right: noButtonEscaped ? 'auto' : '0',
                  left: noButtonEscaped ? '50%' : 'auto',
                  marginLeft: noButtonEscaped ? '60px' : '0',
                }}
              >
                No
              </button>

              {/* Burst hearts */}
              {burstHearts.map((heart) => (
                <div
                  key={heart.id}
                  className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-heart-burst pointer-events-none z-20"
                  style={{
                    "--tx": `${heart.tx}px`,
                    "--ty": `${heart.ty}px`,
                    "--rotation": `${heart.rotation}deg`,
                  } as React.CSSProperties}
                >
                  <Heart
                    size={heart.size}
                    className="text-primary fill-primary"
                  />
                </div>
              ))}
            </div>

            {/* Playful message when No button escapes */}
            {noButtonEscaped && (
              <p className="mt-8 font-body text-muted-foreground text-sm animate-fade-in-up">
                Hehe... the "No" button is a bit shy 💕
              </p>
            )}
          </>
        ) : (
          /* Post-click state */
          <div className="animate-fade-in-up">
            <div className="love-card">
              <div className="flex justify-center mb-6">
                <Heart className="w-20 h-20 text-primary fill-primary animate-pulse-gentle" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Thank you! 💕
              </h2>
              <p className="font-display text-xl sm:text-2xl text-primary italic mb-6">
                I love you so much!
              </p>
              <p className="font-body text-muted-foreground mb-8">
                I promise to cherish you forever and always.
              </p>

              {/* Extra floating hearts */}
              <div className="flex justify-center gap-3">
                {[...Array(7)].map((_, i) => (
                  <Heart
                    key={i}
                    size={14 + i * 3}
                    className="text-primary fill-primary animate-pulse-gentle"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgiveSection;
