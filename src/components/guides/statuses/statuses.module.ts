import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    StatusesService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [StatusesController],
  exports: [StatusesService],
})
export class StatusesModule {}
