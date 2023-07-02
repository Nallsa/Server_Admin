import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePaymentDto {
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
    default: 'Наличными',
    description: 'Тип оплаты',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    default: true,
    description: 'Активность типа оплаты',
  })
  @IsOptional()
  readonly isActive: boolean;

  @ApiProperty({ default: 'ID ресторана', description: 'ID Ресторана' })
  @IsOptional()
  readonly restourantId: string;
}
