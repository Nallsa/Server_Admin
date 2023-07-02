import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDeliveryZoneDto } from './dto/delivery-zone.dto';

@Injectable()
export class DeliveryZoneService {
  constructor(private prisma: PrismaService) {}

  async createDeliveryZone(createDeliveryZoneDto: CreateDeliveryZoneDto) {
    try {
      const deliveryZone = await this.prisma.deliveryZone.create({
        data: {
          ...createDeliveryZoneDto,
        },
      });
      return deliveryZone;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllDeliveryZone() {
    try {
      return await this.prisma.deliveryZone.findMany();
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getDeliveryZoneById(id: string) {
    try {
      const deliveryZone = await this.prisma.deliveryZone.findFirst({
        where: { id },
      });
      return deliveryZone;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateDeliveryZoneById(
    id: string,
    createDeliveryZoneDto: CreateDeliveryZoneDto,
  ) {
    try {
      const deliveryZone = await this.prisma.deliveryZone.update({
        where: { id },
        data: {
          ...createDeliveryZoneDto,
        },
      });
      return deliveryZone;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteDeliveryZoneById(id: string) {
    try {
      const deliveryZone = await this.prisma.deliveryZone.delete({
        where: { id },
      });
      return deliveryZone;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
