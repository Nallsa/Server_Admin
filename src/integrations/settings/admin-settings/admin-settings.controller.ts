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
import { AdminSettingsService } from './admin-settings.service';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateAdminSettingsDto } from './dto/create-settings.dto';
import { Admin } from 'src/auth/decorator/admin.decorator';

@ApiBearerAuth()
@ApiTags('Настройка администратора')
@Controller('admin-settings')
export class AdminSettingsController {
  constructor(private readonly adminSettingsService: AdminSettingsService) {}

  @Post(':restaurantId/green-sms')
  @ApiOperation({ summary: 'Создание настроек для сервиса звонков' })
  @ApiResponse({
    status: 201,
    description: 'Настройки созданы',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createGreenSmsSettings(
    @Body() createSettingsDto: CreateAdminSettingsDto,
    @Param('restaurantId') restaurantId: string,
    @Admin('id') adminId: string,
  ) {
    return this.adminSettingsService.createGreenSmsSettings(
      createSettingsDto,
      restaurantId,
      adminId,
    );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение настроек для сервиса звонков по id' })
  @ApiResponse({
    status: 200,
    description: 'Настройка получена',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getGreenSmsSettingsById(@Param('id') id: string) {
    return this.adminSettingsService.getGreenSmsSettingsById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Получение настроек для сервиса звонков' })
  @ApiResponse({
    status: 200,
    description: 'Настройки получены',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllGreenSmsSettings() {
    return this.adminSettingsService.getAllGreenSmsSettings();
  }

  @Get('/:restaurantId/all')
  @ApiOperation({
    summary: 'Получение настроек для call by restaurantId',
  })
  @ApiResponse({
    status: 200,
    description: 'Настройки получены',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllPaymentSettingsByRestourantId(
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.adminSettingsService.getAllPaymentSettingsByRestourantId(
      restaurantId,
    );
  }

  @Put(':id/update')
  @ApiOperation({ summary: 'Получение настроек для сервиса звонков' })
  @ApiResponse({
    status: 200,
    description: 'Настройки получены',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateGreenSmsSettingsById(
    @Param('id') id: string,
    @Body() updateSettingsDto: CreateAdminSettingsDto,
  ) {
    return this.adminSettingsService.updateGreenSmsSettingsById(
      id,
      updateSettingsDto,
    );
  }

  @Delete(':id/delete')
  @ApiOperation({ summary: 'Удаление настроек для сервиса звонков' })
  @ApiResponse({
    status: 204,
    description: 'Настройки удалены',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteGreenSmsSettingsById(@Param('id') id: string) {
    return this.adminSettingsService.deleteGreenSmsSettingsById(id);
  }
}
