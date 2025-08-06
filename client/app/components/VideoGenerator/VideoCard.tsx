import { useState, useRef, useEffect } from "react";
import type { GalleryItemProps } from "../Gallery";

const VideoCard = ({ item }: GalleryItemProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const observerRef = (element: HTMLVideoElement | null) => {
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && element) {
            element.src = item.video || "";
            element.load();
            observer.unobserve(element);
          }
        });
      },
      { rootMargin: "200px" }
    );

    observer.observe(element);
    
    return () => observer.disconnect();
  };

  useEffect(() => {
    const mark = `video-${item.id}`;
    performance.mark(`${mark}-start`);
    
    return () => {
      performance.mark(`${mark}-end`);
      try {
        performance.measure(mark, `${mark}-start`, `${mark}-end`);
      } catch (e) {
        console.error('Performance measurement error:', e);
      }
    };
  }, [item.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isHovering) return;
    video.currentTime = 0;
  }, [isHovering]);

  return (
    <a
      href={item.href}
      className="group relative block overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ aspectRatio: "3/4" }}
    >
      <img
        src={item.image.replace('.svg', '.webp')}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          isHovering ? "opacity-0" : "opacity-100"
        }`}
        style={{ transform: "translateZ(0)" }}
      />

      <video
        ref={(el) => {
          videoRef.current = el;
          if (el) observerRef(el);
        }}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
        style={{
          pointerEvents: 'none',
          transform: "translateZ(0)",
          willChange: "opacity"
        }}
      />
    </a>
  );
};

export { VideoCard };
