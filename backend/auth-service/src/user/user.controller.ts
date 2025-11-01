import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
// import { Role } from '../auth/role.enum';

@Controller()
export class UserController {
  constructor(private prisma: PrismaService) {}

  @MessagePattern({ cmd: 'get_me' })
  getMe(@Payload() user: { id: number; email: string; role: string }) {
    return user;
  }

  @MessagePattern({ cmd: 'get_all_users' })
  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, role: true },
    });
  }
}
