import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getConfig } from './utils';
import { ConfigModule } from '@nestjs/config';
import { Attachments } from './entities/Attachments';
import { ClassCollects } from './entities/ClassCollects';
import { Classes } from './entities/Classes';
import { Collects } from './entities/Collects';
import { Schools } from './entities/Schools';
import { Students } from './entities/Students';
import { Tasks } from './entities/Tasks';
import { UserModule } from './user/user.module';
import { StudentTag } from './entities/StudentTag';
import { StudentClassses } from './entities/StudentClassses';
import { Tags } from './entities/Tags';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   ignoreEnvFile: true,
    //   isGlobal: true,
    //   load: [getConfig],
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'jiaozuoye',
      //todo 更优雅的写法 provider
      entities: [
        Attachments,
        ClassCollects,
        Classes,
        Collects,
        Schools,
        StudentClassses,
        Students,
        StudentTag,
        Tags,
        Tasks,
      ],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
