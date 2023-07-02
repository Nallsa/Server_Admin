import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreatePaymentSettingsDto {
  @ApiProperty({
    default: 'nickname',
    description: 'Никнейм для сервиса GreenSms',
  })
  @IsNotEmpty()
  readonly minSumOrder: number;

  @ApiProperty({
    default: 'nickname',
    description: 'Никнейм для сервиса GreenSms',
  })
  @IsNotEmpty()
  readonly deliveryCost: number;

  @ApiProperty({
    default: 'nickname',
    description: 'Никнейм для сервиса GreenSms',
  })
  @IsNotEmpty()
  readonly paymentSystem: string;

  @ApiProperty({
    default: 'nickname',
    description: 'Никнейм для сервиса GreenSms',
  })
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty({
    default: 'user1234',
    description: 'Пароль не менее 8 символов',
  })
  @Length(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    default: 'nickname',
    description: 'Никнейм для сервиса GreenSms',
  })
  @IsNotEmpty()
  readonly secretKey: string;
}
