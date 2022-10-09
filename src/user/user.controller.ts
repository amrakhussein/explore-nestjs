import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { FetchUser } from 'src/auth/decorator';
import { JwtGuard } from './../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('me')
  fetchMe(@FetchUser() user: User, @FetchUser('username') username: string) {
    console.log('username: ', username);
    return user;
  }
}
