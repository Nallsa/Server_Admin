import { UserTypes } from './user.types';

export interface UserResponseInterface {
  user: UserTypes & { token: string };
}
