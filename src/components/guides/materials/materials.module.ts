import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    MaterialsService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [MaterialsController],
  exports: [MaterialsService],
})
export class MaterialsModule {}
