import { User } from '@prisma/client';
import { Request } from 'express';

export interface ExpressRequestUserInterface extends Request {
  user?: User;
}
