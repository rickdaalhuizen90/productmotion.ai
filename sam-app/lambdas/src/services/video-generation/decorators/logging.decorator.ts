import { KlingApiResponse } from '../../../types';
import { IVideoGenerationService } from '../types';
import { VideoGenerationDecorator } from '../video-generation.decorator';

export class LoggingVideoGenerationDecorator extends VideoGenerationDecorator {
  async generateVideo(imageUrl: string, prompt: string): Promise<KlingApiResponse> {
    console.log(`[VideoGeneration] Starting video generation for image: ${imageUrl}`);
    console.log(`[VideoGeneration] Using prompt: ${prompt}`);
    
    const startTime = Date.now();
    try {
      const result = await this.service.generateVideo(imageUrl, prompt);
      const duration = Date.now() - startTime;
      
      console.log(`[VideoGeneration] Successfully generated video in ${duration}ms`);
      console.log(`[VideoGeneration] Result:`, JSON.stringify(result, null, 2));
      
      return result;
    } catch (error) {
      console.error(`[VideoGeneration] Failed to generate video after ${Date.now() - startTime}ms:`, error);
      throw error;
    }
  }
}