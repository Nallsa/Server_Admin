import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePaymentStatusDto } from './dto/payment-statuses.dto';

@Injectable()
export class PaymentStatusesService {
  constructor(private prisma: PrismaService) {}

  async createPaymentStatus(createPaymentStatusDto: CreatePaymentStatusDto) {
    try {
      const paymentStatus = await this.prisma.paymentStatus.create({
        data: {
          ...createPaymentStatusDto,
        },
      });
      return paymentStatus;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllPaymentStatus() {
    try {
      return await this.prisma.paymentStatus.findMany();
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getPaymentStatusById(id: string) {
    try {
      const paymentStatus = await this.prisma.paymentStatus.findFirst({
        where: { id },
      });
      return paymentStatus;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updatePaymentStatusById(
    id: string,
    createPaymentStatusDto: CreatePaymentStatusDto,
  ) {
    try {
      const paymentStatus = await this.prisma.paymentStatus.update({
        where: { id },
        data: {
          ...createPaymentStatusDto,
        },
      });
      return paymentStatus;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deletePaymentStatusById(id: string) {
    try {
      const paymentStatus = await this.prisma.paymentStatus.delete({
        where: { id },
      });
      return paymentStatus;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
