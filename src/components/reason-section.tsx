import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
} from "lucide-react";

interface ReasonItem {
  id: number;
  video: string;
  reason: string;
  subtext: string;
}

const reasons: ReasonItem[] = [
  // {
  //   id: 1,
  //   video: "htaw.MOV",
  //   reason: "Because your smile lights up my world",
  //   subtext: "Every time you smile, I fall in love all over again",
  // },
  {
    id: 1,
    video: "anni.MP4",
    reason: "Because we've built so many memories",
    subtext: "Each moment with you is a treasure I never want to lose",
  },
  {
    id: 2,
    video: "pp.MP4",
    reason: "Because you understand me like no one else",
    subtext: "You see the real me and love me anyway",
  },
  {
    id: 3,
    video: "chatruamu.mov",
    reason: "Because I can't imagine my future without you",
    subtext: "Every dream I have includes you by my side",
  },
  {
    id: 4,
    video: "hand.MOV",
    reason: "Because you make me want to be better",
    subtext: "You inspire me to grow every single day",
  },
];

const VideoCard = ({ item, index }: { item: ReasonItem; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  /* Fade-in on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  /* Sync time + duration */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setProgress(video.currentTime);
    const setMeta = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", setMeta);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", setMeta);
    };
  }, []);

  /* Controls */
  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  };

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border/40">
        {/* Video */}
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            src={item.video}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover bg-black"
          />

          {/* Overlay play/pause */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/25 transition group"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              {isPlaying ? (
                <Pause className="text-white w-8 h-8" />
              ) : (
                <Play className="text-white w-8 h-8 ml-1" />
              )}
            </div>
          </button>

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent pointer-events-none" />
        </div>

        {/* Controls */}
        <div className="px-4 py-3 flex items-center gap-3 bg-card/90 backdrop-blur">
          <button onClick={togglePlay}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button onClick={() => skip(-10)}>
            <RotateCcw size={18} />
          </button>

          <button onClick={() => skip(10)}>
            <RotateCw size={18} />
          </button>

          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={seek}
            className="flex-1 h-1 accent-primary"
          />

          <button onClick={toggleMute}>
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Text */}
        <div className="p-6 text-center">
          <Heart className="w-6 h-6 text-primary fill-primary mx-auto mb-4 animate-pulse" />
          <h3 className="font-display text-xl sm:text-2xl mb-3">
            {item.reason}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {item.subtext}
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================
   Section
========================= */
const ReasonsSection = () => {
  return (
    <section className="px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl mb-4">
            Why We Should <span className="italic text-primary">Stay Together</span>
          </h2>
          <p className="text-muted-foreground">
            Let me show you, one reason at a time...
          </p>
        </div>

        <div className="space-y-12">
          {reasons.map((item, index) => (
            <VideoCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Heart className="w-8 h-8 text-primary fill-primary mx-auto mb-4" />
          <p className="font-display text-xl text-muted-foreground">
            And there are countless more reasons...
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;
