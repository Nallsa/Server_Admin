import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateModificatorsDto {
  @ApiProperty({
    default: 'Соус',
    description: 'Название модификатора',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    default: 'Острая паста',
    description: 'Описание модификатора',
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    default: 'РР23С',
    description: 'Артикль модификатора',
  })
  @IsNotEmpty()
  readonly article: string;

  @ApiProperty({
    default: 100,
    description: 'Цена модификатора',
  })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    default: 'гр.',
    description: 'Единица измерения модификатора',
  })
  @IsNotEmpty()
  readonly measurementUnitId: string;

  @ApiProperty({
    default: '100 ккал',
    description: 'Калорийность модификатора',
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

  @ApiProperty({ default: '', description: 'Ссылка на изображение' })
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty({ default: 'Зеленый', description: 'Цвет модификатора' })
  @IsNotEmpty()
  readonly color: string;

  @ApiProperty({ default: false, description: 'Скрытость модификатора' })
  @IsOptional()
  readonly isHidden: boolean;

  @ApiProperty({ default: true, description: 'Доступность модификатора' })
  @IsOptional()
  readonly isActive: boolean;

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
}
