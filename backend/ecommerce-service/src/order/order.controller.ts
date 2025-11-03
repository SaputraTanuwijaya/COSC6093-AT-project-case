import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order.enum';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'create_order' })
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @MessagePattern({ cmd: 'find_orders_for_user' })
  findAllForUser(@Payload('userId') userId: number) {
    return this.orderService.findAllForUser(userId);
  }

  @MessagePattern({ cmd: 'cancel_order' })
  cancelOrder(@Payload() data: { orderId: number; userId: number }) {
    return this.orderService.cancelOrder(data.orderId, data.userId);
  }

  @MessagePattern({ cmd: 'update_order_status' })
  updateOrderStatus(@Payload() data: { orderId: number; status: OrderStatus }) {
    return this.orderService.updateOrderStatus(data.orderId, data.status);
  }

  @MessagePattern({ cmd: 'find_all_orders' })
  findAllOrders() {
    return this.orderService.findAllOrders();
  }
}
