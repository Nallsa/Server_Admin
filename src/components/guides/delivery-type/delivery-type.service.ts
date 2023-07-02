import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDeliveryTypeDto } from './dto/delivery-type.dto';

@Injectable()
export class DeliveryTypeService {
  constructor(private prisma: PrismaService) {}

  async createDeliveryType(
    createDeliveryDto: CreateDeliveryTypeDto,
    parentId: string,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const deliveryType = await this.prisma.deliveryType.create({
          data: {
            ...createDeliveryDto,
          },
        });
        return deliveryType;
      }

      if (admin.role === 'ADMIN') {
        const deliveryType = await this.prisma.deliveryType.create({
          data: {
            ...createDeliveryDto,
            parentId,
          },
        });
        return deliveryType;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllDeliveryType(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const deliveryTypes = await this.prisma.deliveryType.findMany();
        return deliveryTypes;
      }

      if (admin.role === 'ADMIN') {
        const deliveryTypesByAdmin = await this.prisma.deliveryType.findMany({
          where: { parentId: id },
        });
        const deliveryDefault = await this.prisma.deliveryType.findMany({
          where: { parentId: null },
        });
        const deliveryTypes = [...deliveryTypesByAdmin, ...deliveryDefault];

        return deliveryTypes;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getDeliveryTypeById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const deliveryType = await this.prisma.deliveryType.findFirst({
          where: { id },
        });
        return deliveryType;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { id },
        });

        if (restaurant.parentId !== adminId && restaurant.parentId !== null) {
          throw new HttpException(
            `У вас нет прав на просмотр способов доставки данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const deliveryType = await this.prisma.deliveryType.findFirst({
          where: { id },
        });
        return deliveryType;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateDeliveryType(
    adminId: string,
    id: string,
    createDeliveryDto: CreateDeliveryTypeDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const deliveryType = await this.prisma.deliveryType.update({
          where: { id },
          data: {
            ...createDeliveryDto,
          },
        });
        return deliveryType;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { id },
        });

        if (restaurant.parentId !== adminId) {
          throw new HttpException(
            `У вас нет прав на редактирование способов доставки данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const deliveryType = await this.prisma.deliveryType.update({
          where: { id },
          data: {
            ...createDeliveryDto,
          },
        });
        return deliveryType;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteDeliveryType(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const deliveryType = await this.prisma.deliveryType.delete({
          where: { id },
        });
        return deliveryType;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { id },
        });

        if (restaurant.parentId !== adminId) {
          throw new HttpException(
            `У вас нет прав на удаление способов доставки данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const deliveryType = await this.prisma.deliveryType.delete({
          where: { id },
        });
        return deliveryType;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
