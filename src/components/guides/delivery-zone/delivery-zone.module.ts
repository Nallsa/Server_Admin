import { Module } from '@nestjs/common';
import { DeliveryZoneController } from './delivery-zone.controller';
import { DeliveryZoneService } from './delivery-zone.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DeliveryZoneController],
  providers: [
    DeliveryZoneService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [DeliveryZoneService],
})
export class DeliveryZoneModule {}
