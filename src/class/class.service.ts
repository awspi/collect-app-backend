import { BusinessException } from '@/common/exception/business.exception';
import { Classes } from '@/entities/Classes';
import { StudentClassses } from '@/entities/StudentClassses';
import { Students } from '@/entities/Students';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Classes)
    private classRepository: Repository<Classes>,
    @InjectRepository(StudentClassses)
    private classStuRepository: Repository<StudentClassses>,
    @InjectRepository(Students)
    private stuRepository: Repository<Students>,
  ) {}
  async joinClass(studentId, classId) {
    const res = await this.classStuRepository.findOne({
      where: {
        studentId,
        classId,
      },
    });
    if (res) {
      throw new BusinessException('学生已在班级中');
    }
    //* class stu
    const classStuTemp = await this.classStuRepository.create({
      studentId,
      classId,
    });
    const classStuRes = await this.classStuRepository.save(classStuTemp);

    return classStuRes;
  }
  async quitClass(studentId, classId) {
    const res = await this.classStuRepository.findOne({
      where: {
        studentId,
        classId,
      },
    });
    if (!res) {
      throw new BusinessException('学生已不在班级中');
    }
    return await this.classStuRepository.remove(res);
  }

  async removeStuFromClass(studentId, classId) {
    const res = await this.classStuRepository.findOne({
      where: {
        studentId,
        classId,
      },
    });
    if (!res) {
      throw new BusinessException('学生已不在班级中');
    }
    return await this.classStuRepository.remove(res);
  }
  async setStuPermission(studentId, classId, permission) {
    const res = await this.classStuRepository.findOne({
      where: {
        studentId,
        classId,
      },
    });
    if (!res) {
      throw new BusinessException('学生已不在班级中');
    }
    return await this.classStuRepository.update(
      {
        studentId,
        classId,
      },
      { permisson: permission },
    );
  }

  async getClassBySid(schoolId) {
    return await this.classRepository.find({
      where: { schoolId },
    });
  }

  async getStudentsByCid(classId) {
    const res = await this.classStuRepository.find({
      where: { classId },
    });
    const stuList = [];
    for (let i = 0; i < res.length; i++) {
      const { password, ...stu } = await this.stuRepository.findOne({
        where: { id: res[i].studentId },
      });
      stuList.push({
        ...stu,
        permisson: res[i].permisson,
      });
    }
    return stuList;
  }

  async createClass(name, schoolId) {
    const res = await this.classRepository.findOne({
      where: {
        name,
        schoolId,
      },
    });
    if (res) {
      throw new BusinessException('班级已存在');
    }
    //* class
    const classTemp = await this.classRepository.create({
      name,
      schoolId,
    });
    const classRes = await this.classRepository.save(classTemp);

    return classRes;
  }

  async getClassNameById(id) {
    const { name } = await this.classRepository.findOne({ where: { id } });
    return name;
  }
}
