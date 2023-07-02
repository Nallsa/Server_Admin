import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderNotesDto {
  @ApiProperty({
    default: 'Заметка',
    description: 'Название Заметки',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ default: 'Описание', description: 'Описание заметки' })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ default: 'Зеленый', description: 'Цвет заметки' })
  @IsOptional()
  readonly color: string;

  @ApiProperty({ default: true, description: 'Активность заметки' })
  @IsOptional()
  readonly isActive: boolean;

  @ApiProperty({ default: '', description: 'Ресторан ид' })
  @IsOptional()
  readonly restourantId: string;
}
