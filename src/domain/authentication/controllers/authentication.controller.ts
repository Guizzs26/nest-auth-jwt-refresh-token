import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from 'src/domain/user/entities/user.entity';
import { RegistrationDto } from '../dtos/registration.dto';
import { AuthenticationService } from '../services/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly _authenticationService: AuthenticationService) {}

  @Post('registration')
  @HttpCode(HttpStatus.OK)
  async registration(@Body() registrationDto: RegistrationDto): Promise<User> {
    return this._authenticationService.registration(registrationDto);
  }
}
