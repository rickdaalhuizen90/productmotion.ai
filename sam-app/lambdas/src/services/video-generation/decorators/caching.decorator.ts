import { KlingApiResponse } from '../../../types';
import { VideoGenerationDecorator } from '../video-generation.decorator';

export class CachingVideoGenerationDecorator extends VideoGenerationDecorator {
  private cache: Map<string, KlingApiResponse> = new Map();

  private getCacheKey(imageUrl: string, prompt: string): string {
    return `${imageUrl}:${prompt}`;
  }

  async generateVideo(imageUrl: string, prompt: string): Promise<KlingApiResponse> {
    const cacheKey = this.getCacheKey(imageUrl, prompt);
    
    const cachedResponse = this.cache.get(cacheKey);
    if (cachedResponse) {
      console.log('[Cache] Returning cached video generation result');
      return cachedResponse;
    }

    const result = await this.service.generateVideo(imageUrl, prompt);
    this.cache.set(cacheKey, result);
    
    return result;
  }
}