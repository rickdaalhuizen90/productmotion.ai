import { useState, useEffect, useRef } from 'react';
import { Play, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface VideoResultProps {
  isGenerating: boolean;
  videoGenerated: boolean;
  videoUrl?: string | null;
  generationId?: string | null;
}

export function VideoResult({ 
  isGenerating, 
  videoGenerated, 
  videoUrl,
  generationId,
}: VideoResultProps) {
  const [isBuffering, setIsBuffering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Loading progress simulation
  const [progress, setProgress] = useState(0);
  
  // Reset state when a new video is generated
  useEffect(() => {
    if (videoGenerated) {
      setIsBuffering(false);
    }
  }, [videoGenerated, generationId]);
  
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + Math.random() * 15, 95));
      }, 800);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isGenerating]);

  // Clean up video element when component unmounts or when generationId changes
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [generationId]);

  const handleVideoEvents = {
    onWaiting: () => {
      const timer = setTimeout(() => setIsBuffering(true), 200);
      return () => clearTimeout(timer);
    },
    onPlaying: () => {
      const timer = setTimeout(() => {
        setIsBuffering(false);
      }, 50);
      return () => clearTimeout(timer);
    },
  };

  // Fixed container with consistent dimensions to prevent layout shifts
  return (
    <div className="w-full">
      <div className="w-full h-64 bg-slate-50 rounded-lg overflow-hidden relative">
        <AnimatePresence mode="wait">
          {isGenerating && (
            <motion.div 
              key={`generating-${generationId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="relative w-16 h-16 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    className="text-slate-200" 
                    strokeWidth="8" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="42" 
                    cx="50" 
                    cy="50" 
                  />
                  <circle 
                    className="text-blue-500" 
                    strokeWidth="8" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="42" 
                    cx="50" 
                    cy="50" 
                    strokeDasharray="264"
                    strokeDashoffset={264 - (progress / 100) * 264}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
                </div>
              </div>
              <p className="text-gray-600 font-medium">Generating video...</p>
              <p className="text-xs text-gray-400 mt-2">This may take a few moments</p>
              <div className="w-48 h-1 bg-slate-200 rounded-full mt-4">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}

          {videoGenerated && !isGenerating && (
            <motion.div 
              key={`video-${generationId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <video 
                ref={videoRef}
                className="w-full h-full object-contain"
                controls
                poster="https://source.unsplash.com/random/800x450/?video" 
                autoPlay
                loop
                muted
                key={`video-element-${generationId}`}
                {...handleVideoEvents}
              >
                <source src={videoUrl ?? undefined} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <AnimatePresence>
                {isBuffering && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {!isGenerating && !videoGenerated && (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                <Play className="h-8 w-8 text-slate-500" />
              </div>
              <p className="text-gray-600 font-medium">Video will appear here</p>
              <p className="text-xs text-gray-400 mt-2">Generate a video to see the result</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};