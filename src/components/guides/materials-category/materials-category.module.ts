import { Module } from '@nestjs/common';
import { MaterialsCategoryController } from './materials-category.controller';
import { MaterialsCategoryService } from './materials-category.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MaterialsCategoryController],
  providers: [
    MaterialsCategoryService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [MaterialsCategoryService],
})
export class MaterialsCategoryModule {}
