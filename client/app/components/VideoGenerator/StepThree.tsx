import { Card } from "~/components/ui/card";
import { VideoResult, type VideoResultProps } from "~/components/VideoGenerator/VideoResult";
import { memo } from "react";

export const StepThree = memo(({ isGenerating, videoGenerated, generationId, videoUrl }: VideoResultProps) => {
  return (
    <Card className="p-6 border hover:shadow-sm transition-shadow">
      <h3 className="text-xl font-semibold flex items-center mt-3 mb-0">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 font-medium mr-3">3</span>
        Video Result
      </h3>

      <VideoResult 
        isGenerating={isGenerating} 
        videoGenerated={videoGenerated} 
        generationId={generationId} 
        videoUrl={videoUrl} 
      />

      {videoGenerated && (
        <div className="mt-6 flex flex-col gap-2">
          <button className="flex gap-3 h-10 items-center justify-center rounded-md border border-blue-600 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 px-4 text-neutral-50 shadow-[inset_0_1px_0px_0px_#93c5fd] hover:from-blue-600 hover:via-blue-600 hover:to-blue-600 active:[box-shadow:none]">
            Download Video
          </button>
        </div>
      )}

      <div className="mt-6 text-gray-700 p-4 bg-zinc-100 rounded-md">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Video Resolution:</span>
          <span className="text-sm">1024 x 576</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-sm font-medium">Duration:</span>
          <span className="text-sm">2.4 seconds</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-sm font-medium">Frames:</span>
          <span className="text-sm">24 fps</span>
        </div>
      </div>
    </Card>
  );
});
