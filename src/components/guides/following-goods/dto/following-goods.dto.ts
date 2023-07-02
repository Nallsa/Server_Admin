import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class FollowingGoodsDto {
  @ApiProperty({
    default: 'Вилка',
    description: 'Название сопутствующего товара',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    default: 'Пластиковая вилка для еды',
    description: 'Описание сопутствующего товара',
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    default: 'РР23С',
    description: 'Артикль сопутствующего товара',
  })
  @IsNotEmpty()
  readonly article: string;

  @ApiProperty({
    default: 20,
    description: 'Цена сопутствующего товара',
  })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    default: 'шт.',
    description: 'Единица измерения сопутствующего товара',
  })
  @IsNotEmpty()
  readonly measurementUnitId: string;

  @ApiProperty({ default: '/image', description: 'Ссылка на изображение' })
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty({ default: 'Зеленый', description: 'Цвет товара' })
  @IsNotEmpty()
  readonly color: string;

  @ApiProperty({ default: false, description: 'Скрытость товара' })
  @IsOptional()
  readonly isHidden: boolean;

  @ApiProperty({ default: true, description: 'Доступность товара' })
  @IsOptional()
  readonly isActive: boolean;

  @ApiProperty({
    default: false,
    description: 'Категория сопутствующего товара',
  })
  @IsOptional()
  readonly categoriesGoodsId: string;

  @ApiProperty({ default: '', description: 'Ресторан ид' })
  @IsOptional()
  readonly restourantId: string;

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
