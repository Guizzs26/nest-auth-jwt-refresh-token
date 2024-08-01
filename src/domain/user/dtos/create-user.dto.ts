import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateAuthenticationDto } from 'src/domain/authentication/dtos/create-authentication.dto';

export class CreateUserDto extends CreateAuthenticationDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  readonly password: string;
}
