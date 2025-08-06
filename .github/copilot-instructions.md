# Copilot Instructions

## Project Framework & Libraries

This project uses:
- React 19 with TypeScript
- React Router v7 framework mode
- Tailwind CSS v4 for styling
- AWS SAM for serverless backend infrastructure
- DynamoDB for persistent storage
- Node.js 22.x for Lambda functions

## Folder Structure

The project is organized as follows:
```
.
├── client/         # Frontend React application
│   ├── app/        # React app source code
│   ├── build/      # Production build output
│   ├── content/    # Static content (e.g., case studies)
│   ├── public/     # Public assets (e.g., favicon)
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── sam-app/        # AWS SAM backend application
│   ├── lambdas/    # Lambda function source code
│   ├── events/     # Sample event payloads
│   ├── template.yaml # SAM template for infrastructure
│   ├── package.json
│   └── tsconfig.json
└── README.md       # Project documentation
```

### Client Folder Structure

The `client/` folder contains the React application:
```
client/
├── app/
│   ├── assets/         # Static assets (images, videos, etc.)
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── layout/         # Layout components (e.g., Navbar, Footer)
│   ├── lib/            # Utility functions and libraries
│   ├── routes/         # Route components
│   ├── services/       # API calls and data handling
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Helper functions
├── build/              # Production build output
├── content/            # Static content (e.g., case studies)
├── public/             # Public assets (e.g., favicon)
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### SAM App Folder Structure

The `sam-app/` folder contains the AWS SAM backend application:
```
sam-app/
├── lambdas/
│   ├── src/            # Lambda function source code
│   ├── tests/          # Unit tests for Lambda functions
│   ├── .eslintrc.js    # ESlint configuration
│   ├── package.json
│   └── tsconfig.json
├── events/             # Sample event payloads
├── template.yaml       # SAM template for infrastructure
├── samconfig.toml      # SAM configuration file
└── env.json            # Environment variables
```

## Coding Standards

- Use functional components with hooks for React.
- Prefer named exports over default exports.
- Use TypeScript types/interfaces for all components and functions.
- Keep components and functions small and focused on a single responsibility.
- Separate business logic from UI components in the frontend.
- Use environment variables for sensitive data (e.g., API keys).

## React Best Practices

- Follow SOLID principles:
  - **S**ingle Responsibility: Each component should do one thing well.
  - **O**pen/Closed: Components should be open for extension but closed for modification.
  - **L**iskov Substitution: Components should be replaceable with their subtypes.
  - **I**nterface Segregation: Prefer multiple specific props over one large props object.
  - **D**ependency Inversion: Depend on abstractions, not concrete implementations.
- Use React Router v7 loaders and actions for data fetching.
- Avoid prop drilling by using context or composition.
- Implement proper error boundaries.
- Use React.memo() for expensive renders only when necessary.
- Implement accessibility (a11y) best practices.

## Backend Best Practices

- Use AWS SAM for defining and deploying serverless infrastructure.
- Use DynamoDB for persistent storage with efficient key design.
- Implement proper error handling in Lambda functions.
- Use environment variables for configuration.
- Write unit tests for Lambda functions.

## Deployment Pipeline

### Frontend Deployment

1. Build the React app:
   ```bash
   pnpm run build
   ```
2. Deploy the build output to an AWS S3 bucket:
   ```bash
   aws s3 sync client/build/ s3://your-s3-bucket-name
   ```
3. Optionally, integrate Amazon CloudFront for global content delivery.

### Backend Deployment

1. Build the SAM application:
   ```bash
   sam build
   ```
2. Deploy the SAM stack:
   ```bash
   sam deploy --guided
   ```
3. Use `samconfig.toml` for consistent deployment configurations.

## Additional Notes

- Ensure environment variables and IAM roles are correctly configured for secure inter-service communication.
- Use consistent naming conventions and tags across AWS resources to simplify maintenance and cost tracking.