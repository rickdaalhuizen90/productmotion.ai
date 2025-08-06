import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VideoCard } from "~/components/VideoGenerator/VideoCard";

import { GALLERY_DATA } from '~/types/gallery';
import type { DataItem } from '~/types/gallery';

gsap.registerPlugin(ScrollTrigger);

export function Gallery({className}: { className?: string, ref?: React.RefObject<HTMLDivElement> }) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getScrollAmount = useCallback(() => {
    if (!galleryRef.current) return 0;
    return -(galleryRef.current.scrollWidth - window.innerWidth);
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 100%",
        end: "bottom top",
        anticipatePin: 1,
        scrub: 0.5,
        invalidateOnRefresh: true,
      }
    });

    tl.to(gallery, {
      x: getScrollAmount,
      duration: 3,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [getScrollAmount]);

  const renderGalleryItems = useMemo(() =>
    GALLERY_DATA.map((item) => (
      <GalleryItem key={item.id} item={item} />
    ))
    , []);

  return (
    <div ref={containerRef} className={`w-full py-32 ${className}`}>
      <div ref={galleryRef} className="flex gap-3 w-full">
        {renderGalleryItems}
      </div>
    </div>
  );
};

export interface GalleryItemProps {
  item: DataItem;
}

const GalleryItem: React.FC<GalleryItemProps> = React.memo(({ item }) => (
  <div className="min-w-[250px] cursor-pointer">
    <VideoCard item={item} />
    <div className="pt-3">
      <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4 m-0">
        {item.title}
      </h3>
      <p className="mt-1.5 tracking-wide text-gray-900">${item.price}</p>
    </div>
  </div>
));
