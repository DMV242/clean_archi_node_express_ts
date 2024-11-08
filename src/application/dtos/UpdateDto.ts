import { IsString, Length, IsBoolean, IsOptional } from 'class-validator';

export class UpdateBookDTO {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  author?: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  genre?: string;
}
