import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryGoodsDto } from './dto/goods-category.dto';

@Injectable()
export class GoodsCategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategoryGoods(
    categoriesGoodsDto: CategoryGoodsDto,
    parentId: string,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const categoriesGoods = await this.prisma.categoriesGoods.create({
          data: {
            ...categoriesGoodsDto,
          },
        });
        return categoriesGoods;
      }

      if (admin.role === 'ADMIN') {
        const categoriesGoods = await this.prisma.categoriesGoods.create({
          data: {
            ...categoriesGoodsDto,
            parentId,
          },
        });
        return categoriesGoods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllCategoryGoods(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const categoriesGoods = await this.prisma.categoriesGoods.findMany();
        return categoriesGoods;
      }

      if (admin.role === 'ADMIN') {
        const categoriesGoodsByAdmin =
          await this.prisma.categoriesGoods.findMany({
            where: { parentId: id },
          });

        const categoriesGoodsDefault =
          await this.prisma.categoriesGoods.findMany({
            where: { parentId: null },
          });

        const categoriesGoods = [
          ...categoriesGoodsByAdmin,
          ...categoriesGoodsDefault,
        ];

        return categoriesGoods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getCategoryGoodsById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const categoriesGoods = await this.prisma.categoriesGoods.findFirst({
          where: { id },
        });
        return categoriesGoods;
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

        const categoriesGoods = await this.prisma.categoriesGoods.findFirst({
          where: { id },
        });

        return categoriesGoods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateCategoryGoodsById(
    id: string,
    adminId: string,
    categoriesGoodsDto: CategoryGoodsDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const categoriesGoods = await this.prisma.categoriesGoods.update({
          where: { id },
          data: {
            ...categoriesGoodsDto,
          },
        });
        return categoriesGoods;
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

        const categoriesGoods = await this.prisma.categoriesGoods.update({
          where: { id },
          data: {
            ...categoriesGoodsDto,
          },
        });
        return categoriesGoods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteCategoryGoodsById( adminId: string, id: string,) {
    try {
      
      
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const categoriesGoods = await this.prisma.categoriesGoods.delete({
          where: { id },
        });
        return categoriesGoods;
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

        const categoriesGoods = await this.prisma.categoriesGoods.delete({
          where: { id },
        });
        return categoriesGoods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
