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
import { CreateModificatorsDto } from './dto/modificators.dto';
import { ModificatorsService } from './modificators.service';

@ApiBearerAuth()
@ApiTags('Модификаторы')
@Controller('modificators')
export class ModificatorsController {
  constructor(private readonly modificatorsService: ModificatorsService) {}

  @Post()
  @ApiOperation({ summary: 'Создание статуса' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createModificators(
    @Body() createModificatorsDto: CreateModificatorsDto,
    @Admin('id') parentId: string,
  ) {
    return this.modificatorsService.createModificators(
      createModificatorsDto,
      parentId,
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
  getAllModificators(@Admin('id') id: string) {
    return this.modificatorsService.getAllModificators(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск всех статусов по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getModificatorsById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.modificatorsService.getModificatorsById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение статуса по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateModificatorsById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
    @Body() createModificatorsDto: CreateModificatorsDto,
  ) {
    return this.modificatorsService.updateModificatorsById(
      id,
      adminId,
      createModificatorsDto,
    );
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление статуса' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteModificatorsById(
    @Admin('id') adminId: string,
    @Param('id') id: string,
  ) {
    return this.modificatorsService.deleteModificatorsById(adminId, id);
  }
}
