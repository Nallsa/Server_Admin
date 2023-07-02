import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(createPaymentDto: CreatePaymentDto, parentId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const paymentVariants = await this.prisma.paymentVariants.create({
          data: {
            ...createPaymentDto,
          },
        });
        return paymentVariants;
      }

      if (admin.role === 'ADMIN') {
        const paymentVariants = await this.prisma.paymentVariants.create({
          data: {
            ...createPaymentDto,
            parentId,
          },
        });
        return paymentVariants;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllPayment(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const paymentVariants = await this.prisma.paymentVariants.findMany();
        return paymentVariants;
      }

      if (admin.role === 'ADMIN') {
        const paymentVariantsByAdmin =
          await this.prisma.paymentVariants.findMany({
            where: { parentId: id },
          });
        const paymentVariantsDefault =
          await this.prisma.paymentVariants.findMany({
            where: { parentId: null },
          });
        const paymentVariantss = [
          ...paymentVariantsByAdmin,
          ...paymentVariantsDefault,
        ];

        return paymentVariantss;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getPaymentById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const paymentVariants = await this.prisma.paymentVariants.findFirst({
          where: { id },
        });
        return paymentVariants;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { parentId: adminId },
        });

        if (restaurant.parentId !== adminId && restaurant.parentId !== null) {
          throw new HttpException(
            `У вас нет прав на просмотр платежных методов данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const paymentVariants = await this.prisma.paymentVariants.findFirst({
          where: { id, parentId: adminId },
        });
        return paymentVariants;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updatePaymentById(
    id: string,
    adminId: string,
    createPaymentDto: CreatePaymentDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const paymentVariants = await this.prisma.paymentVariants.update({
          where: { id },
          data: {
            ...createPaymentDto,
          },
        });
        return paymentVariants;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { id },
        });

        if (restaurant.parentId !== adminId) {
          throw new HttpException(
            `У вас нет прав на редактирование платежных методов данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const paymentVariants = await this.prisma.paymentVariants.update({
          where: { id },
          data: {
            ...createPaymentDto,
          },
        });
        return paymentVariants;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deletePaymentById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const paymentVariants = await this.prisma.paymentVariants.delete({
          where: { id },
        });
        return paymentVariants;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { id },
        });

        if (restaurant.parentId !== adminId) {
          throw new HttpException(
            `У вас нет прав на удаление платежных методов данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const paymentVariants = await this.prisma.paymentVariants.delete({
          where: { id },
        });
        return paymentVariants;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
