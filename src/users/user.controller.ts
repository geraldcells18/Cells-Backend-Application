import { UserService } from './user.service';
import { Users } from 'src/entities/account.entity';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async register(@Body() model: Users) {
    const encrypted = await this.userService.encryptPassword(model.password);
    model.password = encrypted;
    return this.userService.saveUser(model);
  }

  @Post('/login')
  async login(@Body() model: Users) {
    const encrypted = await this.userService.encryptPassword(model.password);
    model.password = encrypted;
    return this.userService.checkUserCredentials(
      model.username,
      model.password,
    );
  }
}
