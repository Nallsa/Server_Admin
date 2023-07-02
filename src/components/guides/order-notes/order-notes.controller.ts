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
import { CreateOrderNotesDto } from './dto/order-notes.dto';
import { OrderNotesService } from './order-notes.service';

@ApiBearerAuth()
@ApiTags('Заметки к заказу')
@Controller('order-notes')
export class OrderNotesController {
  constructor(private readonly orderNotesService: OrderNotesService) {}

  @Post()
  @ApiOperation({ summary: 'Создание заметки' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createOrderNotes(@Body() createOrderNotesDto: CreateOrderNotesDto) {
    return this.orderNotesService.createOrderNotes(createOrderNotesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех заметок' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllOrderNotes() {
    return this.orderNotesService.getAllOrderNotes();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск заметки по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getOrderNotesById(@Param('id') id: string) {
    return this.orderNotesService.getOrderNotesById(id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение заметки по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateOrderNotesById(
    @Param('id') id: string,
    @Body() createOrderNotesDto: CreateOrderNotesDto,
  ) {
    return this.orderNotesService.updateOrderNotesById(id, createOrderNotesDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление заметки' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteOrderNotesById(@Param('id') id: string) {
    return this.orderNotesService.deleteOrderNotesById(id);
  }
}
