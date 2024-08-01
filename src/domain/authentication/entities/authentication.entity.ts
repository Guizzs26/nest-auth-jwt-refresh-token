import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/entities/user.abstract.entity';
import { User } from 'src/domain/user/entities/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity({ name: 'authentications' })
export class Authentication extends AbstractEntity {
  @Column({ unique: true })
  public emailAddress: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => User, (user: User) => user.authentication)
  @Exclude()
  public user: User;
}
