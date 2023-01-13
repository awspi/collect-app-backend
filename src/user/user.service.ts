import { BusinessException } from '@/common/exception/business.exception';
import { Public } from '@/common/guards/constants';
import { Students } from '@/entities/Students';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Students)
    private studentRepository: Repository<Students>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    const res = await this.studentRepository
      .createQueryBuilder('students')
      .where('students.id = :id', { id })
      .getOne();
    if (!res) {
      throw new BusinessException(`id为${id}的用户不存在`);
    }
    const { password, ...left } = res;
    return left;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  //* 根据username查找user
  async findOneByXh(xh: string) {
    return this.studentRepository
      .createQueryBuilder('students')
      .where('students.xh = :xh', { xh })
      .getOne();
  }
  //* 根据username查找user
  async verifyUser(xh: string, password: string) {
    return this.studentRepository
      .createQueryBuilder('students')
      .where('students.xh = :xh', { xh })
      .andWhere('students.password = :password', { password })
      .getOne();
  }
}
