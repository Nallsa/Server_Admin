import { Admin } from '@prisma/client';

export type AdminTypes = Omit<Admin, 'password'>;
