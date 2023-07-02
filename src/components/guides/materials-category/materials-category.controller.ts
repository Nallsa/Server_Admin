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
import { CreateGoodsDto } from '../goods/dto/goods.dto';
import { CreateMaterialsCategoryDto } from './dto/materials-category.dto';
import { MaterialsCategoryService } from './materials-category.service';

@ApiBearerAuth()
@ApiTags('Категории сырья')
@Controller('materials-category')
export class MaterialsCategoryController {
  constructor(
    private readonly materialsCategoryService: MaterialsCategoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание категории сырья' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createMaterialCategory(
    @Body() createGoodsDto: CreateMaterialsCategoryDto,
    @Admin('id') parentId: string,
  ) {
    return this.materialsCategoryService.createMaterialCategory(
      createGoodsDto,
      parentId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех категорий сырья' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllMaterialCategory(@Admin('id') id: string) {
    return this.materialsCategoryService.getAllMaterialCategory(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск категории сырья по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getMaterialCategoryById(
    @Admin('id') adminId: string,
    @Param('id') id: string,
  ) {
    return this.materialsCategoryService.getMaterialCategoryById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение категории сырья по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateMaterialCategoryById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
    @Body() createGoodsDto: CreateGoodsDto,
  ) {
    return this.materialsCategoryService.updateMaterialCategoryById(
      id,
      adminId,
      createGoodsDto,
    );
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление категории сырья' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteMaterialCategoryById(
    @Admin('id') adminId: string,
    @Param('id') id: string,
  ) {
    return this.materialsCategoryService.deleteMaterialCategoryById(
      adminId,
      id,
    );
  }
}
