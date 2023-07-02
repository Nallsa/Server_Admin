import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
