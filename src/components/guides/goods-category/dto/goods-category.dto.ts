import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryGoodsDto {
  @ApiProperty({
    default: '',
    description: 'id Категория товара',
  })
  @IsOptional()
  readonly id: string;

  @ApiProperty({
    default: '',
    description: 'parentId Категория товара',
  })
  @IsOptional()
  readonly parentId: string;

  @ApiProperty({
    default: 'Категория товара',
    description: 'Категория товара',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    default: 'Описание',
    description: 'Описание категории товара',
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    default: '',
    description: 'Ссылка на изображение',
  })
  @IsOptional()
  readonly image: string;

  @ApiProperty({
    default: 'Зеленый',
    description: 'Цвет категории товара',
  })
  @IsNotEmpty()
  readonly color: string;

  @ApiProperty({
    default: false,
    description: 'Скрытость категории',
  })
  @IsOptional()
  readonly isHidden: boolean;

  @ApiProperty({
    default: '',
    description: 'Cсылка на ресторан',
  })
  @IsOptional()
  readonly restourantId: string;

  @ApiProperty({ default: true, description: 'Активность категории' })
  @IsOptional()
  readonly isActive: boolean;

  @ApiProperty({ default: '', description: 'Метаданные' })
  @IsOptional()
  readonly metaTitle: string;

  @ApiProperty({ default: '', description: 'Метаданные' })
  @IsOptional()
  readonly metaDescription: string;

  @ApiProperty({ default: '', description: 'Метаданные' })
  @IsOptional()
  readonly metaKeywords: string;

  @ApiProperty({ default: '', description: 'Метаданные' })
  @IsOptional()
  readonly metaRobots: string;
}
