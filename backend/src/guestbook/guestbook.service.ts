import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { supabaseRest } from '../supabase';
import { CreateGuestbookDto } from './guestbook.dto';

@Injectable()
export class GuestbookService {

  async findAll() {
    try {
      const response = await supabaseRest.get('/guestbook', {
        params: {
          select: '*',
          order: 'created_at.desc',
        },
      });
      return response.data;
    } catch (err) {
      console.error('GET error:', err?.response?.data || err.message);
      throw new InternalServerErrorException('Failed to fetch guestbook entries');
    }
  }

  async create(dto: CreateGuestbookDto) {
    if (!dto.name?.trim()) throw new BadRequestException('Name is required');
    if (!dto.message?.trim()) throw new BadRequestException('Message is required');

    try {
      const response = await supabaseRest.post('/guestbook', {
        name: dto.name.trim(),
        message: dto.message.trim(),
      });
      return Array.isArray(response.data) ? response.data[0] : response.data;
    } catch (err) {
      console.error('POST error:', err?.response?.data || err.message);
      throw new InternalServerErrorException('Failed to create guestbook entry');
    }
  }
}
