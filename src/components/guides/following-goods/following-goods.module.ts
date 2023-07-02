import { Module } from '@nestjs/common';
import { FollowingGoodsService } from './following-goods.service';
import { FollowingGoodsController } from './following-goods.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    FollowingGoodsService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [FollowingGoodsController],
  exports: [FollowingGoodsService],
})
export class FollowingGoodsModule {}
