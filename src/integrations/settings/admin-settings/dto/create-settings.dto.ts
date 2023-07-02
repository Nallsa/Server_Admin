import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateAdminSettingsDto {
  @ApiProperty({
    default: 'nickname',
    description: 'Никнейм для сервиса GreenSms',
  })
  @IsNotEmpty()
  readonly nickName: string;

  @ApiProperty({
    default: 'user1234',
    description: 'Пароль не менее 8 символов',
  })
  @Length(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    default: true,
    description: 'Актуальность настроек',
  })
  @IsOptional()
  isActive: boolean;
}
