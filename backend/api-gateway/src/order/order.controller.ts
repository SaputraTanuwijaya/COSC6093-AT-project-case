import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';

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
}
