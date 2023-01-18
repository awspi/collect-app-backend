export const jwtConstants = {
  secret: 'pithy', // 秘钥，不对外公开。
  expiresIn: '48h', // 时效时长
  ignoreExpiration: true, // 是否忽略 token 时效
};
