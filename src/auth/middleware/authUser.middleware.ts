import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequestUserInterface } from 'src/types/expressUserRequest.interface';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../user.config/user.config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  public async use(
    req: ExpressRequestUserInterface,
    res: Response,
    next: NextFunction,
  ) {
    if (!req.headers.authorization) {
      req.user = null;
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

      const user = await this.userService.findOne(decode.id);
      req.user = user;

      next();
    } catch (e) {
      req.user = null;
      next();
    }
  }
}
