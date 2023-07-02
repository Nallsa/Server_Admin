import { Module } from '@nestjs/common';
import { ModificatorsService } from './modificators.service';
import { ModificatorsController } from './modificators.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    ModificatorsService,

    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [ModificatorsController],
  exports: [ModificatorsService],
})
export class ModificatorsModule {}
