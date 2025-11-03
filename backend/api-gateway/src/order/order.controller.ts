import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Req,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('order')
export class OrderController {
  constructor(
    @Inject('ECOMMERCE_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request & { user: { id: number } },
  ) {
    const payload = {
      userId: req.user.id,
      productIds: createOrderDto.productIds,
    };
    return this.client.send({ cmd: 'create_order' }, payload);
  }

  @Get()
  findMyOrders(@Req() req: Request & { user: { id: number } }) {
    return this.client.send(
      { cmd: 'find_orders_for_user' },
      { userId: req.user.id },
    );
  }

  @Patch(':id/cancel')
  cancelOrder(
    @Param('id', ParseIntPipe) orderId: number,
    @Req() req: Request & { user: { id: number } },
  ) {
    return this.client.send(
      { cmd: 'cancel_order' },
      { orderId, userId: req.user.id },
    );
  }

  @Get('all')
  @Roles(Role.Admin)
  findAllOrders() {
    return this.client.send({ cmd: 'find_all_orders' }, {});
  }

  @Patch(':id/status')
  @Roles(Role.Admin)
  updateOrderStatus(
    @Param('id', ParseIntPipe) orderId: number,
    @Body() body: { status: 'PENDING' | 'COMPLETED' | 'CANCELED' },
  ) {
    return this.client.send(
      { cmd: 'update_order_status' },
      { orderId, status: body.status },
    );
  }
}
