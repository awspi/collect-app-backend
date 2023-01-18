import { JwtGuard } from '@/common/guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
@UseGuards(JwtGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getTagList() {
    return this.tagService.findAllTags();
  }

  @Get('/:id')
  async getUserTagBySId(@Param() params) {
    return this.tagService.findTagsBySid(params.id);
  }

  @Post('/user')
  async appendUserTagBySid(@Body() body) {
    const { tagId, studentId } = body;
    return this.tagService.appendStudentTagBySid(studentId, tagId);
  }

  @Delete('/user')
  async removeUserTagBySid(@Body() body) {
    const { tagId, studentId } = body;
    return this.tagService.removeStudentTagBySid(studentId, tagId);
  }
}
