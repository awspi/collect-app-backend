import { ClassService } from '@/class/class.service';
import { BusinessException } from '@/common/exception/business.exception';
import { ClassCollects } from '@/entities/ClassCollects';
import { Collects } from '@/entities/Collects';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CollectService {
  constructor(
    private readonly classService: ClassService,
    @InjectRepository(ClassCollects)
    private classCollectsRepository: Repository<ClassCollects>,
    @InjectRepository(Collects)
    private collectsRepository: Repository<Collects>,
  ) {}
  async getCollectListByCid(classId) {
    const list = await this.classCollectsRepository.find({
      where: { classId },
    });
    const res = [];
    for (let i = 0; i < list.length; i++) {
      const collect = await this.getCollectById(list[i].collectId);
      res.push(collect);
    }
    return res;
  }
  async getCollectListByUid(uid) {
    const list = await this.collectsRepository.find({
      where: { publisherId: uid },
    });
    return list;
  }
  async getCollectById(id) {
    return await this.collectsRepository.findOne({
      where: { id },
    });
  }
  async publish(uid, body) {
    // //* class
    const { classId } = body;
    const stuList = await this.classService.getStudentsByCid(classId);
    const collectTemp = await this.collectsRepository.create({
      name: body.name,
      description: body.description,
      publisherId: uid,
      schoolId: body.schoolId,
      progress: '1',
      finishedPeople: 0,
      totalPeople: stuList.length,
      attachmentType: body.attachmentType,
      createTime: new Date(),
      endTime: body.endTime,
    });
    const collectRes = await this.collectsRepository.save(collectTemp);
    //classCollectsRepository
    const classCollectsTemp = await this.classCollectsRepository.create({
      classId,
      collectId: collectRes.id,
    });
    await this.classCollectsRepository.save(classCollectsTemp);
    return collectRes;
  }

  async delCollect(cid) {
    const collect = await this.collectsRepository.findOne({
      where: {
        id: cid,
      },
    });
    if (!collect) {
      throw new BusinessException('任务不存在');
    }
    const classCollect = await this.classCollectsRepository.findOne({
      where: {
        collectId: cid,
      },
    });
    await this.classCollectsRepository.remove(classCollect);
    return await this.collectsRepository.remove(collect);
  }

  async patchCollect(cid, body) {
    return await this.collectsRepository.update({ id: cid }, { ...body });
  }
}
