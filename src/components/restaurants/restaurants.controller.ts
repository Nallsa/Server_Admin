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
import { RestourantsService } from './restaurants.service';
import { CreateRestourantDto } from './dto/create-restaurant.dto';
import { Admin } from 'src/auth/decorator/admin.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('Рестораны')
@Controller('restourants')
export class RestourantsController {
  constructor(private readonly restourantsService: RestourantsService) {}

  @Post()
  @ApiOperation({ summary: 'Регистрация ресторана' })
  @ApiResponse({
    status: 201,
    description: 'Ресторан зарегистрирован',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  createRestourant(
    @Body() createRestourantDto: CreateRestourantDto,
    @Admin('id') parentId: string,
  ) {
    return this.restourantsService.createRestourant(
      createRestourantDto,
      parentId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Поиск всех ресторанов' })
  @ApiResponse({
    status: 200,
    description: 'Рестораны найдены',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getAllRestourants(@Admin('id') id: string) {
    return this.restourantsService.getRestourants(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Поиск ресторана по id' })
  @ApiResponse({
    status: 200,
    description: 'Ресторан найден',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  getRestourantById(@Param('id') id: string, @Admin('id') adminId: string) {
    return this.restourantsService.getRestourantById(id, adminId);
  }

  @Put(':id/update')
  @ApiOperation({ summary: 'Изменение ресторана' })
  @ApiResponse({
    status: 201,
    description: 'Ресторан изменен',
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  updateRestourant(
    @Param('id') id: string,
    @Body() createRestourantDto: CreateRestourantDto,
    @Admin('id') adminId: string,
  ) {
    return this.restourantsService.updateRestourant(
      id,
      createRestourantDto,
      adminId,
    );
  }

  @Delete(':id/delete')
  @ApiOperation({ summary: 'Удаление ресторана' })
  @ApiResponse({
    status: 204,
    description: 'Ресторан удален',
  })
  @Roles(Role.ROOT, Role.ADMIN)
  @UseGuards(AuthAdminGuard, RolesGuard)
  deleteRestourant(@Param('id') id: string, @Admin('id') adminId: string) {
    return this.restourantsService.deleteRestourant(id, adminId);
  }
}
