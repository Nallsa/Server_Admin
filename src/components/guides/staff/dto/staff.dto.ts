import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({
    default: 'Иван',
    description: 'Имя сотрудника',
  })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ default: 'Иванов', description: 'Фамилия сотрудника' })
  @IsOptional()
  readonly lastName: string;

  @ApiProperty({ default: 'Иванович', description: 'Отчество сотрудника' })
  @IsOptional()
  readonly middleName: string;

  @ApiProperty({ default: '+79000000000', description: 'Номер телефона' })
  @IsOptional()
  readonly phone: string;

  @ApiProperty({ default: '', description: 'Ресторан ид' })
  @IsOptional()
  readonly restourantId: string;

  @ApiProperty({ default: 'a@a.a', description: 'Email сотрудника' })
  @IsOptional()
  readonly email: string;

  @ApiProperty({ default: '', description: 'Адрес сотрудника' })
  @IsOptional()
  readonly address: string;

  @ApiProperty({ default: '', description: 'Ид должности' })
  @IsOptional()
  readonly positionId: string;

  @ApiProperty({ default: '10:00', description: 'Начало работы' })
  @IsOptional()
  readonly workTimeFrom: string;

  @ApiProperty({ default: '20:00', description: 'Конец работы' })
  @IsOptional()
  readonly workTimeTo: string;

  @ApiProperty({ default: false, description: 'Активность сотрудника' })
  @IsOptional()
  readonly isActive: boolean;
}
