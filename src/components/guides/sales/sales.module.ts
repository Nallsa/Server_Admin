import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SalesController],
  providers: [
    SalesService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [SalesService],
})
export class SalesModule {}
