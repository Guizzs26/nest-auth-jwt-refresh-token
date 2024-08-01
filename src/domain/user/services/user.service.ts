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
    // Validação simples (ajuste conforme necessário)
    if (!createUserDto.email || !createUserDto.password) {
      throw new BadRequestException('Email and password are required');
    }

    // Criar o usuário com os dados fornecidos
    const user = this._userRepository.create({
      ...createUserDto,
      authentication,
    });

    try {
      return await queryRunner.manager.save(user);
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  async findUserById(id: string): Promise<User> {
    const user = await this._userRepository.findUnique(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this._userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }
}
