import { DatabaseService } from './database.service';
import { UserRecord } from '../types';

export class UserService {
  private dbService: DatabaseService;
  private initialCredits: number;

  constructor(dbService: DatabaseService, initialCredits: number) {
    this.dbService = dbService;
    this.initialCredits = initialCredits;
  }

  async getUser(googleId: string): Promise<UserRecord | null> {
    const userKey = {
      PK: `USER#${googleId}`,
      SK: 'PROFILE',
    };

    return await this.dbService.getItem<UserRecord>(userKey);
  }

  async createUser(googleId: string, fingerprint: string): Promise<UserRecord> {
    const userKey = {
      PK: `USER#${googleId}`,
      SK: 'PROFILE',
    };

    const newUser: UserRecord = {
      PK: userKey.PK,
      SK: userKey.SK,
      GSI1PK: `FINGERPRINT#${fingerprint}`,
      credits: this.initialCredits,
      totalRequests: 0,
      fingerprintHistory: [fingerprint],
      lastRequestTimestamp: Date.now(),
    };

    await this.dbService.putItem<UserRecord>(newUser);

    await this.dbService.putItem({
      PK: `FINGERPRINT#${fingerprint}`,
      SK: `USER#${googleId}`,
      createdAt: Date.now(),
    });

    return newUser;
  }

  async updateUserCredits(userPK: string): Promise<void> {
    await this.dbService.updateItem(
      { PK: userPK, SK: 'PROFILE' },
      'SET credits = credits - :dec, totalRequests = totalRequests + :inc',
      { ':dec': 1, ':inc': 1, ':min': 0 },
      'credits > :min'
    );
  }
}