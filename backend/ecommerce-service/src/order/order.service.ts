import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order.enum';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, productIds } = createOrderDto;

    return this.prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: {
          id: { in: productIds },
        },
      });

      if (products.length !== productIds.length) {
        throw new NotFoundException('One or more products not found');
      }

      let total = 0;
      for (const product of products) {
        if (product.stock < 1) {
          throw new BadRequestException(
            `Product "${product.name}" is out of stock.`,
          );
        }
        total += product.price;
      }

      const order = await tx.order.create({
        data: {
          userId,
          total,
        },
      });

      for (const product of products) {
        await tx.product.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement: 1,
            },
          },
        });
      }

      return order;
    });
  }

  async findAllForUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
    });
  }

  async cancelOrder(orderId: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.userId !== userId) {
      throw new ForbiddenException('You cannot cancel this order');
    }
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException(
        `Cannot cancel an order that is already ${order.status}`,
      );
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.CANCELED },
    });
  }

  async updateOrderStatus(orderId: number, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  async findAllOrders() {
    return this.prisma.order.findMany();
  }
}
