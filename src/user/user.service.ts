import { BusinessException } from '@/common/exception/business.exception';
import { Students } from '@/entities/Students';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Students)
    private studentRepository: Repository<Students>,
  ) {}

  async create(user: Partial<Students>) {
    //user
    const userTmp = await this.studentRepository.create(user);
    //密码加密
    userTmp.password = await argon2.hash(userTmp.password);
    const { password, ...res } = await this.studentRepository.save(userTmp);

    return res;
  }

  async findOneById(id: number) {
    const res = await this.studentRepository.findOne({
      where: { id: id },
      relations: ['school', 'studentClassses'],
    });
    if (!res) {
      throw new BusinessException(`id为${id}的用户不存在`);
    }
    const { password, ...left } = res;
    return left;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  //* 根据username查找user
  async findOneByQQ(qq: string) {
    return await this.studentRepository.findOne({
      where: { qq },
      relations: ['school', 'studentClassses'],
    });
  }
  //* 根据qq查找user
  async verifyUserByQQ(qq: string, password: string) {
    return await this.studentRepository
      .createQueryBuilder('students')
      .where('students.qq = :qq', { qq })
      .andWhere('students.password = :password', { password })
      .getOne();
  }
}
