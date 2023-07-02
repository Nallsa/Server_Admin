import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateModificatorsDto } from './dto/modificators.dto';
import { getSlug } from 'src/components/utils/get-slug.utils';

@Injectable()
export class ModificatorsService {
  constructor(private prisma: PrismaService) {}

  async createModificators(
    сreateModificatorsDto: CreateModificatorsDto,
    parentId: string,
  ) {
    try {
      const slug = getSlug(сreateModificatorsDto.title);

      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const modificators = await this.prisma.modificators.create({
          data: {
            ...сreateModificatorsDto,
            slug,
          },
        });
        return modificators;
      }

      if (admin.role === 'ADMIN') {
        const modificators = await this.prisma.modificators.create({
          data: {
            ...сreateModificatorsDto,
            slug,
            parentId,
          },
        });
        return modificators;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllModificators(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const modificators = await this.prisma.modificators.findMany();
        return modificators;
      }

      if (admin.role === 'ADMIN') {
        const modificatorsByAdmin = await this.prisma.modificators.findMany({
          where: { parentId: id },
        });

        const modificatorsDefault = await this.prisma.modificators.findMany({
          where: { parentId: null },
        });

        const modificators = [...modificatorsByAdmin, ...modificatorsDefault];

        return modificators;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getModificatorsById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const modificators = await this.prisma.modificators.findFirst({
          where: { id },
        });
        return modificators;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { parentId: adminId },
        });

        if (restaurant.parentId !== adminId && restaurant.parentId !== null) {
          throw new HttpException(
            `У вас нет прав на просмотр товаров данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const modificators = await this.prisma.modificators.findFirst({
          where: { id },
        });

        return modificators;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateModificatorsById(
    id: string,
    adminId: string,
    сreateModificatorsDto: CreateModificatorsDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const modificators = await this.prisma.modificators.update({
          where: { id },
          data: {
            ...сreateModificatorsDto,
          },
        });
        return modificators;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { parentId: adminId },
        });

        if (restaurant.parentId !== adminId) {
          throw new HttpException(
            `У вас нет прав на редактирование товаров данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const modificators = await this.prisma.modificators.update({
          where: { id },
          data: {
            ...сreateModificatorsDto,
          },
        });
        return modificators;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteModificatorsById(id: string, adminId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const modificators = await this.prisma.modificators.delete({
          where: { id },
        });
        return modificators;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { parentId: adminId },
        });

        if (restaurant.parentId !== adminId) {
          throw new HttpException(
            `У вас нет прав на удаление товаров данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const modificators = await this.prisma.modificators.delete({
          where: { id },
        });
        return modificators;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
