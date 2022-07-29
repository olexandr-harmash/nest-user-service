import {ApiProperty} from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({example:'harmash.alex@gmail.com', description:'user email'})
    readonly value: string;
  @ApiProperty({example:'DA@hada$)+kk2djal3', description:'user password'})
    readonly description: string;
}
