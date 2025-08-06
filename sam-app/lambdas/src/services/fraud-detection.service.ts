import { DatabaseService } from './database.service';
import { UserRecord as UserRecordType } from '../types';

export interface UserRecord {
  PK: string;
  SK: string;
  createdAt: number;
}

export class FraudDetectionService {
  private dbService: DatabaseService;

  constructor(dbService: DatabaseService) {
    this.dbService = dbService;
  }

  /**
   * Checks if any accounts exist with the given fingerprint
   * Returns true if the fingerprint is already in use
   */
  async isFraudulentFingerprint(fingerprint: string, googleId: string): Promise<boolean> {
    try {
      const existingAccounts = await this.dbService.queryItems<UserRecord>(
        'GSI1',
        'GSI1PK = :fingerprint',
        { ':fingerprint': `FINGERPRINT#${fingerprint}` }
      );

      const fraudulentAccounts = existingAccounts.filter(account => 
        account.PK !== `USER#${googleId}`
      );

      const isFraudulent = fraudulentAccounts.length > 0;

      if (isFraudulent) {
        console.warn('Fraud detected:', {
          fingerprint,
          googleId,
          fraudulentAccounts: fraudulentAccounts.map((acc: UserRecord) => ({
            googleId: acc.PK,
          })),
        });
      }

      return isFraudulent;
    } catch (error) {
      console.error('Error checking for fraudulent fingerprint:', error);
      throw error;
    }
  }
}