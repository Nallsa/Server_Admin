import { Module } from '@nestjs/common';
import { GoodsCategoryController } from './goods-category.controller';
import { GoodsCategoryService } from './goods-category.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GoodsCategoryController],
  providers: [
    GoodsCategoryService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [GoodsCategoryService],
})
export class GoodsCategoryModule {}
