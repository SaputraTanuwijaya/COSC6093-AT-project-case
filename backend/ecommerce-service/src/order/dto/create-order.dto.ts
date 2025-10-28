import { IsNumber, IsArray, ArrayMinSize } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  productIds: number[];
}
