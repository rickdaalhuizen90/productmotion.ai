import { IVideoGenerationService, VideoGenerationConfig } from './types';
import { KlingApiService } from './kling-api.service';
import { LoggingVideoGenerationDecorator } from './decorators/logging.decorator';
import { CachingVideoGenerationDecorator } from './decorators/caching.decorator';

export class VideoGenerationServiceFactory {
  static createService(config: VideoGenerationConfig): IVideoGenerationService {
    let service: IVideoGenerationService = new KlingApiService(config);
    service = new LoggingVideoGenerationDecorator(service);
    service = new CachingVideoGenerationDecorator(service);
    
    return service;
  }
}