import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ExpressRequestUserInterface } from 'src/types/expressUserRequest.interface';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<ExpressRequestUserInterface>();

  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
});
