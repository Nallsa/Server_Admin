import { Module } from '@nestjs/common';
import { PaymentStatusesController } from './payment-statuses.controller';
import { PaymentStatusesService } from './payment-statuses.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PaymentStatusesController],
  providers: [
    PaymentStatusesService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [PaymentStatusesService],
})
export class PaymentStatusesModule {}
