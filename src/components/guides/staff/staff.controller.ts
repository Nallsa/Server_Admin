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
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/staff.dto';

@ApiBearerAuth()
@ApiTags('Сотрудники')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: 'Создание сотрудника' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createStaff(
    @Body() createStaffDto: CreateStaffDto,
    @Admin('id') parentId: string,
  ) {
    return this.staffService.createStaff(createStaffDto, parentId);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех сотрудников' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllStaff(@Admin('id') id: string) {
    return this.staffService.getAllStaff(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск сотрудников по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getStaffById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.staffService.getStaffById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение сотрудников по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateStaffById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
    @Body() createStaffDto: CreateStaffDto,
  ) {
    return this.staffService.updateStaffById(id, adminId, createStaffDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление сотрудников' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteStaffById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.staffService.deleteStaffById(adminId, id);
  }
}
