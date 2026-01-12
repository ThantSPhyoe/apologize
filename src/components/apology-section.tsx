import { useEffect, useRef, useState } from "react"

const ApologySection = () => {
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

  const lines = [
    "I know I hurt you.",
    "I didn't mean to, but I understand",
    "that intentions don't erase pain.",
    "I'm truly sorry for what I did.",
  ];

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="love-card">
          <div className="space-y-6">
            {lines.map((line, index) => (
              <p
                key={index}
                className={`font-display text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {line}
              </p>
            ))}
          </div>
          
          <div className={`mt-10 flex justify-center transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApologySection;
