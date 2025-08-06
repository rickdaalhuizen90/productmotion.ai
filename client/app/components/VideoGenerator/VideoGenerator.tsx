import { memo } from "react";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import type { VideoGeneratorProps } from "~/types/video-generator";

const VideoGenerator = memo<VideoGeneratorProps>((props) => {
  const { isGenerating, videoGenerated, generationId, videoUrl, handleGenerateVideo } = props;
  return (
    <div className="wrapper grid md:grid-cols-3 gap-8 px-4">
      <StepOne />
      <StepTwo
        isGenerating={isGenerating}
        handleGenerateVideo={handleGenerateVideo}
      />
      <StepThree
        isGenerating={isGenerating}
        videoGenerated={videoGenerated}
        generationId={generationId}
        videoUrl={videoUrl}
      />
    </div>
  );
});

VideoGenerator.displayName = "VideoGenerator";
export { VideoGenerator };