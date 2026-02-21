import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateGuestbookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  message: string;
}
