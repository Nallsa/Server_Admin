import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GoodsController],
  providers: [
    GoodsService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [GoodsService],
})
export class GoodsModule {}
