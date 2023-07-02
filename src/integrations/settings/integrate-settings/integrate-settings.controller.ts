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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Admin } from 'src/auth/decorator/admin.decorator';
import { IntegrateSettingsService } from './integrate-settings.service';
import { CreatePaymentSettingsDto } from './dto/create-payment-settings.dto';

@ApiBearerAuth()
@ApiTags('Настройка платежной системы администратора')
@Controller('payment-settings')
export class IntegrateSettingsController {
  constructor(
    private readonly integrateSettingsService: IntegrateSettingsService,
  ) {}

  @Post(':restaurantId/')
  @ApiOperation({ summary: 'Создание настроек для платежной системы' })
  @ApiResponse({
    status: 201,
    description: 'Настройки созданы',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createPaymentIntegrationSettings(
    @Body() createPaymentSettingsDto: CreatePaymentSettingsDto,
    @Param('restaurantId') restaurantId: string,
    @Admin('id') adminId: string,
  ) {
    return this.integrateSettingsService.createPaymentIntegrationSettings(
      createPaymentSettingsDto,
      restaurantId,
      adminId,
    );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение настроек для платежной системы по id' })
  @ApiResponse({
    status: 200,
    description: 'Настройка получена',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getGreenSmsSettingsById(@Param('id') id: string) {
    return this.integrateSettingsService.getGreenSmsSettingsById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Получение настроек для платежной системы' })
  @ApiResponse({
    status: 200,
    description: 'Настройки получены',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllGreenSmsSettings() {
    return this.integrateSettingsService.getAllGreenSmsSettings();
  }

  @Get('/:restaurantId/all')
  @ApiOperation({
    summary: 'Получение настроек для платежной системы by restaurantId',
  })
  @ApiResponse({
    status: 200,
    description: 'Настройки получены',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllGreenSmsSettingsByRestourantId(
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.integrateSettingsService.getAllGreenSmsSettingsByRestourantId(
      restaurantId,
    );
  }

  @Put(':id/update')
  @ApiOperation({ summary: 'Получение настроек для платежной системы' })
  @ApiResponse({
    status: 200,
    description: 'Настройки получены',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateGreenSmsSettingsById(
    @Param('id') id: string,
    @Body() createPaymentSettingsDto: CreatePaymentSettingsDto,
  ) {
    return this.integrateSettingsService.updateGreenSmsSettingsById(
      id,
      createPaymentSettingsDto,
    );
  }

  @Delete(':id/delete')
  @ApiOperation({ summary: 'Удаление настроек для платежной системы' })
  @ApiResponse({
    status: 204,
    description: 'Настройки удалены',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteGreenSmsSettingsById(@Param('id') id: string) {
    return this.integrateSettingsService.deleteGreenSmsSettingsById(id);
  }
}
