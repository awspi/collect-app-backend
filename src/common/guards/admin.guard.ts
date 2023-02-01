import { Students } from '@/entities/Students';
import { UserService } from '@/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BusinessException } from '../exception/business.exception';

@Injectable()
export class AdminGuard implements CanActivate {
  // 常见的错误：在使用AdminGuard未导入UserModule
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 获取请求对象
    const req = context.switchToHttp().getRequest();
    // 2. 获取请求中的用户信息进行逻辑上的判断
    const user = (await this.userService.findOneById(
      req.user.userId,
    )) as Students;
    const classList = user.studentClassses;
    const classId = parseInt(
      req.body?.classId ? req.body.classId : req.query.classId,
    );

    const targetClass = classList.find((item) => item.classId === classId);

    if (targetClass?.permisson === 1) {
      return true;
    }
    return false;
  }
}
