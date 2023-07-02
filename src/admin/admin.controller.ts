import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { Admin } from 'src/auth/decorator/admin.decorator';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Администраторы')
@Controller('admin')
export class AdminController {
  constructor(private readonly userService: AdminService) {}

  @Get('admins')
  @ApiOperation({ summary: 'Поиск всех администраторов' })
  @ApiResponse({
    status: 200,
    description: 'Администраторы найдены',
  })
  @UseGuards(AuthAdminGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Поиск администратора по id' })
  @ApiResponse({
    status: 200,
    description: 'Администратор найден',
  })
  @UseGuards(AuthAdminGuard)
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id/update')
  @ApiOperation({ summary: 'Изменение администратора самим администратором' })
  @ApiResponse({
    status: 201,
    description: 'Администратор изменен',
  })
  @UseGuards(AuthAdminGuard)
  @UsePipes(new ValidationPipe())
  update(
    @Body() updateUserDto: CreateAdminDto,
    @Admin('id') currentUserId: string,
  ) {
    return this.userService.update(currentUserId, updateUserDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление администратора самим администратором' })
  @ApiResponse({
    status: 204,
    description: 'Администратор удален',
  })
  @UseGuards(AuthAdminGuard)
  remove(@Admin('id') currentUserId: string) {
    return this.userService.remove(currentUserId);
  }
}
