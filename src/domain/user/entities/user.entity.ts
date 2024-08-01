import { AbstractEntity } from 'src/common/entities/user.abstract.entity';
import { Authentication } from 'src/domain/authentication/entities/authentication.entity';
import { Column, Entity, JoinColumn, OneToOne, Index } from 'typeorm';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column()
  public firstName: string;

  @OneToOne(
    () => Authentication,
    (authentication: Authentication) => authentication.user,
    { eager: true, nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  @Index()
  public authentication: Authentication;
}
