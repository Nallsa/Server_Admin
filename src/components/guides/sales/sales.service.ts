import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSalesDto } from './dto/sales.dto';
import { getSlug } from 'src/components/utils/get-slug.utils';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createSales(createSalesDto: CreateSalesDto, parentId: string) {
    try {
      const slug = getSlug(createSalesDto.title);

      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const sales = await this.prisma.sales.create({
          data: {
            ...createSalesDto,
            slug,
          },
        });
        return sales;
      }

      if (admin.role === 'ADMIN') {
        const sales = await this.prisma.sales.create({
          data: {
            ...createSalesDto,
            slug,
            parentId,
          },
        });
        return sales;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllSales(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const sales = await this.prisma.sales.findMany();
        return sales;
      }

      if (admin.role === 'ADMIN') {
        const salesByAdmin = await this.prisma.sales.findMany({
          where: { parentId: id },
        });

        const salesDefault = await this.prisma.sales.findMany({
          where: { parentId: null },
        });

        const sales = [...salesByAdmin, ...salesDefault];

        return sales;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getSalesById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const sales = await this.prisma.sales.findFirst({
          where: { id },
        });
        return sales;
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

        const sales = await this.prisma.sales.findFirst({
          where: { id },
        });

        return sales;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateSalesById(
    id: string,
    adminId: string,
    createSalesDto: CreateSalesDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const sales = await this.prisma.sales.update({
          where: { id },
          data: {
            ...createSalesDto,
          },
        });
        return sales;
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

        const sales = await this.prisma.sales.update({
          where: { id },
          data: {
            ...createSalesDto,
          },
        });
        return sales;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteSalesById(id: string, adminId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const sales = await this.prisma.sales.delete({
          where: { id },
        });
        return sales;
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

        const sales = await this.prisma.sales.delete({
          where: { id },
        });
        return sales;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
