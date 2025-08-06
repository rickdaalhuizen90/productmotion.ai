import { DatabaseService } from './database.service';
import { SystemRecord } from '../types';

export class SystemService {
  private dbService: DatabaseService;
  private maxTotalRequests: number;

  constructor(dbService: DatabaseService, maxTotalRequests: number) {
    this.dbService = dbService;
    this.maxTotalRequests = maxTotalRequests;
  }

  async getOrCreateSystemRecord(): Promise<SystemRecord> {
    const systemKey = {
      PK: 'SYSTEM',
      SK: 'STATS'
    };
  
    const existingRecord = await this.dbService.getItem<SystemRecord>(systemKey);
    if (existingRecord) {
      return existingRecord;
    }
    
    const newSystemRecord: SystemRecord = {
      PK: 'SYSTEM',
      SK: 'STATS',
      totalRequests: 0
    };
    
    await this.dbService.putItem<SystemRecord>(newSystemRecord);
    return newSystemRecord;
  }

  async incrementSystemRequests(): Promise<void> {
    await this.dbService.updateItem(
      { PK: 'SYSTEM', SK: 'STATS' },
      'SET totalRequests = totalRequests + :inc',
      { ':inc': 1 }
    );
  }

  isSystemLimitReached(systemRecord: SystemRecord): boolean {
    return systemRecord.totalRequests >= this.maxTotalRequests;
  }
}