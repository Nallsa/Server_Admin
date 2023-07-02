import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePaymentSettingsDto } from './dto/create-payment-settings.dto';

@Injectable()
export class IntegrateSettingsService {
  constructor(private prisma: PrismaService) {}

  async createPaymentIntegrationSettings(
    createPaymentSettingsDto: CreatePaymentSettingsDto,
    restaurantId: string,
    adminId: string,
  ) {
    const admin = await this.prisma.admin.findFirst({
      where: { id: adminId },
    });

    if (admin.role === 'ROOT') {
      const settings = await this.prisma.paymentSystemIntegration.create({
        data: createPaymentSettingsDto,
      });

      const updateRelation =
        await this.prisma.restourant2PaymentSystemIntegration.create({
          data: {
            paymentSystemIntegrationId: settings.id,
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

      const settings = await this.prisma.paymentSystemIntegration.create({
        data: createPaymentSettingsDto,
      });

      const updateRelation =
        await this.prisma.restourant2PaymentSystemIntegration.create({
          data: {
            paymentSystemIntegrationId: settings.id,
            restaurantId,
          },
        });

      return { settings, updateRelation };
    }
  }

  async getGreenSmsSettingsById(id: string) {
    try {
      return await this.prisma.paymentSystemIntegration.findUnique({
        where: { id },
      });
    } catch (e) {
      throw new HttpException('Настройки не созданы', HttpStatus.FORBIDDEN);
    }
  }

  async getAllGreenSmsSettings() {
    try {
      return await this.prisma.paymentSystemIntegration.findMany();
    } catch (e) {
      throw new HttpException('Настройки не созданы', HttpStatus.FORBIDDEN);
    }
  }

  async getAllGreenSmsSettingsByRestourantId(restaurantId: string) {
    try {
      return await this.prisma.paymentSystemIntegration.findMany({
        where: {
          restaurant: {
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
    updatePaymentSettingsDto: CreatePaymentSettingsDto,
  ) {
    try {
      return await this.prisma.paymentSystemIntegration.update({
        where: { id },
        data: updatePaymentSettingsDto,
      });
    } catch (e) {
      throw new HttpException('Настройки не созданы', HttpStatus.FORBIDDEN);
    }
  }

  async deleteGreenSmsSettingsById(id: string) {
    try {
      return await this.prisma.paymentSystemIntegration.delete({
        where: { id },
      });
    } catch (e) {
      throw new HttpException('Настройки не созданы', HttpStatus.FORBIDDEN);
    }
  }
}
