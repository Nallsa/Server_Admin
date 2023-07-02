import { Item } from './../../../../../admin_test/src/components/settings/productTypes/Styles.elements';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGoodsDto } from './dto/goods.dto';
import { getSlug } from 'src/components/utils/get-slug.utils';

@Injectable()
export class GoodsService {
  constructor(private prisma: PrismaService) {}

  async createGoods(createGoodsDto: CreateGoodsDto, parentId: string) {
    try {
      const slug = getSlug(createGoodsDto.title);

      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const { restaurantPrice } = createGoodsDto;

        const goodsFil = { ...createGoodsDto };

        delete goodsFil.restaurantPrice;

        const goods = await this.prisma.goods.create({
          data: {
            ...goodsFil,
            slug,
          },
        });

        await this.prisma.restaurantPrice.createMany({
          data: restaurantPrice.map((i) => {
            return { ...i, goodsId: goods.id };
          }),
        });

        return goods;
      }

      if (admin.role === 'ADMIN') {
        const goods = await this.prisma.goods.create({
          data: {
            ...createGoodsDto,
            slug,
            parentId,
          },
        });
        return goods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllGoods(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const goods = await this.prisma.goods.findMany({
          include: {
            restaurantPrice: true,
          },
        });
        return goods;
      }

      if (admin.role === 'ADMIN') {
        const goodsByAdmin = await this.prisma.goods.findMany({
          where: { parentId: id },
        });

        const goodsDefault = await this.prisma.goods.findMany({
          where: { parentId: null },
        });

        const goods = [...goodsByAdmin, ...goodsDefault];

        return goods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getGoodsById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const goods = await this.prisma.goods.findFirst({
          where: { id },
        });
        return goods;
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

        const goods = await this.prisma.goods.findFirst({
          where: { id },
        });

        return goods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateGoodsById(
    id: string,
    adminId: string,
    createGoodsDto: CreateGoodsDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const goodsFill = { ...createGoodsDto };
        const { restaurantPrice } = createGoodsDto;

        delete goodsFill.restaurantPrice;

        // const goods = await this.prisma.goods.update({
        //   where: { id },
        //   data: {
        //     ...goodsFill,
        //   },
        // });

        restaurantPrice.filter(item=>{

        })

        const goods = await this.prisma.restaurantPrice.findMany(
          {
          where: { restaurantId: '1' },
        }
        );

        console.log(goods);

        // const goods = await this.prisma.goods.update({
        //   where: { id },
        //   data: {
        //     ...goodsFill,
        //   },
        // });

        // return goods;
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

        const goods = await this.prisma.goods.update({
          where: { id },
          data: {
            ...createGoodsDto,
          },
        });
        return goods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteGoodsById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const goods = await this.prisma.goods.delete({
          where: { id },
        });
        return goods;
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

        const goods = await this.prisma.goods.delete({
          where: { id },
        });
        return goods;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async addGoodsToFavourites(goodsId: string, userId: string) {
    try {
      const goods = await this.prisma.goods.findFirst({
        where: { id: goodsId },
      });

      const findUnique = await this.prisma.user2Goods.findFirst({
        where: {
          goodsId,
          userId,
        },
      });

      if (!findUnique) {
        await this.prisma.user2Goods.create({
          data: {
            goodsId,
            userId,
          },
        });

        goods.likes++;

        return await this.prisma.goods.update({
          where: { id: goodsId },
          data: goods,
        });
      }

      return goods;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteGoodsFromFavourites(goodsId: string, userId: string) {
    try {
      const goods = await this.prisma.goods.findFirst({
        where: { id: goodsId },
      });

      const findUnique = await this.prisma.user2Goods.findFirst({
        where: {
          goodsId,
          userId,
        },
      });

      if (findUnique) {
        await this.prisma.user2Goods.delete({
          where: {
            id: findUnique.id,
          },
        });

        goods.likes--;

        return await this.prisma.goods.update({
          where: { id: goodsId },
          data: goods,
        });
      }

      return goods;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
