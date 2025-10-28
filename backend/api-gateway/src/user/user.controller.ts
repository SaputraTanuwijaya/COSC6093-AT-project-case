import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { PrismaService } from '../prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }

  @Get('all')
  @Roles(Role.Admin)
  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, role: true },
    });
  }
}
