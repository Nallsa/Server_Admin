import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({
    default: 1,
    description: 'Название типа доставки',
  })
  @IsNotEmpty()
  readonly count: number;

  @ApiProperty({
    default: 1000,
    description: 'Активность типа доставки',
  })
  @IsOptional()
  readonly price: number;

  @ApiProperty({
    default: 2000,
    description: 'Цвет типа доставки',
  })
  @IsNotEmpty()
  readonly sum: number;

  @ApiProperty({ default: 'ID ресторана', description: 'ИД Ресторана' })
  @IsOptional()
  readonly comment: string;
}
