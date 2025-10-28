import { IsArray, ArrayMinSize, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'You must order at least one product.' })
  @IsNumber({}, { each: true })
  productIds: number[];
}
