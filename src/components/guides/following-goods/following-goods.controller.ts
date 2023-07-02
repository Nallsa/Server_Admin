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
import { FollowingGoodsService } from './following-goods.service';
import { FollowingGoodsDto } from './dto/following-goods.dto';

@ApiBearerAuth()
@ApiTags('Сопутствующие товары')
@Controller('following-goods')
export class FollowingGoodsController {
  constructor(private readonly followingGoodsService: FollowingGoodsService) {}

  @Post()
  @ApiOperation({ summary: 'Создание сопутствующего товара' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createFollowingGoods(
    @Body() followingGoodsDto: FollowingGoodsDto,
    @Admin('id') parentId: string,
  ) {
    return this.followingGoodsService.createFollowingGoods(
      followingGoodsDto,
      parentId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех сопутствующих товаров' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllFollowingGoods(@Admin('id') id: string) {
    return this.followingGoodsService.getAllFollowingGoods(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск всех сопутствующих товаров по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getFollowingGoodsById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.followingGoodsService.getFollowingGoodsById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение сопутствующего товара по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateFollowingGoodsById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
    @Body() followingGoodsDto: FollowingGoodsDto,
  ) {
    return this.followingGoodsService.updateFollowingGoodsById(
      id,
      adminId,
      followingGoodsDto,
    );
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление сопутствующего товара' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteFollowingGoodsById(
    @Admin('id') adminId: string,
    @Param('id') id: string,
  ) {
    return this.followingGoodsService.deleteFollowingGoodsById(adminId, id);
  }
}
