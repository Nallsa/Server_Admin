import { Module } from '@nestjs/common';
import { RestourantsController } from './restaurants.controller';
import { RestourantsService } from './restaurants.service';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  controllers: [RestourantsController],
  providers: [
    RestourantsService,
    PrismaService,
    AuthAdminGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [RestourantsService],
})
export class RestourantsModule {}
