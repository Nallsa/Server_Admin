import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMaterialsCategoryDto {
  @ApiProperty({
    default: 'Фрукты',
    description: 'Категория сырья',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    default: 'Описание',
    description: 'Описание категории сырья',
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ default: 'Зеленый', description: 'Цвет товара' })
  @IsNotEmpty()
  readonly color: string;

  @ApiProperty({ default: true, description: 'Доступность товара' })
  @IsOptional()
  readonly isHidden: boolean;

  @ApiProperty({ default: '', description: 'Ресторан ид' })
  @IsOptional()
  readonly restourantId: string;
}
