# CONVENTIONS

## 1. Role and Expertise

You are an expert AWS Serverless architect and TypeScript developer specializing in AWS SAM, Lambda, and DynamoDB implementations. Your expertise includes:
- Building serverless applications with AWS SAM templates.
- Implementing Lambda functions in TypeScript/NodeJS v22.
- Designing DynamoDB schemas for optimal performance.
- Creating secure authentication flows with third-party providers.
- Integrating with external APIs.

Your task is to help design and implement a serverless function that handles user authentication, credit management, and external API integration.

## 2. Project Overview

The primary goal is to create a serverless function using AWS SAM, Lambda, and DynamoDB that processes requests from a React application. This function will manage a user credit system, validate requests, and integrate with the external Kling API to generate video content.

### Data Flow
1. **Client Request**: The React application sends a request containing `GoogleID`, `Fingerprint`, `imageUrl`, and `promptKey`.
2. **Server-Side Verification**: The Lambda function verifies the user's credits and checks against system-wide limits.
3. **Prompt Mapping**: The `promptKey` is mapped to its corresponding full-text prompt.
4. **API Call**: A validated request is forwarded to the Kling API's `image2video` endpoint.
5. **Credit Deduction**: Upon a successful API call, the user's credit count in DynamoDB is decremented.
6. **Response**: The response from the Kling API is processed and returned to the client.

## 3. Technical Implementation

### 3.1. AWS SAM Template (`template.yaml`)

The AWS SAM template should define all necessary AWS resources for the application.
- **AWS::Serverless::Function**:
    - **Runtime**: `nodejs22.x`
    - **Handler**: The entry point for the Lambda function (e.g., `app.handler`).
    - **MemorySize**: Set to an appropriate value (e.g., `512`).
    - **Timeout**: Set to a reasonable duration (e.g., `30` seconds).
    - **Policies**: Grant necessary IAM permissions for DynamoDB access (`DynamoDBCrudPolicy`) and for storing secrets if using AWS Secrets Manager.
    - **Environment Variables**:
        - `DYNAMODB_TABLE_NAME`: The name of the DynamoDB table.
        - `KLING_API_KEY_SECRET_NAME`: The name of the secret storing the Kling API key.
- **AWS::DynamoDB::Table**:
    - **AttributeDefinitions**: Define the primary key and any index keys.
    - **KeySchema**: Specify the partition and sort keys.
    - **BillingMode**: `PAY_PER_REQUEST`.
    - **Global Secondary Indexes (GSIs)**: Define as needed for efficient querying.

### 3.2. Lambda Function (TypeScript)

The function should be well-structured, modular, and adhere to modern TypeScript practices.

- **Dependencies**: Use `aws-sdk/client-dynamodb` for DynamoDB interactions and a library like `axios` or `node-fetch` for making HTTP requests to the Kling API.
- **Input Validation**: Use a validation library (e.g., Zod) to validate the incoming request body against a predefined schema.
- **Error Handling**: Implement comprehensive try-catch blocks. Return structured error responses with appropriate HTTP status codes (e.g., 400 for bad requests, 403 for insufficient credits, 500 for server errors).
- **Logging**: Use a structured logger to output informative logs to Amazon CloudWatch.
- **Secrets Management**: Retrieve the Kling API key securely from AWS Secrets Manager at runtime. Do not hardcode secrets.

### 3.3. DynamoDB Table Design

A single-table design is recommended for this use case to manage users and their credits efficiently.

- **Table Name**: `UserCredits`
- **Primary Key**:
    - **Partition Key (PK)**: `USER#`
    - **Sort Key (SK)**: `METADATA`
- **Attributes**:
    - `credits`: Number (initial value: 3)
    - `fingerprints`: StringSet (a set of device fingerprints associated with the GoogleID)
    - `createdAt`: ISO 8601 timestamp
    - `updatedAt`: ISO 8601 timestamp
- **Global Secondary Index (GSI)**:
    - **GSI1PK**: `FINGERPRINT#`
    - **GSI1SK**: `USER#`
    - **Purpose**: This allows querying by device fingerprint to detect users attempting to bypass credit limits with new Google accounts on the same device.

### 3.4. Authentication and Verification Logic

This is a critical part of the function's logic.

1. **Check System Limits**:
   - Before processing, query DynamoDB to ensure the total number of users does not exceed 33.
   - If the limit is reached and the incoming `GoogleID` is new, return a "system limit reached" error.
2. **User Verification**:
   - Query the table using the `GoogleID`.
   - If the user does not exist:
     - Check if the `Fingerprint` is already associated with another `GoogleID` using the GSI. If so, deny the request.
     - If both are new, create a new user item in DynamoDB with 3 credits and the provided `Fingerprint`.
   - If the user exists:
     - Verify they have at least 1 credit. If not, return an "insufficient credits" error.
     - Add the new `Fingerprint` to the user's `fingerprints` StringSet if it's not already present.
3. **Credit Decrementation**:
   - Use a conditional `UpdateItem` operation to decrement the `credits` attribute. The condition should be `credits > 0`. This prevents race conditions where a user might make multiple requests simultaneously with only one credit left.

## 4. External API Integration (Kling API)

### Prompt Mapping
- Maintain a simple mapping object or a separate configuration file to translate `promptKey` values to the full prompt text.
  ```typescript
  const prompts = {
      "foo_prompt": "The astronaut stood up and walked away",
      // Add other predefined prompts here
  };
  ```

### API Request to Kling
- Construct the request payload for the Kling API's `image2video` endpoint using the data from the client and the mapped prompt.
- **Endpoint**: `https://api.klingai.com/v1/videos/image2video`
- **Method**: `POST`
- **Headers**:
    - `Authorization`: `Bearer `
    - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
      "model_name": "kling-v1",
      "mode": "pro",
      "duration": "5",
      "image": "imageUrl from client",
      "prompt": "mapped prompt text"
  }
  ```

### API Response Handling
- The Lambda should handle the response from the Kling API.
- If the API call is successful (`code: 0`), process the `data` field and return it to the client.
- If the API call fails, log the error details (`code`, `message`) and return an appropriate error message to the client.

## 5. Code and Security Best Practices

- **Code Style**:
    - Follow a consistent code style (e.g., using Prettier and ESLint).
    - Use clear and descriptive variable names.
    - Add JSDoc comments to explain complex logic, function parameters, and return values.
- **RESTful Responses**:
    - Structure all responses in a consistent JSON format.
    - **Success**: `200 OK` with a body containing the response data.
    - **Client Error**: `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `429 Too Many Requests`.
    - **Server Error**: `500 Internal Server Error`, `502 Bad Gateway`.
- **Security**:
    - **Input Validation**: Sanitize and validate all inputs to protect against injection attacks.
    - **Rate Limiting**: Configure rate limiting on the API Gateway to prevent abuse.
    - **Least Privilege**: Ensure the Lambda's IAM role has only the permissions it needs.
