import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAdminSettingsDto } from './dto/create-settings.dto';

@Injectable()
export class AdminSettingsService {
  constructor(private prisma: PrismaService) {}

  async createGreenSmsSettings(
    createSettingsDto: CreateAdminSettingsDto,
    restaurantId: string,
    adminId: string,
  ) {
    const admin = await this.prisma.admin.findFirst({
      where: { id: adminId },
    });

    if (admin.role === 'ROOT') {
      const settings = await this.prisma.adminSettings.create({
        data: createSettingsDto,
      });

      const updateRelation = await this.prisma.restourant2AdminSettings.create({
        data: {
          adminSettingsId: settings.id,
          restaurantId,
        },
      });

      return { settings, updateRelation };
    }

    if (admin.role === 'ADMIN') {
      const restaurant = await this.prisma.restaurant.findFirst({
        where: { id: restaurantId },
      });

      if (restaurant.parentId !== adminId) {
        throw new HttpException(
          'У вас нет прав на создание настроек',
          HttpStatus.FORBIDDEN,
        );
      }

      const settings = await this.prisma.adminSettings.create({
        data: createSettingsDto,
      });

      const updateRelation = await this.prisma.restourant2AdminSettings.create({
        data: {
          adminSettingsId: settings.id,
          restaurantId,
        },
      });

      return { settings, updateRelation };
    }
  }

  async getGreenSmsSettingsById(id: string) {
    try {
      return await this.prisma.adminSettings.findUnique({
        where: { id },
      });
    } catch (e) {
      throw new HttpException('Настройки не созданы', HttpStatus.FORBIDDEN);
    }
  }

  async getAllGreenSmsSettings() {
    try {
      return await this.prisma.adminSettings.findMany();
    } catch (e) {
      throw new HttpException('Настройки не созданы', HttpStatus.FORBIDDEN);
    }
  }

  async getAllPaymentSettingsByRestourantId(restaurantId: string) {
    try {
      return await this.prisma.adminSettings.findMany({
        where: {
          restaurants: {
            every: {
              restaurantId,
            },
          },
        },
      });
    } catch (e) {
      throw new HttpException('Настройки не созданы', HttpStatus.FORBIDDEN);
    }
  }

  async updateGreenSmsSettingsById(
    id: string,
    createSettingsDto: CreateAdminSettingsDto,
  ) {
    try {
      return await this.prisma.adminSettings.update({
        where: { id },
        data: createSettingsDto,
      });
    } catch (e) {
      throw new HttpException('Настройки не созданы', HttpStatus.FORBIDDEN);
    }
  }

  async deleteGreenSmsSettingsById(id: string) {
    try {
      return await this.prisma.adminSettings.delete({
        where: { id },
      });
    } catch (e) {
      throw new HttpException('Настройки не созданы', HttpStatus.FORBIDDEN);
    }
  }
}
