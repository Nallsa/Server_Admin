import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSalesDto {
  @ApiProperty({
    default: 'Скидка 10% на все',
    description: 'Название Акции',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ default: 'Описание', description: 'Описание Акции' })
  @IsOptional()
  readonly description: string;

  @ApiProperty({ default: '/', description: 'Ссылка на главное изображение' })
  @IsOptional()
  readonly bigImage: string;

  @ApiProperty({ default: '/', description: 'Ссылка на Маленькое изображение' })
  @IsOptional()
  readonly smallImage: string;

  @ApiProperty({ default: true, description: 'Процент скидки?' })
  @IsOptional()
  readonly isPercent: boolean;

  @ApiProperty({ default: 10, description: 'Кол-во %' })
  @IsOptional()
  readonly countPercent: number;

  @ApiProperty({ default: false, description: 'Сумма скидки?' })
  @IsOptional()
  readonly isSum: boolean;

  @ApiProperty({ default: 100, description: 'Кол-во рублей' })
  @IsOptional()
  readonly countSum: number;

  @ApiProperty({ default: 500, description: 'Минимальная сумма скидки' })
  @IsOptional()
  readonly minSum: number;

  @ApiProperty({ default: true, description: 'Активность акции' })
  @IsOptional()
  readonly isActive: boolean;

  @ApiProperty({ default: 'С 10 апреля по 20 мая', description: '' })
  @IsOptional()
  readonly saleRange: string;

  @ApiProperty({ default: '', description: 'Рестран ид' })
  @IsOptional()
  readonly restourantId: string;
}
