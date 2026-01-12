import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface ReasonSlide {
  id: number;
  image: string;
  reason: string;
  subtext: string;
}

const reasons: ReasonSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
    reason: "Because your smile lights up my world",
    subtext: "Every time you smile, I fall in love all over again",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop",
    reason: "Because we've built so many memories",
    subtext: "Each moment with you is a treasure I never want to lose",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop",
    reason: "Because you understand me like no one else",
    subtext: "You see the real me and love me anyway",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop",
    reason: "Because our love story isn't finished yet",
    subtext: "We have so many chapters left to write together",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&h=600&fit=crop",
    reason: "Because you make me want to be better",
    subtext: "You inspire me to grow every single day",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=600&fit=crop",
    reason: "Because I can't imagine my future without you",
    subtext: "Every dream I have includes you by my side",
  },
];

const ReasonsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      if (!isAnimating) {
        const next = (currentSlide + 1) % reasons.length;
        goToSlide(next, 'right');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible, currentSlide, isAnimating]);

  const goToSlide = (index: number, direction: 'left' | 'right') => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setSlideDirection(direction);
    
    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 600);
    }, 50);
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % reasons.length;
    goToSlide(next, 'right');
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + reasons.length) % reasons.length;
    goToSlide(prev, 'left');
  };

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section title */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
            Why We Should <span className="italic text-primary">Stay Together</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Let me show you, one reason at a time...
          </p>
        </div>

        {/* Board/Card Slider */}
        <div className={`relative transition-all duration-700 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {/* Hands holding effect - decorative shadows */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-foreground/5 rounded-full blur-xl" />
          
          {/* Board container */}
          <div className="relative h-[500px] sm:h-[550px] md:h-[600px] perspective-1000">
            {reasons.map((slide, index) => {
              const isCurrent = index === currentSlide;
              const isPrev = slideDirection === 'right' 
                ? index === (currentSlide - 1 + reasons.length) % reasons.length
                : index === (currentSlide + 1) % reasons.length;
              
              let transform = 'translateX(100%) rotateY(-15deg)';
              let opacity = 0;
              let zIndex = 0;
              
              if (isCurrent) {
                transform = 'translateX(0) rotateY(0deg)';
                opacity = 1;
                zIndex = 10;
              } else if (isPrev && isAnimating) {
                transform = slideDirection === 'right' 
                  ? 'translateX(-100%) rotateY(15deg)' 
                  : 'translateX(100%) rotateY(-15deg)';
                opacity = 0;
                zIndex = 5;
              }

              return (
                <div
                  key={slide.id}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* The Board */}
                  <div className="relative h-full mx-auto max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden border-8 border-card">
                    {/* Wood texture overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-love-cream/50 to-love-blush/30 pointer-events-none" />
                    
                    {/* Photo */}
                    <div className="relative h-3/5 overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.reason}
                        className="w-full h-full object-cover"
                      />
                      {/* Soft vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>

                    {/* Reason text */}
                    <div className="relative h-2/5 p-6 flex flex-col items-center justify-center text-center">
                      {/* Decorative heart */}
                      <Heart className="w-6 h-6 text-primary fill-primary mb-4 animate-pulse-gentle" />
                      
                      {/* Reason */}
                      <h3 className="font-display text-xl sm:text-2xl text-foreground mb-3 leading-tight">
                        {slide.reason}
                      </h3>
                      
                      {/* Subtext */}
                      <p className="font-body text-muted-foreground text-sm sm:text-base">
                        {slide.subtext}
                      </p>
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-lg" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-6">
            {/* Prev button */}
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="p-4 rounded-full bg-card shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:scale-100"
              aria-label="Previous reason"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {reasons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index, index > currentSlide ? 'right' : 'left')}
                  disabled={isAnimating}
                  className={`transition-all duration-500 rounded-full ${
                    index === currentSlide 
                      ? "w-10 h-3 bg-primary" 
                      : "w-3 h-3 bg-muted-foreground/30 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to reason ${index + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="p-4 rounded-full bg-card shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:scale-100"
              aria-label="Next reason"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Counter */}
          <p className="text-center mt-6 font-display text-muted-foreground">
            <span className="text-primary text-xl">{currentSlide + 1}</span>
            <span className="mx-2">/</span>
            <span>{reasons.length}</span>
            <span className="ml-2 text-sm">reasons to stay</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;
