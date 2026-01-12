import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const PromiseSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const promises = [
    "I promise to listen better.",
    "I promise to grow.",
    "I promise to protect your feelings.",
    "I promise to love you more each day.",
  ];

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        {/* Section title */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground">
            My <span className="italic text-primary">Promises</span>
          </h2>
        </div>

        {/* Promises list */}
        <div className="space-y-6">
          {promises.map((promise, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 justify-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <p className="font-display text-lg sm:text-xl md:text-2xl text-foreground">
                {promise}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative element */}
        <div className={`mt-16 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} style={{ transitionDelay: "1000ms" }}>
          <div className="inline-flex items-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <span className="text-primary text-2xl">♥</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
