import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Public()
  @Post('register')
  register(@Body() registerDto: any) {
    return this.client.send({ cmd: 'register' }, registerDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: any) {
    return this.client.send({ cmd: 'login' }, loginDto);
  }
}
