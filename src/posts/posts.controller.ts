import { Controller, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Post, Body, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create.post.dto';
import {FileInterceptor} from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image){
    return this.postsService.create(dto, image);
  }
}
