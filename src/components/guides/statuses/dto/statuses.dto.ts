import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStatusDto {
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
    default: 'Ожидание',
    description: 'Название статуса',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    default: true,
    description: 'Активность статуса',
  })
  @IsOptional()
  readonly isActive: boolean;


  @ApiProperty({ default: 'ID ресторана', description: 'ИД Ресторана' })
  @IsOptional()
  readonly restourantId: string;
}
