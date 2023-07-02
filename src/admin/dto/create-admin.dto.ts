import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ default: 'test@test.ru' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ default: '+79008007000' })
  @IsNotEmpty()
  @IsPhoneNumber('RU')
  readonly phone: string;

  @ApiProperty({ default: 'user1234' })
  @Length(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ default: 'Вася' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ default: 'User' })
  @IsNotEmpty()
  readonly role: Role;

  @ApiProperty({ default: 'User' })
  @IsOptional()
  readonly isActive: boolean;
}
