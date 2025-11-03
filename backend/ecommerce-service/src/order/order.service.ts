import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order.enum';
import { Prisma } from '@prisma/client'; //

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
          status: OrderStatus.PENDING,
        },
      });

      const orderItemsData = products.map((product) => ({
        orderId: order.id,
        productId: product.id,
        quantity: 1,
        price: product.price,
      }));

      await tx.orderItem.createMany({
        data: orderItemsData,
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
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async cancelOrder(orderId: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
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

    return this.prisma.$transaction(async (tx) => {
      for (const item of order.orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }

      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.CANCELED },
      });

      return updatedOrder;
    });
  }

  async updateOrderStatus(orderId: number, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status === status) {
      return order;
    }

    if (
      status === OrderStatus.CANCELED &&
      order.status === OrderStatus.PENDING
    ) {
      return this.prisma.$transaction(async (tx) => {
        for (const item of order.orderItems) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        }
        return tx.order.update({
          where: { id: orderId },
          data: { status: OrderStatus.CANCELED },
        });
      });
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  async findAllOrders() {
    return this.prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
