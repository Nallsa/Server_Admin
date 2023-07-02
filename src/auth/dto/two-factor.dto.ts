import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class TwoFactorDto {
  @ApiProperty({
    default: '1234',
    description: 'Последние 4 цифры с входящего звонка',
  })
  @IsOptional()
  @Length(4)
  readonly otp: string;
}
