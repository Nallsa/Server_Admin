import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePaymentStatusDto {
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
    default: 'Оплачено',
    description: 'Название стутуса оплаты',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ default: 'Описание', description: 'Описание Статуса' })
  @IsOptional()
  readonly description: string;

  @ApiProperty({ default: true, description: 'Активность статуса' })
  @IsOptional()
  readonly isActive: boolean;
}
