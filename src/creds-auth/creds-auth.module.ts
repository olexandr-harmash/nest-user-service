import { Module, forwardRef } from '@nestjs/common';
import { CredsAuthService } from './creds-auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule],
  providers: [CredsAuthService, LocalStrategy, JwtStrategy]
})
export class CredsAuthModule {}
