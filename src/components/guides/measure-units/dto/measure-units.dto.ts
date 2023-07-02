import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMeasurementUnitsDto {
  @ApiProperty({
    default: '',
    description: '',
  })
  @IsOptional()
  readonly id: string;

  @ApiProperty({
    default: '',
    description: '',
  })
  @IsOptional()
  readonly parentId: string;

  @ApiProperty({
    default: 'Килограмм',
    description: 'Название единицы измерения',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    default: true,
    description: 'Активность единицы измерения',
  })
  @IsOptional()
  readonly isActive: boolean;

  @ApiProperty({ default: 'ID ресторана', description: 'ИД Ресторана' })
  @IsOptional()
  readonly restourantId: string;
}
