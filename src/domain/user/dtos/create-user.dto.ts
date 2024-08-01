import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends CreateAuthenticationDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  readonly password: string;
}
