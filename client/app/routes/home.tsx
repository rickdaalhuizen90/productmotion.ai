import type { Route } from "./+types/home";
import { Hero } from "~/components/Hero";
import { Gallery } from "~/components/Gallery";
import { VideoGenerator } from "~/components/VideoGenerator/VideoGenerator";
import { Features } from "~/components/Features";
import { CaseStudies } from "~/components/CaseStudies";
import { Pricing } from "~/components/Pricing";
import { Faq } from "~/components/Faq";
import { useRef, useState } from "react";

const generateVideoId = () => {
  // In a real app, this would be based on video parameters
  const timestamp = Date.now();
  return `video-${timestamp}`;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export default function Home() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [generationId, setGenerationId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleGenerateVideo = async () => {
    // Generate ID first
    const newGenerationId = generateVideoId();
    
    setIsGenerating(true);
    setVideoGenerated(false);
    setGenerationId(newGenerationId);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Use a real video URL for testing
      const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
      setVideoUrl(videoUrl);
      setVideoGenerated(true);
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Hero className="mt-40" />
      <Gallery ref={galleryRef as React.RefObject<HTMLDivElement>} />
      <VideoGenerator
        isGenerating={isGenerating}
        videoGenerated={videoGenerated}
        generationId={generationId}
        videoUrl={videoUrl}
        handleGenerateVideo={handleGenerateVideo}
      />
      <Features />
      <CaseStudies />
      <Pricing />
      <Faq />
    </>
  );
}
