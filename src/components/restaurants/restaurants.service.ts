import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRestourantDto } from './dto/create-restaurant.dto';
import { getSlug } from '../utils/get-slug.utils';

@Injectable()
export class RestourantsService {
  constructor(private prisma: PrismaService) {}

  async createRestourant(
    createRestourantDto: CreateRestourantDto,
    parentId: string,
  ) {
    try {
      const slug = getSlug(createRestourantDto.name);
      const restaurant = await this.prisma.restaurant.create({
        data: {
          ...createRestourantDto,
          parentId,
          slug,
        },
      });
      return restaurant;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getRestourants(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const restourants = await this.prisma.restaurant.findMany();

        return restourants;
      }

      const restourants = await this.prisma.restaurant.findMany({
        where: { parentId: id },
      });

      return restourants;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getRestourantById(id: string, adminId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { id },
        });
        if (!restaurant) {
          throw new HttpException('Ресторан не найден', HttpStatus.NOT_FOUND);
        }
        return restaurant;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { id, parentId: adminId },
        });

        if (!restaurant) {
          throw new HttpException('Ресторан не найден', HttpStatus.NOT_FOUND);
        }

        return restaurant;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateRestourant(
    id: string,
    createRestourantDto: CreateRestourantDto,
    adminId: string,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      const restaurant = await this.prisma.restaurant.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const restaurant = await this.prisma.restaurant.update({
          where: { id },
          data: createRestourantDto,
        });
        return restaurant;
      }

      if (restaurant.parentId !== adminId) {
        throw new HttpException(
          'Вы не можете редактировать этот ресторан',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      return await this.prisma.restaurant.update({
        where: { id },
        data: createRestourantDto,
      });
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteRestourant(id: string, adminId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const restaurant = await this.prisma.restaurant.delete({
          where: { id },
        });
        return restaurant;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { id, parentId: adminId },
        });

        if (!restaurant) {
          throw new HttpException('Ресторан не найден', HttpStatus.NOT_FOUND);
        }

        return await this.prisma.restaurant.delete({
          where: { id },
        });
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
