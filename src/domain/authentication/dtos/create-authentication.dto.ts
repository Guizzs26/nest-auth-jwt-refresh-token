import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthenticationDto {
  @IsEmail()
  @IsNotEmpty()
  readonly emailAddress: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
