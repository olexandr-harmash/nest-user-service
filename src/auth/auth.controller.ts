import { Controller, Post, Body, Get, Param, UseGuards  } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create.user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
      console.log('login')
      return this.authService.login(userDto);
    }

    //@UseGuards(AuthGuard('local'))
    @Post('/register')
    register(@Body() userDto: CreateUserDto) {
      return this.authService.register(userDto);
    }
  }
