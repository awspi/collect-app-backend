import { Students } from '@/entities/Students';
import { UserService } from '@/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';

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

    //todo const classId=?
    // const isAdmin=classList.find(item=>item.classId===classId)?.permisson===1
    // if (isAdmin) {
    //   return true;
    // }
    return false;
  }
}
