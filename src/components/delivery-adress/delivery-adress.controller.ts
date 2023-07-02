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
import { DeliveryAdressService } from './delivery-adress.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthUserGuard } from 'src/auth/guards/authUser.guard';
import { CreateDeliveryAddressDto } from './dto/create-delivery-adress.dto';
import { User } from 'src/auth/decorator/user.decorator';

@Controller('delivery-adress')
export class DeliveryAdressController {
  constructor(private readonly deliveryAdressService: DeliveryAdressService) {}

  @Post()
  @ApiOperation({ summary: 'Создание' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthUserGuard)
  createDeliveryAdress(
    @Body() createDeliveryAddressDto: CreateDeliveryAddressDto,
    @User('id') usertId: string,
  ) {
    return this.deliveryAdressService.createDeliveryAdress(
      createDeliveryAddressDto,
      usertId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @UseGuards(AuthUserGuard)
  getAllDeliveryAdress(@User('id') id: string) {
    return this.deliveryAdressService.getAllDeliveryAdress(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @UseGuards(AuthUserGuard)
  getDeliveryAdressById(@Param('id') id: string, @User('id') userId: string) {
    return this.deliveryAdressService.getDeliveryAdressById(id, userId);
  }

  @Put(':id/update')
  @ApiOperation({ summary: 'Обновление по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно обновлено',
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthUserGuard)
  updateDeliveryAdressById(
    @Param('id') id: string,
    @Body() createDeliveryAddressDto: CreateDeliveryAddressDto,
    @User('id') userId: string,
  ) {
    return this.deliveryAdressService.updateDeliveryAdressById(
      id,
      createDeliveryAddressDto,
      userId,
    );
  }

  @Delete(':id/delete')
  @ApiOperation({ summary: 'Удаление по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удалено',
  })
  @UseGuards(AuthUserGuard)
  deleteDeliveryAdressById(
    @Param('id') id: string,
    @User('id') userId: string,
  ) {
    return this.deliveryAdressService.deleteDeliveryAdressById(id, userId);
  }
}
