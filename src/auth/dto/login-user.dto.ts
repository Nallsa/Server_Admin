import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPhoneNumber, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ default: '+79008007000' })
  @IsNotEmpty()
  @IsPhoneNumber('RU')
  readonly phone: string;

  @ApiProperty({ default: 'user1234' })
  @IsOptional()
  @Length(8)
  readonly password: string;
}
