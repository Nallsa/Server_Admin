import { Module } from '@nestjs/common';
import { DeliveryAdressController } from './delivery-adress.controller';
import { DeliveryAdressService } from './delivery-adress.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';
import { AuthUserGuard } from 'src/auth/guards/authUser.guard';

@Module({
  controllers: [DeliveryAdressController],
  providers: [
    DeliveryAdressService,
    PrismaService,
    AuthAdminGuard,
    AuthUserGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [DeliveryAdressService],
})
export class DeliveryAdressModule {}
