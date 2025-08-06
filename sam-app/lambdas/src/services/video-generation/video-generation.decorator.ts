import { KlingApiRequest, KlingApiResponse } from '../../types';
import { IVideoGenerationService } from './types';

export abstract class VideoGenerationDecorator implements IVideoGenerationService {
  protected service: IVideoGenerationService;

  constructor(service: IVideoGenerationService) {
    this.service = service;
  }

  buildRequest(imageUrl: string, prompt: string): KlingApiRequest {
    return this.service.buildRequest(imageUrl, prompt);
  }

  async generateVideo(imageUrl: string, prompt: string): Promise<KlingApiResponse> {
    return this.service.generateVideo(imageUrl, prompt);
  }
}