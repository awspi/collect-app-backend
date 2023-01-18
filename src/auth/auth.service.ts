import { BusinessException } from '@/common/exception/business.exception';
import { TagService } from '@/tag/tag.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UserService } from '@/user/user.service';
import { Injectable, ParseIntPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly TagService: TagService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(id: string) {
    //连接数据库，根据qq查找用户的操作，练习时可以硬编码
    const user = await this.userService.findOneById(parseInt(id));
    if (user) {
      return user;
    }
    return null;
  }

  async signIn(qq: string, password: string) {
    const { password: pwd, ...res } = await this.userService.findOneByQQ(qq);
    const isPasswordValid = await argon2.verify(pwd, password);
    if (!res || !isPasswordValid) {
      throw new BusinessException('登录失败,请检查账号/密码是否正确');
    }

    return {
      res,
      access_token: await this.jwtService.signAsync({
        sub: res.id,
        classList: res.studentClassses,
      }),
    };
  }
  async signUp(dto: SignUpUserDto) {
    const user = await this.userService.findOneByQQ(dto.qq);
    if (user) {
      throw new BusinessException('用户已存在');
    }
    //stu
    const res = await this.userService.create(dto);
    //tag
    const tagRes = await this.TagService.appendStudentTagBySid(res.id, 3);
    return res;
  }
}
