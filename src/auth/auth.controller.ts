import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //? 登录
  @Post('signin')
  async login(@Body() dto: SignInUserDto) {
    const { qq, password } = dto;
    return this.authService.signIn(qq, password);
  }
  //? 注册
  @Post('signup')
  async register(@Body() dto: SignUpUserDto) {
    return this.authService.signUp(dto);
  }
}
