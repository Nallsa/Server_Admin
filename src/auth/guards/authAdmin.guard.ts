import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ExpressRequestAdminInterface } from 'src/types/expressAdminRequest.interface';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestAdminInterface>();

    if (request.admin) {
      return true;
    }

    throw new HttpException('Not Autorized', HttpStatus.UNAUTHORIZED);
  }
}
