import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Students } from '@/entities/Students';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassService } from '@/class/class.service';
import { Classes } from '@/entities/Classes';
import { StudentClassses } from '@/entities/StudentClassses';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Students, Classes, StudentClassses])],
  controllers: [UserController],
  providers: [UserService, ClassService],
  exports: [UserService],
})
export class UserModule {}
