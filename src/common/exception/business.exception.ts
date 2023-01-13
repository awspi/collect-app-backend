import { HttpException, HttpStatus } from '@nestjs/common';
//? 业务异常
export const BUSINESS_ERROR_CODE = {
  // 公共错误码
  COMMON: 10001,
  // 禁止访问
  ACCESS_FORBIDDEN: 10002,
  //
  TOKEN_INVALID: 10003,
};

type BusinessError = {
  code: number;
  message: string;
};

export class BusinessException extends HttpException {
  constructor(err: BusinessError | string) {
    if (typeof err === 'string') {
      err = {
        code: BUSINESS_ERROR_CODE.COMMON,
        message: err,
      };
    }
    super(err, HttpStatus.OK);
  }

  static throwForbidden() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.ACCESS_FORBIDDEN,
      message: '抱歉哦，您无此权限！',
    });
  }
}
