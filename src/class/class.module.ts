import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classes } from '@/entities/Classes';
import { StudentClassses } from '@/entities/StudentClassses';
import { Students } from '@/entities/Students';

@Module({
  imports: [TypeOrmModule.forFeature([Classes, StudentClassses, Students])],
  providers: [ClassService],
  controllers: [ClassController],
})
export class ClassModule {}
