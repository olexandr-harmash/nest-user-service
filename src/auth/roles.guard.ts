import {CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from '@nestjs/jwt';
import {Reflector} from '@nestjs/core'
import {ROLES_KEY} from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  )
  {

  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
          context.getHandler(),
          context.getClass(),
        ]
      );
      if (!roles) {
        return true;
      }
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({message: "invalid data"});
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      return user.roles.some(role => roles.includes(role.value));
    } catch (err) {
        throw new HttpException("invalid data", HttpStatus.FORBIDDEN);
    }

    return false;
  }
}
