import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MeasureUnitsService } from './measure-units.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Admin } from 'src/auth/decorator/admin.decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateMeasurementUnitsDto } from './dto/measure-units.dto';
import { CreatePaymentDto } from '../payment/dto/payment.dto';

@ApiBearerAuth()
@ApiTags('Единицы Измерения')
@Controller('measure-units')
export class MeasureUnitsController {
  constructor(private readonly measureUnitsService: MeasureUnitsService) {}

  @Post()
  @ApiOperation({ summary: 'Создание Единицы Измерения' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создана',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createMeasurementUnit(
    @Body() createMeasurementUnitsDto: CreateMeasurementUnitsDto,
    @Admin('id') parentId: string,
  ) {
    return this.measureUnitsService.createMeasurementUnit(
      createMeasurementUnitsDto,
      parentId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех Единиц Измерения' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllMeasurementUnit(@Admin('id') id: string) {
    return this.measureUnitsService.getAllMeasurementUnit(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск всех Единицы Измерения по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getMeasurementUnitById(
    @Admin('id') adminId: string,
    @Param('id') id: string,
  ) {
    return this.measureUnitsService.getMeasurementUnitById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение Единицы Измерения по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменена',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateMeasurementUnitById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.measureUnitsService.updateMeasurementUnitById(
      id,
      adminId,
      createPaymentDto,
    );
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление Единицы Измерения по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удалена',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteMeasurementUnitById(
    @Admin('id') adminId: string,
    @Param('id') id: string,
  ) {
    return this.measureUnitsService.deleteMeasurementUnitById(adminId, id);
  }
}
