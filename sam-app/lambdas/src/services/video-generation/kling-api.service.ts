import { KlingApiRequest, KlingApiResponse } from '../../types';
import { IVideoGenerationService, VideoGenerationConfig } from './types';

export class KlingApiService implements IVideoGenerationService {
  protected apiEndpoint: string;
  protected apiKey: string;
  protected staticMaskUrl: string;
  protected dynamicMaskUrl: string;

  constructor(config: VideoGenerationConfig) {
    this.apiEndpoint = config.apiEndpoint;
    this.apiKey = config.apiKey;
    this.staticMaskUrl = config.staticMaskUrl || '';
    this.dynamicMaskUrl = config.dynamicMaskUrl || '';
  }

  buildRequest(imageUrl: string, prompt: string): KlingApiRequest {
    return {
      model_name: "kling-v1",
      mode: "pro",
      duration: "5",
      image: imageUrl,
      prompt: prompt,
      cfg_scale: 0.5,
      static_mask: this.staticMaskUrl,
      dynamic_masks: [
        {
          mask: this.dynamicMaskUrl,
          trajectories: [
            { x: 279, y: 219 },
            { x: 417, y: 65 }
          ]
        }
      ]
    };
  }

  async generateVideo(imageUrl: string, prompt: string): Promise<KlingApiResponse> {
    const request = this.buildRequest(imageUrl, prompt);
    return this.callApi(request);
  }

  protected async callApi(request: KlingApiRequest): Promise<KlingApiResponse> {
    try {
      console.log('Calling Kling API with request:', JSON.stringify(request, null, 2));
      // Mock response for development
      const data: KlingApiResponse = { 
        code: 200,
        request_id: 'req-12345',
        message: 'Mock response from Kling API',
        data: {
          task_id: '12345',
          task_status: 'completed',
          task_status_msg: 'Task completed successfully',
          task_info: { external_task_id: '67890' },
          created_at: Date.now(),
          updated_at: Date.now(),
          task_result: {
            videos: [
              {
                id: 'video1',
                url: 'http://example.com/video1.mp4',
                duration: '120',
              }
            ]
          },
        },
      };
      
      console.log('Kling API response:', JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      console.error('Error calling Kling API:', error);
      throw error;
    }
  }
}