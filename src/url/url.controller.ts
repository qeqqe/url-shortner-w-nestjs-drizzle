import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { UrlService } from './url.service';

type CreateShortUrlDto = {
  userId: string;
  url: string;
};

@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Get('url')
  async getAllShortUrls() {
    return this.urlService.getAllShortUrl();
  }

  @Post('url')
  async shortendUrl(@Body() request: CreateShortUrlDto) {
    return this.urlService.shortenUrl(request.userId, request.url);
  }

  @Get('redirect/:shortCode')
  @Redirect()
  async redirectToLongUrl(@Param('shortCode') shortCode: string) {
    const url = await this.urlService.getLongUrl(shortCode);
    return { url: url.longUrl };
  }
}
