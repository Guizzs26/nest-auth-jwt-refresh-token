import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Authentication } from '../../authentication/entities/authentication.entity';
import { QueryRunner } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UsersRepository) {}

  async createUser(
    createUserDto: CreateUserDto,
    authentication: Authentication,
    queryRunner: QueryRunner,
  ): Promise<User> {
    if (
      !createUserDto.firstName ||
      !createUserDto.emailAddress ||
      !createUserDto.password
    ) {
      throw new BadRequestException(
        'All required fields (firstName, emailAddress, password) must be provided',
      );
    }

    const user = this._userRepository.create({
      ...createUserDto,
      authentication,
    });

    try {
      console.log('Saving user...');
      return await queryRunner.manager.save(user);
    } catch (error) {
      console.error('Error saving user:', error);
      throw new BadRequestException('Failed to create user');
    }
  }

  async findUserById(uuid: string): Promise<User> {
    const user = await this._userRepository.findOne({ where: { uuid } });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this._userRepository.findOne({
      where: { authentication: { emailAddress: email } },
      relations: ['authentication'],
    });
  }
}
