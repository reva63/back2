import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ResourceNotOwnedException } from 'src/exceptions/auth/resourceNotOwned.exception';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserOwnerGuard implements CanActivate {
    constructor(private usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const user = await this.usersService.show({ params: req.params });
        if (user.id === req.user.id) return true;
        else throw new ResourceNotOwnedException();
    }
}
