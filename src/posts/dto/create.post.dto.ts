import {ApiProperty} from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({example:'harmash.alex@gmail.com', description:'user email'})
    readonly title: string;
  @ApiProperty({example:'DA@hada$)+kk2djal3', description:'user password'})
    readonly content: string;
  @ApiProperty({example:'DA@hada$)+kk2djal3', description:'user password'})
    readonly userId: number;
}
