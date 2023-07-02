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
import { MaterialsService } from './materials.service';
import { CreateMaterialsDto } from './dto/materials.dto';

@ApiBearerAuth()
@ApiTags('Сырье')
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @ApiOperation({ summary: 'Создание сырья' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createMaterials(
    @Body() createMaterialsDto: CreateMaterialsDto,
    @Admin('id') parentId: string,
  ) {
    return this.materialsService.createMaterials(createMaterialsDto, parentId);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех видов сырья' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllMaterials(@Admin('id') id: string) {
    return this.materialsService.getAllMaterials(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск всех видов сырья по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getMaterialsById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.materialsService.getMaterialsById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение вида сырья по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateMaterialsById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
    @Body() createMaterialsDto: CreateMaterialsDto,
  ) {
    return this.materialsService.updateMaterialsById(
      id,
      adminId,
      createMaterialsDto,
    );
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление сырья' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteMaterialsById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.materialsService.deleteMaterialsById(adminId, id);
  }
}
