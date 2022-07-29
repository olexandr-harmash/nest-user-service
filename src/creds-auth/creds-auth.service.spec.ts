import { Test, TestingModule } from '@nestjs/testing';
import { CredsAuthService } from './creds-auth.service';

describe('CredsAuthService', () => {
  let service: CredsAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredsAuthService],
    }).compile();

    service = module.get<CredsAuthService>(CredsAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
