import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '@/common/guards/constants';

@Injectable()
//! Strategy必须从passport-jwt取出!!!@#!!@!@ -local也有一个 麻了
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload) {
    //req.user
    return { userId: payload.sub, classList: payload.classList };
  }
}
