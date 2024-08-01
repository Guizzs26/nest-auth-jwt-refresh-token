import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/shared/database/repositories/user.repository';
import { User } from './entities/user.entity';
import { UsersService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository, UsersService],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}
