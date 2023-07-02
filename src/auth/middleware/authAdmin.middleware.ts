import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequestAdminInterface } from 'src/types/expressAdminRequest.interface';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../user.config/user.config';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthAdminMiddleware implements NestMiddleware {
  constructor(private readonly adminService: AdminService) {}

  public async use(
    req: ExpressRequestAdminInterface,
    res: Response,
    next: NextFunction,
  ) {
    if (!req.headers.authorization) {
      req.admin = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, JWT_SECRET);

      if (typeof decode === 'string') {
        console.error(`verify returns string ${decode}`);
        return;
      }

      const admin = await this.adminService.findOne(decode.id);
      req.admin = admin;

      next();
    } catch (e) {
      req.admin = null;
      next();
    }
  }
}
