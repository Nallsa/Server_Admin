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
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateDeliveryZoneDto } from './dto/delivery-zone.dto';
import { DeliveryZoneService } from './delivery-zone.service';

@ApiBearerAuth()
@ApiTags('Зоны Доставки')
@Controller('delivery-zone')
export class DeliveryZoneController {
  constructor(private readonly deliveryZoneService: DeliveryZoneService) {}

  @Post()
  @ApiOperation({ summary: 'Создание зоны доставки' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createDeliveryZone(@Body() createDeliveryZoneDto: CreateDeliveryZoneDto) {
    return this.deliveryZoneService.createDeliveryZone(createDeliveryZoneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех зон доставок' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllDeliveryZone() {
    return this.deliveryZoneService.getAllDeliveryZone();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск всех зон доставок по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getDeliveryZoneById(@Param('id') id: string) {
    return this.deliveryZoneService.getDeliveryZoneById(id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение зоны доставки по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateDeliveryZoneById(
    @Param('id') id: string,
    @Body() createDeliveryZoneDto: CreateDeliveryZoneDto,
  ) {
    return this.deliveryZoneService.updateDeliveryZoneById(
      id,
      createDeliveryZoneDto,
    );
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление зоны доставки' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteDeliveryZoneById(@Param('id') id: string) {
    return this.deliveryZoneService.deleteDeliveryZoneById(id);
  }
}
