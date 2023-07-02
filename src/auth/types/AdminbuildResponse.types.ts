import { AdminTypes } from './admin.types';

export interface AdminResponseInterface {
  admin: AdminTypes & { token: string };
}
