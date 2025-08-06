process.env.AWS_XRAY_CONTEXT_MISSING = 'IGNORE_ERROR';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DatabaseService } from './services/database.service';
import { UserService } from './services/user.service';
import { SystemService } from './services/system.service';
import { FraudDetectionService } from './services/fraud-detection.service';
import { VideoGenerationServiceFactory } from './services/video-generation/video-generation.factory';
import { RequestEvent, KlingApiRequest, KlingApiResponse, PromptKey } from './types';

const CONFIG = {
  region: process.env.AWS_REGION || 'eu-west-3',
  tableName: process.env.TABLE_NAME || 'UserCreditsTable',
  klingApiKey: process.env.KLING_API_KEY || '',
  klingApiEndpoint: process.env.KLING_API_ENDPOINT || 'https://api.klingai.com/v1/videos/image2video',
  staticMaskUrl: process.env.STATIC_MASK_URL || '',
  dynamicMaskUrl: process.env.DYNAMIC_MASK_URL || '',
  maxTotalRequests: 100,
  initialCredits: 3
};

const PROMPT_CONFIG: Record<PromptKey, string> = {
  foo_prompt: "The astronaut stood up and walked away",
  space_prompt: "A spaceship flying through nebula",
  nature_prompt: "A butterfly transforming on a flower",
  city_prompt: "A cityscape transforming from day to night"
};

class RequestValidationService {
  private promptConfig: Record<PromptKey, string>;

  constructor(promptConfig: Record<PromptKey, string>) {
    this.promptConfig = promptConfig;
  }

  validateRequest(data: RequestEvent): string | null {
    if (!data.googleId || typeof data.googleId !== 'string') {
      return 'Invalid or missing googleId';
    }
    
    if (!data.fingerprint || typeof data.fingerprint !== 'string') {
      return 'Invalid or missing fingerprint';
    }
    
    if (!data.imageUrl || typeof data.imageUrl !== 'string') {
      return 'Invalid or missing imageUrl';
    }
    
    if (!data.promptKey || typeof data.promptKey !== 'string') {
      return 'Invalid or missing promptKey';
    }
    
    if (!this.promptConfig[data.promptKey as PromptKey]) {
      return `Invalid prompt key: ${data.promptKey}`;
    }
    
    try {
      new URL(data.imageUrl);
    } catch (error) {
      return 'Invalid image URL format';
    }
    
    return null;
  }
}

class ResponseFormatterService {
  formatResponse(statusCode: number, body: any): APIGatewayProxyResult {
    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization'
      },
      body: JSON.stringify(body)
    };
  }
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const isLocal = process.env.AWS_SAM_LOCAL === 'true';
  const dbService = new DatabaseService({ 
    region: CONFIG.region, 
    tableName: CONFIG.tableName, 
    isLocal 
  });
  const userService = new UserService(dbService, CONFIG.initialCredits);
  const systemService = new SystemService(dbService, CONFIG.maxTotalRequests);
  const fraudService = new FraudDetectionService(dbService);
  
  const videoGenerationService = VideoGenerationServiceFactory.createService({
    apiEndpoint: CONFIG.klingApiEndpoint,
    apiKey: CONFIG.klingApiKey,
    staticMaskUrl: CONFIG.staticMaskUrl,
    dynamicMaskUrl: CONFIG.dynamicMaskUrl
  });

  const requestValidator = new RequestValidationService(PROMPT_CONFIG);
  const responseFormatter = new ResponseFormatterService();

  try {
    if (!event.body) {
      return responseFormatter.formatResponse(400, {
        success: false,
        error: 'Missing request body'
      });
    }

    const requestData: RequestEvent = JSON.parse(event.body);
    
    const validationError = requestValidator.validateRequest(requestData);
    if (validationError) {
      return responseFormatter.formatResponse(400, {
        success: false,
        error: validationError
      });
    }

    const systemRecord = await systemService.getOrCreateSystemRecord();
    if (systemService.isSystemLimitReached(systemRecord)) {
      return responseFormatter.formatResponse(429, {
        success: false,
        error: 'System request limit reached. Please try again later.'
      });
    }

    const isFraud = await fraudService.isFraudulentFingerprint(requestData.fingerprint, requestData.googleId);
    if (isFraud) {
      return responseFormatter.formatResponse(403, {
        success: false,
        error: 'This device is already registered with another account.'
      });
    }

    let userRecord = await userService.getUser(requestData.googleId);
    if (!userRecord) {
      userRecord = await userService.createUser(requestData.googleId, requestData.fingerprint);
      console.log('New user created:', userRecord);
    }

    if (userRecord.credits <= 0) {
      return responseFormatter.formatResponse(402, {
        success: false,
        error: 'No credits remaining',
        data: { remainingCredits: 0 }
      });
    }

    const promptText = PROMPT_CONFIG[requestData.promptKey];
    const result = await videoGenerationService.generateVideo(requestData.imageUrl, promptText);

    await Promise.all([
      userService.updateUserCredits(userRecord.PK),
      systemService.incrementSystemRequests()
    ]);

    return responseFormatter.formatResponse(200, {
      success: true,
      data: {
        ...result,
        remainingCredits: userRecord.credits - 1
      }
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return responseFormatter.formatResponse(500, {
      success: false,
      error: 'Internal server error'
    });
  }
};
