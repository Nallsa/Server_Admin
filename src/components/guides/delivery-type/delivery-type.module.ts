import { Module } from '@nestjs/common';
import { DeliveryTypeService } from './delivery-type.service';
import { DeliveryTypeController } from './delivery-type.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    DeliveryTypeService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [DeliveryTypeController],
  exports: [DeliveryTypeService],
})
export class DeliveryTypeModule {}
