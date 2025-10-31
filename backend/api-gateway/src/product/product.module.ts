import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ECOMMERCE_SERVICE',
        transport: Transport.TCP,
        options: {
          // Choose host either for local or for Container
          // host: 'localhost',
          host: 'ecommerce-service',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
