import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ExpressRequestAdminInterface } from 'src/types/expressAdminRequest.interface';

export const Admin = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<ExpressRequestAdminInterface>();

    if (!request.admin) {
      return null;
    }

    if (data) {
      return request.admin[data];
    }

    return request.admin;
  },
);
