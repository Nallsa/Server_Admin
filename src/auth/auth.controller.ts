import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { Role, User } from '@prisma/client';
import { TwoFactorDto } from './dto/two-factor.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthAdminGuard } from './guards/authAdmin.guard';
import { Roles } from './decorator/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@ApiBearerAuth()
@ApiTags('Авторизация')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/admin')
  @ApiOperation({ summary: 'Авторизация администратора' })
  @ApiResponse({
    status: 201,
    description: 'Администратор авторизован',
  })
  @UsePipes(new ValidationPipe())
  async loginAdmin(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.loginAdmin(loginUserDto);
    return this.authService.buildAdminResponse(user);
  }

  @Post('register/root/')
  @ApiOperation({ summary: 'Регистрация администратора' })
  @ApiResponse({
    status: 201,
    description: 'Администратор зарегистрирован с JWT',
  })
  // @UsePipes(new ValidationPipe())
  // @Roles(Role.ROOT)
  // @UseGuards(AuthAdminGuard, RolesGuard)
  async registerAdmin(@Body() registerAdminDto: CreateAdminDto) {
    const admin = await this.authService.registerAdmin(registerAdminDto);
    return this.authService.buildAdminResponse(admin);
  }

  @Post('login/user')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь отправил звонок для 2FA',
  })
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return await this.authService.loginUser(loginUserDto);
  }

  @Post('register/user')
  @ApiOperation({ summary: 'Создание пользователя в БД' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь создан',
  })
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() registerAdminDto: CreateUserDto): Promise<User> {
    return await this.authService.registerUserOnDB(registerAdminDto);
  }

  @Post('user/:id/twofactor')
  @ApiOperation({ summary: 'Авторизация пользователя 2FA' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь авторизован с JWT',
  })
  @UsePipes(new ValidationPipe())
  async twoFactorAuth(@Body() code: TwoFactorDto, @Param('id') userId: string) {
    const user = await this.authService.twoFactorAuth(code, userId);

    return this.authService.buildUserResponse(user);
  }

  @Get(':id/resendcall')
  @ApiOperation({ summary: 'Повторная отправка звонка' })
  @ApiResponse({
    status: 201,
    description: 'Звонок отправлен',
  })
  async resendCall(@Param('id') userId: string) {
    return this.authService.resendCall(userId);
  }
}
