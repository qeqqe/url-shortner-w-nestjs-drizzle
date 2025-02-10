import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import * as urlSchema from './url.schema';
import { UrlShortenerService } from './url-shortener.service';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';

@Injectable()
export class UrlService {
  constructor(
    @Inject(DRIZZLE)
    private drizzle: NodePgDatabase<typeof urlSchema>,
    private urlShortener: UrlShortenerService,
    @Inject('BASE_URL') private readonly baseURL: string,
  ) {}

  async getAllShortUrl() {
    return this.drizzle.query.urls.findMany();
  }

  async shortenUrl(userId: string, longUrl: string) {
    // Check if URL already exists
    const existing = await this.drizzle.query.urls.findFirst({
      where: eq(urlSchema.urls.longUrl, longUrl),
    });

    if (existing) {
      return existing;
    }

    const shortCode = this.urlShortener.shorten(longUrl);
    const fullShortUrl = `${this.baseURL}${shortCode}`;

    const urlData = {
      id: randomUUID(),
      longUrl,
      shortUrl: fullShortUrl,
      userId,
    };

    return await this.drizzle.insert(urlSchema.urls).values(urlData);
  }

  async getLongUrl(shortCode: string) {
    const shortUrl = `${this.baseURL}${shortCode}`;
    const url = await this.drizzle.query.urls.findFirst({
      where: eq(urlSchema.urls.shortUrl, shortUrl),
    });

    if (!url) {
      throw new NotFoundException('Short URL not found');
    }

    return url;
  }
}
