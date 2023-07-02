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
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/position.dto';

@ApiBearerAuth()
@ApiTags('Должности')
@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  @ApiOperation({ summary: 'Создание должности' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createPosition(
    @Body() createPositionDto: CreatePositionDto,
    @Admin('id') parentId: string,
  ) {
    return this.positionService.createPosition(createPositionDto, parentId);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех должностей' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllPosition(@Admin('id') id: string) {
    return this.positionService.getAllPosition(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск должности по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getPositionById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.positionService.getPositionById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение должности по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменена',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updatePositionById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
    @Body() createPositionDto: CreatePositionDto,
  ) {
    return this.positionService.updatePositionById(
      id,
      adminId,
      createPositionDto,
    );
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление должности' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удалена',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deletePositionById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.positionService.deletePositionById(adminId, id);
  }
}
