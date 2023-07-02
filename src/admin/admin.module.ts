import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from 'src/prisma.service';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, AuthAdminGuard],
  exports: [AdminService],
})
export class AdminModule {}
