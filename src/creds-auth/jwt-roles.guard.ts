import {ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core'
import {ROLES_KEY} from '../auth/roles-auth.decorator';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRolesAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const roles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      );
      if (!roles) {
        return false;
      }

      if (!await super.canActivate(context)) {
        return false;
      }

      return req.user.roles.some(
        (role: any) => roles.includes(role.value)
      );
    } catch (err) {
        throw new HttpException("not data", HttpStatus.FORBIDDEN);
    }
  }
}
