import { Module } from '@nestjs/common';
import { IntegrateSettingsController } from './integrate-settings.controller';
import { IntegrateSettingsService } from './integrate-settings.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [IntegrateSettingsController],
  providers: [
    IntegrateSettingsService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class IntegrateSettingsModule {}
