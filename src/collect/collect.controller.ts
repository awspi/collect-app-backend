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
  Request,
  UseGuards,
} from '@nestjs/common';
import { CollectService } from './collect.service';

@Controller('collect')
@UseGuards(JwtGuard)
export class CollectController {
  constructor(private readonly collectService: CollectService) {}
  //查看班级collect
  @Get()
  async hello(@Query('classId') cid) {
    return this.collectService.getCollectListByCid(cid);
  }
  @Get('/detail')
  async detail(@Query('collectId') cid) {
    return this.collectService.getCollectById(cid);
  }
  @Get('/user')
  async user(@Query('userId') uid) {
    return this.collectService.getCollectListByUid(uid);
  }
  @Post()
  @UseGuards(AdminGuard)
  async publish(@Body() body, @Request() req) {
    return this.collectService.publish(req.user.userId, body);
  }
  @Patch()
  @UseGuards(AdminGuard)
  async patch(@Query('collectId') cid, @Body() body) {
    return this.collectService.patchCollect(cid, body);
  }
  @Delete()
  @UseGuards(AdminGuard)
  async delete(@Query('collectId') cid) {
    return this.collectService.delCollect(cid);
  }
}
