import { useState } from "react";

export const useVideoGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [generationId, setGenerationId] = useState("0");
  const [videoUrl, setVideoUrl] = useState("");

  const handleGenerateVideo = () => {
    setIsGenerating(true);

    setTimeout(() => {
      setVideoUrl("/media/bag.mp4");
      setGenerationId(Date.now().toString());
      setIsGenerating(false);
      setVideoGenerated(true);
    }, 3000);
  };

  return {
    isGenerating,
    videoGenerated,
    generationId,
    videoUrl,
    handleGenerateVideo
  };
};

