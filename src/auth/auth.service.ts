import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create.user.dto';
import {JwtService} from '@nestjs/jwt';
import {Injectable, HttpException, HttpStatus, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  )
  {

  }
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const person = await this.userService.getUserByEmail(userDto.email);
    if (person) {
      throw new HttpException("user allready exist", HttpStatus.BAD_REQUEST)
    }
    const hash = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({...userDto, password: hash})
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const meta = {email: user.email, id: user.id, roles: user.roles};
    return {
      token: this.jwtService.sign(meta)
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({message: "invalid data"});
  }
}
