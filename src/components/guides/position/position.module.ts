import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PositionService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [PositionController],
  exports: [PositionService],
})
export class PositionModule {}
