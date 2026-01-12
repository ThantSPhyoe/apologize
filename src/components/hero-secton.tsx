import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const HeroSection = () => {
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 500);
    setTimeout(() => setShowSubtext(true), 2000);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
      <div className="text-center max-w-3xl mx-auto">


        <div className="flex justify-center gap-3 mb-8">
          <Heart className="w-6 h-6 text-primary fill-primary animate-pulse-gentle" style={{ animationDelay: "0s" }} />
          <Heart className="w-8 h-8 text-accent fill-accent animate-pulse-gentle" style={{ animationDelay: "0.3s" }} />
          <Heart className="w-6 h-6 text-primary fill-primary animate-pulse-gentle" style={{ animationDelay: "0.6s" }} />
        </div>

        <div className={`transition-all duration-1000 ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="romantic-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight">
            I'm really sorry,
            <br />
            <span className="italic text-primary">my love.</span>
          </h1>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${showSubtext ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="romantic-text text-lg sm:text-xl font-light tracking-wide">
            Please read this with your heart.
          </p>
        </div>

        <div className={`mt-16 transition-all duration-1000 delay-500 ${showSubtext ? "opacity-100" : "opacity-0"}`}>
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <span className="text-sm romantic-text">scroll down</span>
            <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
