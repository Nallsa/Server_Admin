import { Module } from '@nestjs/common';
import { AdminSettingsController } from './admin-settings.controller';
import { AdminSettingsService } from './admin-settings.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AdminSettingsController],
  providers: [
    AdminSettingsService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AdminSettingsService],
})
export class AdminSettingsModule {}
