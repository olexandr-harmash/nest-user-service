import { Module } from '@nestjs/common';
import { CredsAuthService } from './creds-auth.service';

@Module({
  providers: [CredsAuthService]
})
export class CredsAuthModule {}
