export type VideoGeneratorProps = {
  isGenerating: boolean;
  videoGenerated: boolean;
  generationId: string | null;
  videoUrl: string | null;
  handleGenerateVideo: () => void;
}
