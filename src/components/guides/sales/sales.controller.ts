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
import { Admin } from 'src/auth/decorator/admin.decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateSalesDto } from './dto/sales.dto';
import { SalesService } from './sales.service';

@ApiBearerAuth()
@ApiTags('Скидки')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Создание акции' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createSales(
    @Body() createSalesDto: CreateSalesDto,
    @Admin('id') parentId: string,
  ) {
    return this.salesService.createSales(createSalesDto, parentId);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех акций' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllSales(@Admin('id') id: string) {
    return this.salesService.getAllSales(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск акций по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getSalesById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.salesService.getSalesById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение акции по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateSalesById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
    @Body() createSalesDto: CreateSalesDto,
  ) {
    return this.salesService.updateSalesById(id, adminId, createSalesDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление акции' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteSalesById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.salesService.deleteSalesById(adminId, id);
  }
}
