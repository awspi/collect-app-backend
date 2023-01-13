import { BusinessException } from '@/common/exception/business.exception';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(xh: string) {
    //连接数据库，根据username查找用户的操作，练习时可以硬编码
    const user = await this.userService.findOneByXh(xh);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(xh: string, password: string) {
    const res = await this.userService.verifyUser(xh, password);
    if (!res) {
      throw new BusinessException('登录失败,请检查账号/密码是否正确');
    }
    return {
      res,
      access_token: this.jwtService.sign({ xh }),
    };
  }
}
