import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly _repository: Repository<User>,
  ) {}

  public get repository() {
    return this._repository;
  }

  public async create(user: Partial<User>): Promise<User> {
    return this._repository.save(user);
  }

  public async findMany(): Promise<User[]> {
    return this._repository.find();
  }

  public async findUnique(id: string): Promise<User | null> {
    return this._repository.findOne({ where: { id } });
  }

  public async findOne(options: Partial<User>): Promise<User | null> {
    return this._repository.findOne({ where: options });
  }
}
