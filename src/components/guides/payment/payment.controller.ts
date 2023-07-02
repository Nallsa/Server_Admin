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
import { PaymentService } from './payment.service';
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
import { CreatePaymentDto } from './dto/payment.dto';

@ApiBearerAuth()
@ApiTags('Платежные методы')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Создание платежного метода' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @Admin('id') parentId: string,
  ) {
    return this.paymentService.createPayment(createPaymentDto, parentId);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех платежных методов' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllPayment(@Admin('id') id: string) {
    return this.paymentService.getAllPayment(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск платежных методов по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getPaymentById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.paymentService.getPaymentById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение платежного метода по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updatePaymentById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentService.updatePaymentById(id, adminId, createPaymentDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление платежного метода по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deletePaymentById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.paymentService.deletePaymentById(adminId, id);
  }
}
