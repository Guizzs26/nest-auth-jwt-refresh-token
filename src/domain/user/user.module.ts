import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/shared/database/repositories/user.repository';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository, UserService],
  controllers: [],
  exports: [UserService],
})
export class UsersModule {}
