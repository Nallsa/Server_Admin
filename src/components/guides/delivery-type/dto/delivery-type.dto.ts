import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDeliveryTypeDto {
  @ApiProperty({
    default: '',
    description: '',
  })
  @IsOptional()
  readonly id: string;

  @ApiProperty({
    default: '',
    description: '',
  })
  @IsOptional()
  readonly parentId: string;

  @ApiProperty({
    default: 'Доставка',
    description: 'Название типа доставки',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    default: true,
    description: 'Активность типа доставки',
  })
  @IsOptional()
  readonly isActive: boolean;

  @ApiProperty({ default: 'ID ресторана', description: 'ИД Ресторана' })
  @IsOptional()
  readonly restourantId: string;
}
