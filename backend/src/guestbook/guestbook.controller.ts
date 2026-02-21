import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { CreateGuestbookDto } from './guestbook.dto';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  async findAll() {
    return this.guestbookService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateGuestbookDto) {
    return this.guestbookService.create(createDto);
  }
}