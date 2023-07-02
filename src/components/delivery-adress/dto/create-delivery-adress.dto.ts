import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDeliveryAddressDto {
  @ApiProperty({
    default: '',
    description: '',
  })
  @IsNotEmpty()
  readonly country: string;

  @ApiProperty({
    default: '',
    description: '',
  })
  @IsNotEmpty()
  readonly region: string;

  @ApiProperty({
    default: '',
    description: '',
  })
  @IsNotEmpty()
  readonly city: string;

  @ApiProperty({
    default: '',
    description: '',
  })
  @IsNotEmpty()
  readonly street: string;

  @ApiProperty({
    default: '',
    description: '',
  })
  @IsNotEmpty()
  readonly house: string;

  @ApiProperty({
    default: '',
    description: '',
  })
  @IsOptional()
  readonly corp: string;

  @ApiProperty({
    default: '',
    description: '',
  })
  @IsOptional()
  readonly apart: string;

  @ApiProperty({
    default: '',
    description: '',
  })
  @IsOptional()
  readonly floor: string;
}
