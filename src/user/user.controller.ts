import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }
}
