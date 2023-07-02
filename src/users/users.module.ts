import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { AuthUserGuard } from 'src/auth/guards/authUser.guard';

@Module({
  controllers: [UserController],
  providers: [UsersService, PrismaService, AuthAdminGuard, AuthUserGuard],
  exports: [UsersService],
})
export class UsersModule {}
