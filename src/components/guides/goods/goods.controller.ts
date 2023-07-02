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
import { CreateGoodsDto } from './dto/goods.dto';
import { GoodsService } from './goods.service';
import { AuthUserGuard } from 'src/auth/guards/authUser.guard';
import { User } from 'src/auth/decorator/user.decorator';

@ApiBearerAuth()
@ApiTags('Товары')
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  @ApiOperation({ summary: 'Создание статуса' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createGoods(
    @Body() createGoodsDto: CreateGoodsDto,
    @Admin('id') parentId: string,
  ) {
    return this.goodsService.createGoods(createGoodsDto, parentId);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех статусов' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllGoods(@Admin('id') id: string) {
    return this.goodsService.getAllGoods(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Поиск всех статусов по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getGoodsById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.goodsService.getGoodsById(adminId, id);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Изменение статуса по ид' })
  @ApiResponse({
    status: 200,
    description: 'Успешно изменен',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateGoodsById(
    @Param('id') id: string,
    @Admin('id') adminId: string,
    @Body() createGoodsDto: CreateGoodsDto,
  ) {
    return this.goodsService.updateGoodsById(id, adminId, createGoodsDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление статуса' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteGoodsById(@Admin('id') adminId: string, @Param('id') id: string) {
    return this.goodsService.deleteGoodsById(adminId, id);
  }

  @Post('/addToFavourites/:id')
  @ApiOperation({ summary: 'Удаление статуса' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @UseGuards(AuthUserGuard)
  addGoodsToFavourites(
    @Param('id') goodsId: string,
    @User('id') userId: string,
  ) {
    return this.goodsService.addGoodsToFavourites(goodsId, userId);
  }

  @Delete('/deleteFromFavourites/:id')
  @ApiOperation({ summary: 'Удаление статуса' })
  @ApiResponse({
    status: 200,
    description: 'Успешно удален',
  })
  @UseGuards(AuthUserGuard)
  deleteGoodsFromFavourites(
    @Param('id') goodsId: string,
    @User('id') userId: string,
  ) {
    return this.goodsService.deleteGoodsFromFavourites(goodsId, userId);
  }
}
