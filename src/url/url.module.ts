import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlShortenerService } from './url-shortener.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [UrlController],
  providers: [
    UrlService,
    UrlShortenerService,
    {
      provide: 'BASE_URL',
      useValue: 'http://localhost:3000/redirect/',
    },
  ],
})
export class UrlModule {}
