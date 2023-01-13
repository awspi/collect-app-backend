import { Public } from '@/common/guards/constants';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //? 登录
  @Public()
  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body.xh, body.password);
  }
}
