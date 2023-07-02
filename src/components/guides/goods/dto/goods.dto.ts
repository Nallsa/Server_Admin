import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGoodsDto {
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
    default: 'Котлета',
    description: 'Название товара',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    default: 'Вкусная котлета',
    description: 'Описание товара',
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    default: 'РР23С',
    description: 'Артикль товара',
  })
  @IsNotEmpty()
  readonly article: string;

  @ApiProperty({
    default: true,
    description: 'Активность товара',
  })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    default: '',
    description: 'Единица измерения товара',
  })
  @IsNotEmpty()
  readonly measurementUnitId: string;

  @ApiProperty({ default: '1шт', description: 'Размер товара' })
  @IsNotEmpty()
  readonly size: string;

  @ApiProperty({ default: '1кг', description: 'Вес товара' })
  @IsNotEmpty()
  readonly weight: string;

  @ApiProperty({
    default: '100 ккал',
    description: 'Калорийность товара',
  })
  @IsNotEmpty()
  readonly kkal: string;

  @ApiProperty({ default: '5гр', description: 'Белки' })
  @IsNotEmpty()
  readonly proteins: string;

  @ApiProperty({ default: '10гр', description: 'Жиры' })
  @IsNotEmpty()
  readonly fats: string;

  @ApiProperty({ default: '5гр', description: 'Углеводы' })
  @IsNotEmpty()
  readonly carbohydrates: string;

  @ApiProperty({ default: '', description: 'Ссылка мини на изображение' })
  @IsOptional()
  readonly smallImage: string;

  @ApiProperty({ default: '', description: 'Ссылка на изображение' })
  @IsOptional()
  readonly image: string;

  @ApiProperty({ default: 'Зеленый', description: 'Цвет товара' })
  @IsOptional()
  readonly color: string;

  @ApiProperty({ default: false, description: 'Скрытость товара' })
  @IsOptional()
  readonly isHidden: boolean;

  @ApiProperty({ default: true, description: 'Доступность товара' })
  @IsOptional()
  readonly isActive: boolean;

  @ApiProperty({ default: false, description: 'Есть ли скидка' })
  @IsOptional()
  readonly isSale: boolean;

  @ApiProperty({ default: true, description: 'Есть ли доставка' })
  @IsOptional()
  readonly isDelivery: boolean;

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

  @ApiProperty({ default: '', description: 'Ссылка на категорию' })
  @IsNotEmpty()
  readonly categoriesGoodsId: string;

  @ApiProperty({ description: '' })
  @IsOptional()
  readonly restaurantPrice: any;

  @ApiProperty({ default: null, description: '' })
  @IsOptional()
  readonly slug: string;

  @ApiProperty({ default: null, description: '' })
  @IsOptional()
  readonly likes: number;
}
