import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../auth/decorator/user.decorator';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { AuthUserGuard } from 'src/auth/guards/authUser.guard';
import { User as UserResponse } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationAndSearchQueryDto } from 'src/common/pagination-query.dto';

@ApiBearerAuth()
@ApiTags('Пользователи')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('create-admin')
  @ApiOperation({ summary: 'Создание пользователя администратором' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь создан',
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthAdminGuard)
  create(@Body('user') createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Успешно',
  })
  @UseGuards(AuthAdminGuard)
  findAll(@Query() paginationAndSearchQuery: PaginationAndSearchQueryDto) {
    return this.userService.findAll(paginationAndSearchQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({
    status: 200,
    description: 'Успешно',
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthAdminGuard || AuthUserGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put('update')
  @ApiOperation({ summary: 'Редактирование пользователя самим пользователем' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь обновлен',
    type: CreateUserDto,
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthUserGuard)
  update(
    @User('id') currentUserId: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    return this.userService.update(currentUserId, updateUserDto);
  }

  @Put(':id/update')
  @ApiOperation({
    summary: 'Редактирование пользователя Администратором по id',
  })
  @ApiResponse({
    status: 201,
    description: 'Пользователь обновлен',
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthAdminGuard)
  updateAdmin(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Удаление пользователя самим пользователем' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь удален',
  })
  @UseGuards(AuthUserGuard)
  remove(@User('id') currentUserId: string): Promise<UserResponse> {
    return this.userService.remove(currentUserId);
  }

  @ApiOperation({
    summary: 'Удаление пользователя Администратором по id',
  })
  @ApiResponse({
    status: 201,
    description: 'Пользователь удален',
  })
  @Delete(':id/delete')
  @UseGuards(AuthAdminGuard)
  removeAdmin(@Param('id') id: string): Promise<UserResponse> {
    return this.userService.remove(id);
  }
}
