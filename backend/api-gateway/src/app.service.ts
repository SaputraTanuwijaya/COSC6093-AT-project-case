import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // Debug JWT
  // constructor(private configService: ConfigService) {
  //   const secret = this.configService.get<string>('JWT_SECRET');
  //   console.log('--- DEBUG: JWT_SECRET from AppService ---');
  //   console.log(secret);
  //   console.log('------------------------------------------');
  // }

  getHello(): string {
    return 'Hello World!';
  }
}
