import { Admin } from '@prisma/client';
import { Request } from 'express';

export interface ExpressRequestAdminInterface extends Request {
  req: { email: string; phone: string; name: string; role: "ADMIN"; isActive: true; password: string; };
  admin?: Admin;
}
