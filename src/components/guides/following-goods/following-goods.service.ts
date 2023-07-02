import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FollowingGoodsDto } from './dto/following-goods.dto';

@Injectable()
export class FollowingGoodsService {
  constructor(private prisma: PrismaService) {}

  async createFollowingGoods(
    followingGoodsDto: FollowingGoodsDto,
    parentId: string,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const followingGoods = await this.prisma.followingGoods.create({
          data: {
            ...followingGoodsDto,
          },
        });
        return followingGoods;
      }

      if (admin.role === 'ADMIN') {
        const followingGoods = await this.prisma.followingGoods.create({
          data: {
            ...followingGoodsDto,
            parentId,
          },
        });
        return followingGoods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllFollowingGoods(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const followingGoods = await this.prisma.followingGoods.findMany();
        return followingGoods;
      }

      if (admin.role === 'ADMIN') {
        const followingGoodsByAdmin = await this.prisma.followingGoods.findMany(
          {
            where: { parentId: id },
          },
        );

        const followingGoodsDefault = await this.prisma.followingGoods.findMany(
          {
            where: { parentId: null },
          },
        );

        const followingGoods = [
          ...followingGoodsByAdmin,
          ...followingGoodsDefault,
        ];

        return followingGoods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getFollowingGoodsById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const followingGoods = await this.prisma.followingGoods.findFirst({
          where: { id },
        });
        return followingGoods;
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

        const followingGoods = await this.prisma.followingGoods.findFirst({
          where: { id },
        });

        return followingGoods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateFollowingGoodsById(
    id: string,
    adminId: string,
    followingGoodsDto: FollowingGoodsDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const followingGoods = await this.prisma.followingGoods.update({
          where: { id },
          data: {
            ...followingGoodsDto,
          },
        });
        return followingGoods;
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

        const followingGoods = await this.prisma.followingGoods.update({
          where: { id },
          data: {
            ...followingGoodsDto,
          },
        });
        return followingGoods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteFollowingGoodsById(id: string, adminId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const followingGoods = await this.prisma.followingGoods.delete({
          where: { id },
        });
        return followingGoods;
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

        const followingGoods = await this.prisma.followingGoods.delete({
          where: { id },
        });
        return followingGoods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
