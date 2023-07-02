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
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/statuses.dto';

@ApiBearerAuth()
@ApiTags('Статусы')
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  @ApiOperation({ summary: 'Создание статуса' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createStatus(
    @Body() createStatusDto: CreateStatusDto,
    @Admin('id') parentId: string,
  ) {
    return this.statusesService.createStatus(createStatusDto, parentId);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех статусов' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllStatus(@Admin('id') id: string) {
    return this.statusesService.getAllStatus(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск всех статусов по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getStatusById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.statusesService.getStatusById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение статуса по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateStatusById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
    @Body() createStatusDto: CreateStatusDto,
  ) {
    return this.statusesService.updateStatusById(id, adminId, createStatusDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление статуса' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteStatusById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.statusesService.deleteStatusById(adminId, id);
  }
}
