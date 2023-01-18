import { Students } from '@/entities/Students';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { jwtConstants } from '@/common/guards/constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TagService } from '@/tag/tag.service';
import { StudentTag } from '@/entities/StudentTag';
import { Tags } from '@/entities/Tags';
import { JWTStrategy } from './auth.strategy';
@Module({
  imports: [
    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([Students, StudentTag, Tags]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, TagService],
  exports: [AuthService],
})
export class AuthModule {}
