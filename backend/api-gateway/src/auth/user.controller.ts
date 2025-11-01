import { Controller, Get, Req, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { Request } from 'express';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';

@Controller('user')
export class UserController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Get('me')
  getMe(@Req() req: Request) {
    return this.client.send({ cmd: 'get_me' }, req.user);
  }

  @Get('all')
  @Roles(Role.Admin)
  findAll() {
    return this.client.send({ cmd: 'get_all_users' }, {});
  }
}
