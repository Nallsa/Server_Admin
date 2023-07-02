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
import { DeliveryTypeService } from './delivery-type.service';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Admin } from 'src/auth/decorator/admin.decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateDeliveryTypeDto } from './dto/delivery-type.dto';

@ApiBearerAuth()
@ApiTags('Тип доставки')
@Controller('delivery-type')
export class DeliveryTypeController {
  constructor(private readonly deliveryTypeService: DeliveryTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Создание типа доставки' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createDeliveryType(
    @Body() createDeliveryDto: CreateDeliveryTypeDto,
    @Admin('id') parentId: string,
  ) {
    return this.deliveryTypeService.createDeliveryType(
      createDeliveryDto,
      parentId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Поиск всех типов доставки' })
  @ApiResponse({
    status: 200,
    description: 'Типы доставки найдены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllDeliveryType(@Admin('id') id: string) {
    return this.deliveryTypeService.getAllDeliveryType(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск типа доставки по ИД' })
  @ApiResponse({
    status: 200,
    description: 'Тип доставки найден',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getDeliveryTypeById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.deliveryTypeService.getDeliveryTypeById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение типа доставки по ИД' })
  @ApiResponse({
    status: 200,
    description: 'Тип доставки изменен',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateDeliveryType(
    @Admin('id') adminId: string,
    @Param('id') id: string,
    @Body() createDeliveryDto: CreateDeliveryTypeDto,
  ) {
    return this.deliveryTypeService.updateDeliveryType(
      adminId,
      id,
      createDeliveryDto,
    );
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление типа доставки по Ид' })
  @ApiResponse({
    status: 200,
    description: 'Тип доставки удален',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteDeliveryType(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.deliveryTypeService.deleteDeliveryType(adminId, id);
  }
}
