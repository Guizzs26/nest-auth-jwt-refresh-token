import { Repository } from 'typeorm';
import { Authentication } from 'src/domain/authentication/entities/authentication.entity';

export class AuthenticationRepository extends Repository<Authentication> {}
