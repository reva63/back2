import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthUser } from 'src/core/abstract/interfaces/authUser.interface';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): IAuthUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
