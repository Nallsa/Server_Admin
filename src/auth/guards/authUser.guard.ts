import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ExpressRequestUserInterface } from 'src/types/expressUserRequest.interface';

@Injectable()
export class AuthUserGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestUserInterface>();

    if (request.user) {
      return true;
    }

    throw new HttpException('Not Autorized', HttpStatus.UNAUTHORIZED);
  }
}
