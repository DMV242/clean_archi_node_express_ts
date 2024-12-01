import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 128)
  password!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  lastName!: string;
}
