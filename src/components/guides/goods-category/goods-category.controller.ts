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
import { GoodsCategoryService } from './goods-category.service';
import { CategoryGoodsDto } from './dto/goods-category.dto';

@ApiBearerAuth()
@ApiTags('Категории товаров')
@Controller('category-goods')
export class GoodsCategoryController {
  constructor(private readonly goodsCategoryService: GoodsCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Создание категории товара' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createCategoryGoods(
    @Body() categoryGoodsDto: CategoryGoodsDto,
    @Admin('id') parentId: string,
  ) {
    return this.goodsCategoryService.createCategoryGoods(
      categoryGoodsDto,
      parentId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех категорий товара' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllCategoryGoods(@Admin('id') id: string) {
    return this.goodsCategoryService.getAllCategoryGoods(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск категории товара по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getCategoryGoodsById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.goodsCategoryService.getCategoryGoodsById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение категории товара по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateCategoryGoodsById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
    @Body() categoryGoodsDto: CategoryGoodsDto,
  ) {
    return this.goodsCategoryService.updateCategoryGoodsById(
      id,
      adminId,
      categoryGoodsDto,
    );
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление категории товара' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteCategoryGoodsById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
  ) {
    return this.goodsCategoryService.deleteCategoryGoodsById(adminId, id);
  }
}
