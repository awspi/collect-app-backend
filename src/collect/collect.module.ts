import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collects } from '@/entities/Collects';
import { ClassCollects } from '@/entities/ClassCollects';
import { Students } from '@/entities/Students';
import { StudentClassses } from '@/entities/StudentClassses';
import { ClassService } from '@/class/class.service';
import { Classes } from '@/entities/Classes';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Collects,
      ClassCollects,
      StudentClassses,
      Students,
      Classes,
    ]),
  ],
  providers: [CollectService, ClassService],
  controllers: [CollectController],
})
export class CollectModule {}
