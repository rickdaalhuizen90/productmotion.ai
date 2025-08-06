// Available prompt keys
export type PromptKey = 'foo_prompt' | 'space_prompt' | 'nature_prompt' | 'city_prompt';

export interface RequestEvent {
  googleId: string;
  fingerprint: string;
  imageUrl: string;
  promptKey: PromptKey;
}

export interface KlingApiRequest {
  model_name: string;
  mode: string;
  duration: string;
  image: string;
  prompt: string;
  cfg_scale: number;
  static_mask: string;
  dynamic_masks: Array<{
    mask: string;
    trajectories: Array<{ x: number; y: number }>;
  }>;
}

export interface KlingApiResponse {
  code: number;
  request_id: string;
  message: string;
  data: {
    task_id: string;
    task_status: string;
    task_status_msg: string;
    task_info: { external_task_id: string };
    created_at: number;
    updated_at: number;
    task_result: {
      videos: Array<{
        id: string;
        url: string;
        duration: string;
      }>;
    };
  };
}

export interface UserRecord {
  PK: string;
  SK: string;
  GSI1PK: string;
  credits: number;
  totalRequests: number;
  fingerprintHistory: string[];
  lastRequestTimestamp: number;
}

export interface SystemRecord {
  PK: string;
  SK: string;
  totalRequests: number;
}

export interface ApiResponse {
  statusCode: number;
  headers: {
    'Content-Type': string;
    'Access-Control-Allow-Origin': string;
    'Access-Control-Allow-Headers': string;
  };
  body: string;
}
