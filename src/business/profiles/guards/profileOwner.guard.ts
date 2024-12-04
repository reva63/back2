import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { ResourceNotOwnedException } from 'src/exceptions/auth/resourceNotOwned.exception';

@Injectable()
export class ProfileOwnerGuard implements CanActivate {
    constructor(private profilesService: ProfilesService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const profile = await this.profilesService.show({ params: req.params });
        if (profile.user.id === req.user.id) return true;
        else throw new ResourceNotOwnedException();
    }
}
