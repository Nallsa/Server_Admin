import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty({
    default: 'Директор',
    description: 'Название должности',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ default: 'Описание', description: 'Описание должности' })
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    default: 'Управление коллективом',
    description: 'Должностные обязанности',
  })
  @IsOptional()
  readonly jobInstruction: string;

  @ApiProperty({ default: '', description: 'Ресторан ид' })
  @IsOptional()
  readonly restourantId: string;
}
