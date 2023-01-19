import { AdminGuard } from '@/common/guards/admin.guard';
import { JwtGuard } from '@/common/guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
@UseGuards(JwtGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  // @Get()
  // async getTagList() {
  //   return this.tagService.findAllTags();
  // }

  @Get()
  async getUserTagBySId(@Query('id') sid, @Query('classId') cid) {
    /**
     * 如果classId为空 就获取该学生的所有tag
     * 都为空获取所有tag
     */
    return this.tagService.findTagsBySid(sid, cid);
  }

  @Post('/user')
  @UseGuards(AdminGuard)
  async appendUserTagBySid(@Body() body) {
    const { tagId, studentId, classId } = body;
    return this.tagService.appendStudentTagBySid(studentId, classId, tagId);
  }
  @Delete('/user')
  async removeUserTagBySid(@Body() body) {
    const { tagId, studentId, classId } = body;
    return this.tagService.removeStudentTagBySid(studentId, classId, tagId);
  }
}
