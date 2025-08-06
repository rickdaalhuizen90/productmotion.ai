import { Card } from "~/components/ui/card";
import { Zap, Loader } from "lucide-react";
import AIModelSelector from "./AIModelSelector";
import { Separator } from "~/components/ui/separator";
import { memo } from "react";

export interface StepTwoProps {
  isGenerating: boolean;
  handleGenerateVideo: () => void;
}

export const StepTwo = memo(({ isGenerating, handleGenerateVideo }: StepTwoProps) => {
  return (
    <Card className="p-6 border hover:shadow-sm transition-shadow">
      <h3 className="text-xl font-semibold flex items-center mt-3 mb-0">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-gray-500 font-medium mr-3">2</span>
        Video Style
      </h3>

      <AIModelSelector />

      <Separator className="my-6 bg-slate-200" />

      <button 
        className="w-full py-6 flex h-10 items-center justify-center rounded-md border border-orange-600 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 px-4 text-neutral-50 shadow-[inset_0_1px_0px_0px_#fdba74] active:[box-shadow:none] hover:cursor-pointer"
        onClick={handleGenerateVideo}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            Generating Video
            <Loader className="ml-2 h-5 w-5 animate-spin" />
          </>
        ) : (
          <>
            Generate Video
            <Zap className="ml-2 h-5 w-5" />
          </>
        )}
      </button>

      <div className="mt-6 text-gray-700 bg-zinc-100 p-4 rounded-md">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Est. compute time:</span>
          <span className="text-sm">2:00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Est. cost:</span>
          <div className="flex items-center">
            <span className="text-sm">1 Credit</span>
          </div>
        </div>
      </div>
    </Card>
  );
});
