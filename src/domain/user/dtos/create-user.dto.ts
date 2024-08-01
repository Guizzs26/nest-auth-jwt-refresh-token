import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAuthenticationDto } from 'src/domain/authentication/dtos/create-authentication.dto';

export class CreateUserDto extends CreateAuthenticationDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
}
