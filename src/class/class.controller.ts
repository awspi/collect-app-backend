import { AdminGuard } from '@/common/guards/admin.guard';
import { JwtGuard } from '@/common/guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';

@Controller('class')
@UseGuards(JwtGuard)
export class ClassController {
  constructor(private readonly classServe: ClassService) {}
  //查看学校班级
  @Get()
  async hello(@Query('schoolId') sid) {
    return this.classServe.getClassBySid(sid);
  }
  //查看班级成员
  @Get('/stu')
  async getClassStu(@Query('classId') cid) {
    return this.classServe.getStudentsByCid(cid);
  }
  //加入班级
  @Post('/join')
  async joinClass(@Body() body) {
    return this.classServe.joinClass(body.userId, body.classId);
  }
  //退出班级
  @Post('/quit')
  async quitClass(@Body() body) {
    return this.classServe.quitClass(body.userId, body.classId);
  }
  //移除学生
  @Post('/remove')
  @UseGuards(AdminGuard)
  async removeStuFromClass(@Body() body) {
    return this.classServe.removeStuFromClass(body.userId, body.classId);
  }
  //修改用户权限
  @Patch('/permission')
  @UseGuards(AdminGuard)
  async setStuPermission(@Body() body) {
    return this.classServe.setStuPermission(
      body.userId,
      body.classId,
      body.permission,
    );
  }
  //新建班级
  @Post('/new')
  async createNewClass(@Body() body) {
    return this.classServe.createClass(body.name, body.school_id);
  }
}
