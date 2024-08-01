import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { User } from 'src/domain/user/entities/user.entity';
import { UserService } from 'src/domain/user/services/user.service';
import { AuthenticationRepository } from 'src/shared/database/repositories/authentication.repository';
import { PostgresErrorCode } from 'src/shared/database';
import { CreateAuthenticationDto } from '../dtos/create-authentication.dto';
import { Authentication } from '../entities/authentication.entity';
import { UserAlreadyExistException } from 'src/shared/exceptions/user-already-exists.exception';
import { RegistrationDto } from '../dtos/registration.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly _authenticationRepository: AuthenticationRepository,
    private readonly _userService: UserService,
    private readonly _dataSource: DataSource,
  ) {}

  async registration(registrationDto: RegistrationDto): Promise<User> {
    let user: User;

    const queryRunner = this._dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this._validateRegistrationDto(registrationDto);

      const authentication = await this._createAuthentication(
        registrationDto,
        queryRunner,
      );

      user = await this._userService.createUser(
        registrationDto,
        authentication,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new UserAlreadyExistException();
      }

      throw new InternalServerErrorException(
        'An error occurred during registration',
      );
    } finally {
      await queryRunner.release();
    }

    return user;
  }

  private _validateRegistrationDto(dto: RegistrationDto): void {
    if (!dto.email || !dto.password) {
      throw new ConflictException('Email and password are required');
    }
  }

  private async _createAuthentication(
    createAuthenticationDto: CreateAuthenticationDto,
    queryRunner: QueryRunner,
  ): Promise<Authentication> {
    const authentication = this._authenticationRepository.create(
      createAuthenticationDto,
    );

    return queryRunner.manager.save(authentication);
  }
}
