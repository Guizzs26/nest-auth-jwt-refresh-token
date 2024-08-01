import { Repository } from 'typeorm';
import { Authentication } from 'src/domain/authentication/entities/authentication.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthenticationRepository extends Repository<Authentication> {
  constructor(
    @InjectRepository(Authentication)
    private readonly repository: Repository<Authentication>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
