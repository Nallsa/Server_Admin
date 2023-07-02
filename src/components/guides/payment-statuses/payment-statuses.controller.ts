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
import { PaymentStatusesService } from './payment-statuses.service';
import { CreatePaymentStatusDto } from './dto/payment-statuses.dto';

@ApiBearerAuth()
@ApiTags('Статусы оплаты')
@Controller('payment-statuses')
export class PaymentStatusesController {
  constructor(
    private readonly paymentStatusesService: PaymentStatusesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание статуса' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createPaymentStatus(@Body() createPaymentStatusDto: CreatePaymentStatusDto) {
    return this.paymentStatusesService.createPaymentStatus(
      createPaymentStatusDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех статусов' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllPaymentStatus() {
    return this.paymentStatusesService.getAllPaymentStatus();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск всех статусов по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getPaymentStatusById(@Param('id') id: string) {
    return this.paymentStatusesService.getPaymentStatusById(id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение статуса по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updatePaymentStatusById(
    @Param('id') id: string,
    @Body() createPaymentStatusDto: CreatePaymentStatusDto,
  ) {
    return this.paymentStatusesService.updatePaymentStatusById(
      id,
      createPaymentStatusDto,
    );
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление статуса' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deletePaymentStatusById(@Param('id') id: string) {
    return this.paymentStatusesService.deletePaymentStatusById(id);
  }
}
