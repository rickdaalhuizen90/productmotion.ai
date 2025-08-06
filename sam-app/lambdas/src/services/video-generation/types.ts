import { KlingApiRequest, KlingApiResponse } from '../../types';

export interface VideoGenerationConfig {
  apiEndpoint: string;
  apiKey: string;
  staticMaskUrl?: string;
  dynamicMaskUrl?: string;
}

export interface IVideoGenerationService {
  generateVideo(imageUrl: string, prompt: string): Promise<KlingApiResponse>;
  buildRequest(imageUrl: string, prompt: string): KlingApiRequest;
}