import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDeliveryZoneDto {
  @ApiProperty({
    default: 'Краснодар',
    description: 'Название города',
  })
  @IsNotEmpty()
  readonly cityName: string;

  @ApiProperty({
    default: 'Зона доставки',
    description: 'Зона доставки',
  })
  @IsNotEmpty()
  readonly zoneName: string;

  @ApiProperty({ default: 'Описание', description: 'Описание' })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ default: 500, description: 'Минимальная стоимость заказа' })
  @IsNotEmpty()
  readonly minOrderPrice: number;

  @ApiProperty({
    default: 300,
    description: 'Сумма, которую надо добавить до бесплатной доставки',
  })
  @IsOptional()
  readonly deliveryPriceIfNotMinOrderPrice: number;

  @ApiProperty({ default: 'ОК', description: 'Комментарий к зоне доставки' })
  @IsOptional()
  readonly comment: string;

  @ApiProperty({ default: true, description: 'Активность зоны доставки' })
  @IsOptional()
  readonly isActive: boolean;

  @ApiProperty({ default: '', description: 'Ресторан ид' })
  @IsOptional()
  readonly restourantId: string;
}
