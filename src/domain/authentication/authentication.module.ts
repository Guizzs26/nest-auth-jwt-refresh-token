import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationRepository } from 'src/shared/database/repositories/authentication.repository';
import { User } from 'src/domain/user/entities/user.entity';
import { Authentication } from './entities/authentication.entity';
import { UserService } from '../user/services/user.service';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Authentication]), UsersModule],
  providers: [AuthenticationService, UserService, AuthenticationRepository],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
