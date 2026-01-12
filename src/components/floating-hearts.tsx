import { useEffect, useState } from "react";

interface FloatingEmote {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  emote: string;
}

const sadEmotes = ["😢", "😿", "🥺", "😞", "💔", "😔", "🫠", "😥"];

const FloatingSadEmotes = () => {
  const [emotes, setEmotes] = useState<FloatingEmote[]>([]);

  useEffect(() => {
    const generateEmotes = () => {
      const newEmotes: FloatingEmote[] = [];
      for (let i = 0; i < 15; i++) {
        newEmotes.push({
          id: i,
          left: Math.random() * 100,
          size: Math.random() * 16 + 16,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 10,
          opacity: Math.random() * 0.4 + 0.2,
          emote: sadEmotes[Math.floor(Math.random() * sadEmotes.length)],
        });
      }
      setEmotes(newEmotes);
    };

    generateEmotes();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {emotes.map((emote) => (
        <div
          key={emote.id}
          className="absolute animate-float-up"
          style={{
            left: `${emote.left}%`,
            fontSize: `${emote.size}px`,
            "--duration": `${emote.duration}s`,
            "--delay": `${emote.delay}s`,
            opacity: emote.opacity,
          } as React.CSSProperties}
        >
          {emote.emote}
        </div>
      ))}
    </div>
  );
};

export default FloatingSadEmotes;
