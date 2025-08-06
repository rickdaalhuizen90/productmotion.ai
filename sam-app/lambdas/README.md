## 1. Build and Bundle Application

```bash
pnpm run compile
pnpm run bundle
```

## 2. Set Up Local DynamoDB
Start a local DynamoDB instance:

```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

## 3. Create the DynamoDB table locally
```bash
aws dynamodb create-table \
  --table-name UserCreditsTable \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
    AttributeName=GSI1PK,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH \
    AttributeName=SK,KeyType=RANGE \
  --global-secondary-indexes \
    "IndexName=GSI1,KeySchema=[{AttributeName=GSI1PK,KeyType=HASH}],Projection={ProjectionType=ALL}" \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000
```

## 4. Start local API Gateway with DynamoDB endpoint configuration
```bash
sam local start-api --env-vars ./env.json --docker-network host --static-dir ./lambdas/dist --debug
```

## 5. Testing API

With Invoking Event
```bash
sam local invoke -e ./events/event.json KlingProcessorFunction
```

With Curl
```bash
curl --location 'http://localhost:3000/process' \
--header 'Content-Type: application/json' \
--data-raw '{
  "googleId": "112233445566778899001",
  "fingerprint": "a1b2c3d4e5f6g7h8i9j0",
  "imageUrl": "https://example.com/image.jpg",
  "promptKey": "foo_prompt"
}'
```

## can Database
```bash
aws dynamodb scan \
  --table-name UserCreditsTable \
  --endpoint-url http://localhost:8000
```

## 7. Delete Item from Database
```bash
aws dynamodb delete-item \
  --table-name UserCreditsTable \
  --key '{"PK":{"S":"USER#112233445566778899001"},"SK":{"S":"PROFILE"}}' \
  --endpoint-url http://localhost:8000
```