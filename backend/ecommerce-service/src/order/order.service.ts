import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

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
}
