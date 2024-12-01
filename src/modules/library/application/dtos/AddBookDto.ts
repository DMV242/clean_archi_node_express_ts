import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @Length(1, 255)
  title!: string;

  @IsString()
  @Length(1, 255)
  author!: string;

  @IsString()
  @Length(1, 255)
  genre!: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}


