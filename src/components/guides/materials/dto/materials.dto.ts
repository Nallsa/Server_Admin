import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMaterialsDto {
  @ApiProperty({
    default: 'Сыр',
    description: 'Название сырья',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    default: 'Сыр для пиццы',
    description: 'Описание сырья',
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    default: 'РР23С',
    description: 'Артикль сырья',
  })
  @IsNotEmpty()
  readonly article: string;

  @ApiProperty({
    default: 'РР23С',
    description: 'Артикль сырья',
  })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    default: '',
    description: 'Единица измерения сырья',
  })
  @IsNotEmpty()
  readonly measurementUnitId: string;

  @ApiProperty({ default: '', description: 'Ссылка на изображение' })
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty({ default: 'Зеленый', description: 'Цвет товара' })
  @IsNotEmpty()
  readonly color: string;

  @ApiProperty({ default: true, description: 'Доступность товара' })
  @IsOptional()
  readonly isActive: boolean;

  @ApiProperty({ default: false, description: 'Категория' })
  @IsOptional()
  readonly categoryId: string;

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
