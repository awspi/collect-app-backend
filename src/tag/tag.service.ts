import { BusinessException } from '@/common/exception/business.exception';
import { StudentTag } from '@/entities/StudentTag';
import { Tags } from '@/entities/Tags';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tags)
    private tagsRepository: Repository<Tags>,
    @InjectRepository(StudentTag)
    private studentTagRepository: Repository<StudentTag>,
  ) {}
  async findAllTags() {
    return await this.tagsRepository.find();
  }
  async findTagById(id) {
    return await this.tagsRepository.find({ where: { id } });
  }
  async findTagsBySid(id: number) {
    const tagIdList = await this.studentTagRepository.find({
      where: {
        studentId: id,
      },
    });
    const res = [];
    for (let i = 0; i < tagIdList.length; i++) {
      res.push(await this.findTagById(tagIdList[i].tagId));
    }
    return res;
  }

  //
  async appendStudentTagBySid(id, tagId = 3) {
    const res = await this.studentTagRepository.findOne({
      where: {
        studentId: id,
        tagId,
      },
    });
    if (res) {
      throw new BusinessException('该学生已经存在此tag');
    }
    //* student_tag
    const stuTagTemp = await this.studentTagRepository.create({
      studentId: id,
      tagId,
    });
    const stuTagRes = await this.studentTagRepository.save(stuTagTemp);

    return stuTagRes;
  }
  async removeStudentTagBySid(id, tagId) {
    if (tagId === 3) {
      throw new BusinessException('"学生"tag为默认,无法删除');
    }
    const record = await this.studentTagRepository.findOne({
      where: {
        studentId: id,
        tagId,
      },
    });
    if (!record) {
      throw new BusinessException('该学生不存在此tag');
    }
    // remove
    return await this.studentTagRepository.remove(record);
  }
}
