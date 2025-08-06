# ProductMotion.ai

The landing page for ProductMotion.ai where users can test our Image-to-Video generation. Users can log in with their Google Account to access the video generation feature.

## Stack

- **AWS CloudFront + Lambda + DynamoDB**:  
  Used for hosting, business logic, and persistent storage. Includes fraud detection using FingerprintJS, which, while not perfect, helps block most fraudulent activities.
  
- **AWS SAM**:  
  Used to deploy our business logic in a serverless architecture.