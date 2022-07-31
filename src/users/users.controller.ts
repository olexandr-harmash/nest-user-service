import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { AddUserRoleDto } from './dto/add.user-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { User } from './users.model';
import { JwtRolesAuthGuard } from '../creds-auth/jwt-roles.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { ValidationPipe } from '../pipes/validation.pipe';
import {UsePipes} from '@nestjs/common';

@ApiTags('users')
  @Controller('users')
  export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'create user'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
      @Post()
      create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
      }

    @ApiOperation({summary: 'fetch users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("USER")
    @UseGuards(JwtRolesAuthGuard)
      @Get()
      getAll() {
        return this.usersService.getAllUsers();
      }

    @ApiOperation({summary: 'add role to user'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(JwtRolesAuthGuard)
      @Post('/role')
      addRole(@Body() dto: AddUserRoleDto) {
        return this.usersService.addRole(dto);
      }

    @ApiOperation({summary: 'add ban to user'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(JwtRolesAuthGuard)
      @Post('/ban')
      ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
      }
  }
