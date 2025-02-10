import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

export type ShortenedURL = {
  originalURL: string;
  shortCode: string;
  createdAt: Date;
  visits: number;
};

@Injectable()
export class UrlShortenerService {
  private urlDatabase: Map<string, ShortenedURL>;

  constructor(@Inject('BASE_URL') private readonly baseURL: string) {
    this.urlDatabase = new Map();
  }

  private generateShortCode(): string {
    const bytes = crypto.randomBytes(8);
    return bytes.toString('base64url').slice(0, 6);
  }

  public shorten(originalURL: string): string {
    try {
      new URL(originalURL);
    } catch {
      throw new Error('Invalid URL provided');
    }

    const shortCode = this.generateShortCode();

    this.urlDatabase.set(shortCode, {
      originalURL,
      shortCode,
      createdAt: new Date(),
      visits: 0,
    });

    return shortCode;
  }
}
