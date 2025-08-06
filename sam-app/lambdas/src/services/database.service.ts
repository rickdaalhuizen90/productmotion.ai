import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { 
  DynamoDBDocumentClient, 
  GetCommand, 
  PutCommand, 
  UpdateCommand, 
  QueryCommand 
} from '@aws-sdk/lib-dynamodb';

export class DatabaseService {
  private client: DynamoDBClient;
  private docClient: DynamoDBDocumentClient;
  private tableName: string;

  constructor(config: { region: string, tableName: string, isLocal?: boolean }) {
    const options = { region: config.region };

    if (config.isLocal) {
      console.log('Using local DynamoDB endpoint');
      const dockerHost = process.env.DOCKER_HOST_IP || 'host.docker.internal';
      this.client = new DynamoDBClient({
        ...options,
        endpoint: `http://${dockerHost}:8000`,
        credentials: { accessKeyId: 'LOCAL', secretAccessKey: 'LOCAL' }
      });
    } else {
      this.client = new DynamoDBClient(options);
    }

    this.docClient = DynamoDBDocumentClient.from(this.client);
    this.tableName = config.tableName;
  }

  async verifyConnection(): Promise<boolean> {
    try {
      console.log('Testing DynamoDB connection...');
      const command = new ListTablesCommand({});
      const result = await this.client.send(command);
      console.log('Successfully connected to DynamoDB!');
      console.log('Available tables:', result.TableNames);
      return true;
    } catch (error) {
      console.error('Failed to connect to DynamoDB:', error);
      return false;
    }
  }

  async getItem<T>(key: Record<string, any>): Promise<T | null> {
    try {
      const response = await this.docClient.send(
        new GetCommand({
          TableName: this.tableName,
          Key: key
        })
      );
      return response.Item ? (response.Item as T) : null;
    } catch (error) {
      console.error('Error getting item:', error);
      throw error;
    }
  }

  async putItem<T extends Record<string, any>>(item: T): Promise<void> {
    try {
      await this.docClient.send(
        new PutCommand({
          TableName: this.tableName,
          Item: item as Record<string, any>
        })
      );
    } catch (error) {
      console.error('Error putting item:', error);
      throw error;
    }
  }

  async updateItem(key: Record<string, any>, updateExpression: string, expressionValues: Record<string, any>, conditionExpression?: string): Promise<void> {
    try {
      const params: any = {
        TableName: this.tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionValues
      };

      if (conditionExpression) {
        params.ConditionExpression = conditionExpression;
      }

      await this.docClient.send(new UpdateCommand(params));
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  }

  async queryItems<T>(indexName: string | undefined, keyCondition: string, expressionValues: Record<string, any>, filterExpression?: string): Promise<T[]> {
    try {
      const params: any = {
        TableName: this.tableName,
        KeyConditionExpression: keyCondition,
        ExpressionAttributeValues: expressionValues
      };

      if (indexName) {
        params.IndexName = indexName;
      }

      if (filterExpression) {
        params.FilterExpression = filterExpression;
      }

      const response = await this.docClient.send(new QueryCommand(params));
      return (response.Items || []) as T[];
    } catch (error) {
      console.error('Error querying items:', error);
      throw error;
    }
  }
}