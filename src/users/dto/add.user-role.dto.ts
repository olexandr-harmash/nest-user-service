import {ApiProperty} from '@nestjs/swagger';

export class AddUserRoleDto {
  @ApiProperty({example:'harmash.alex@gmail.com', description:'user email'})
    readonly userId: string;
  @ApiProperty({example:'DA@hada$)+kk2djal3', description:'user password'})
    readonly value: string;
}
