import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRestourantDto {
  @ApiProperty({
    default: '',
    description: 'Адрес ресторана',
  })
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({
    default: '',
    description: 'Название ресторана',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    default: '',
    description: 'parentId ресторана',
  })
  @IsOptional()
  readonly parentId: string;

  @ApiProperty({
    default: true,
    description: 'Активность ресторана',
  })
  @IsOptional()
  readonly isActive: boolean;

  @ApiProperty({
    default: 'mail@mail.ru',
    description: 'Контактный емэил ресторана',
  })
  @IsNotEmpty()
  readonly contactEmail: string;

  @ApiProperty({ default: 'Адрес', description: 'Адрес Ресторана' })
  @IsNotEmpty()
  readonly businessAddress: string;

  @ApiProperty({ default: '', description: 'Дата создания ресторана' })
  @IsNotEmpty()
  readonly createdAt: Date;

  @ApiProperty({
    default: '',
    description: 'Дата обновления настроек ресторана',
  })
  @IsNotEmpty()
  readonly updatedAt: Date;

  @ApiProperty({ default: '', description: 'Рабочее время' })
  @IsNotEmpty()
  readonly workTime: string;

  @ApiProperty({ default: '', description: 'Ссылка на карту' })
  @IsNotEmpty()
  readonly mapLink: string;
}
