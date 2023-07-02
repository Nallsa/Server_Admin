import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  private async createCart(userId: string) {
    const cart = await this.prisma.cart.create({
      data: {
        userId,
      },
    });

    return cart;
  }

  async addGoodToCart(
    goodsId: string,
    createCartDto: CreateCartDto,
    userId: string,
  ) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId,
      },
    });

    if (!cart) {
      const newCart = await this.createCart(userId);

      const cartGood = await this.prisma.cart2Goods.create({
        data: {
          ...createCartDto,
          cartId: newCart.id,
          goodsId,
        },
      });

      return cartGood;
    } else {
      const cartUpdate = await this.prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          updatedAt: new Date(),
        },
      });

      const findRelation = await this.prisma.cart2Goods.findFirst({
        where: {
          cartId: cartUpdate.id,
          goodsId,
        },
      });

      const updateRelation = await this.prisma.cart2Goods.update({
        where: {
          id: findRelation.id,
        },
        data: {
          count: findRelation.count + createCartDto.count,
          sum: findRelation.sum + createCartDto.sum,
        },
      });

      return updateRelation;
    }
  }

  async removeGoodFromCart(goodsId: string, userId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId,
      },
    });

    const findRelation = await this.prisma.cart2Goods.findFirst({
      where: {
        cartId: cart.id,
        goodsId,
      },
    });

    const deleteRelation = await this.prisma.cart2Goods.delete({
      where: {
        id: findRelation.id,
      },
    });

    return deleteRelation;
  }

  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId,
      },
    });

    const deleteRelations = await this.prisma.cart2Goods.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    const deleteCart = await this.prisma.cart.delete({
      where: {
        id: cart.id,
      },
    });

    return { deleteRelations, deleteCart };
  }
}
