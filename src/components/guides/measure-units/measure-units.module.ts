import { Module } from '@nestjs/common';
import { MeasureUnitsService } from './measure-units.service';
import { MeasureUnitsController } from './measure-units.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    MeasureUnitsService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [MeasureUnitsController],
  exports: [MeasureUnitsService],
})
export class MeasureUnitsModule {}
