import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  BusinessException,
  BUSINESS_ERROR_CODE,
} from '../exception/business.exception';

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw (
        err ||
        new BusinessException({
          code: BUSINESS_ERROR_CODE.TOKEN_INVALID,
          message: 'token 已失效',
        })
      );
    }
    //挂载到req
    return user;
  }
}
