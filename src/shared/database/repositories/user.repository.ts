import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
