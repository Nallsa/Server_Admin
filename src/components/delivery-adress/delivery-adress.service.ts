import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDeliveryAddressDto } from './dto/create-delivery-adress.dto';

@Injectable()
export class DeliveryAdressService {
  constructor(private prisma: PrismaService) {}

  async createDeliveryAdress(
    createDeliveryAddressDto: CreateDeliveryAddressDto,
    userId: string,
  ) {
    const deliveryAddress = await this.prisma.deliveryAddress.create({
      data: {
        ...createDeliveryAddressDto,
      },
    });

    const updateRelations = await this.prisma.deliveryAddress2Users.create({
      data: {
        deliveryAddressId: deliveryAddress.id,
        userId,
      },
    });

    return { deliveryAddress, updateRelations };
  }

  async getAllDeliveryAdress(userId: string) {
    const deliveryAddress = await this.prisma.deliveryAddress.findMany({
      where: {
        user: {
          every: {
            id: userId,
          },
        },
      },
    });

    return deliveryAddress;
  }

  async getDeliveryAdressById(id: string, userId: string) {
    const deliveryAddress = await this.prisma.deliveryAddress.findFirst({
      where: {
        id,
      },
    });

    const findRelations = await this.prisma.deliveryAddress2Users.findMany({
      where: {
        deliveryAddressId: id,
        userId,
      },
    });

    if (!findRelations.length) {
      throw new Error('У вас нет прав на просмотр этого адреса');
    }

    return deliveryAddress;
  }

  async updateDeliveryAdressById(
    id: string,
    createDeliveryAddressDto: CreateDeliveryAddressDto,
    userId: string,
  ) {
    const findRelation = await this.prisma.deliveryAddress2Users.findFirst({
      where: {
        deliveryAddressId: id,
        userId,
      },
    });

    if (!findRelation) {
      throw new Error('У вас нет прав на редактирование этого адреса');
    }

    const deliveryAddress = await this.prisma.deliveryAddress.update({
      where: {
        id,
      },
      data: {
        ...createDeliveryAddressDto,
      },
    });

    return deliveryAddress;
  }

  async deleteDeliveryAdressById(id: string, userId: string) {
    const findRelation = await this.prisma.deliveryAddress2Users.findFirst({
      where: {
        deliveryAddressId: id,
        userId,
      },
    });

    if (!findRelation) {
      throw new Error('У вас нет прав на удаление этого адреса');
    }

    const deliveryAddress = await this.prisma.deliveryAddress.delete({
      where: {
        id,
      },
    });

    return deliveryAddress;
  }
}
