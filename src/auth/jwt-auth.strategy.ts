import { IStrategyOptions, Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

// name: 'local' 默认值，也可以自定义
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    // 这里默认不用配置，假设的是你的User实体中属性名为username和password
    // 如果不是的话，需要手动指定是usernameField:xx和passwordField:xxx
    super({
      usernameField: 'id',
      // passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(xh: string) {
    //能到这里来说明一定是一个之前签过名的用户，不然不会进到该函数，直接返回401错误了
    const user = this.authService.validateUser(xh);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
