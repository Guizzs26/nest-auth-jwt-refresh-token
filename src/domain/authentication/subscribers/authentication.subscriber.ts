import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Authentication } from '../entities/authentication.entity';
import { AuthenticationProvider } from '../providers/authentication.provider';

@EventSubscriber()
export class AuthenticationSubscriber
  implements EntitySubscriberInterface<Authentication>
{
  listenTo() {
    return Authentication;
  }

  async beforeInsert({ entity }: InsertEvent<Authentication>): Promise<void> {
    if (entity.password) {
      entity.password = await AuthenticationProvider.generateHash(
        entity.password,
      );
    }

    if (entity.emailAddress) {
      entity.emailAddress = entity.emailAddress.toLowerCase();
    }
  }

  async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<Authentication>): Promise<void> {
    if (entity.password) {
      const password = await AuthenticationProvider.generateHash(
        entity.password,
      );

      if (password !== databaseEntity?.password) {
        entity.password = password;
      }
    }
  }
}
