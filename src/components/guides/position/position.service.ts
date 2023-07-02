import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePositionDto } from './dto/position.dto';

@Injectable()
export class PositionService {
  constructor(private prisma: PrismaService) {}

  async createPosition(createPositionDto: CreatePositionDto, parentId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const position = await this.prisma.position.create({
          data: {
            ...createPositionDto,
          },
        });
        return position;
      }

      if (admin.role === 'ADMIN') {
        const position = await this.prisma.position.create({
          data: {
            ...createPositionDto,
            parentId,
          },
        });
        return position;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllPosition(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const position = await this.prisma.position.findMany();
        return position;
      }

      if (admin.role === 'ADMIN') {
        const positionByAdmin = await this.prisma.position.findMany({
          where: { parentId: id },
        });

        const positionDefault = await this.prisma.position.findMany({
          where: { parentId: null },
        });

        const position = [...positionByAdmin, ...positionDefault];

        return position;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getPositionById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const position = await this.prisma.position.findFirst({
          where: { id },
        });
        return position;
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

        const position = await this.prisma.position.findFirst({
          where: { id },
        });

        return position;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updatePositionById(
    id: string,
    adminId: string,
    createPositionDto: CreatePositionDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const position = await this.prisma.position.update({
          where: { id },
          data: {
            ...createPositionDto,
          },
        });
        return position;
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

        const position = await this.prisma.position.update({
          where: { id },
          data: {
            ...createPositionDto,
          },
        });
        return position;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deletePositionById(id: string, adminId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const position = await this.prisma.position.delete({
          where: { id },
        });
        return position;
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

        const position = await this.prisma.position.delete({
          where: { id },
        });
        return position;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
