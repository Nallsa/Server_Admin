import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 'test@test.ru',
    description: 'Адрес эл. почты пользователя',
  })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    default: '+79008007000',
    description: 'Номер телефона пользователя',
  })
  @IsNotEmpty()
  @IsPhoneNumber('RU')
  readonly phone: string;

  @ApiProperty({
    default: 'user1234',
    description: 'Пароль не менее 8 символов',
  })
  @Length(8)
  @IsOptional()
  password: string;

  @ApiProperty({ default: 'Иван', description: 'Имя пользователя' })
  @IsOptional()
  readonly name: string;

  @ApiProperty({ default: 'Иванов', description: 'Фамилия пользователя' })
  @IsOptional()
  readonly lastName: string;

  @ApiProperty({ default: 'Иванович', description: 'Отчество пользователя' })
  @IsOptional()
  readonly middleName: string;

  @ApiProperty({ default: 'Male', description: 'Пол' })
  @IsOptional()
  readonly gender: Gender;

  @ApiProperty({ default: 'Дата Рождения', description: 'Имя пользователя' })
  @IsOptional()
  readonly birthday: Date;
}
