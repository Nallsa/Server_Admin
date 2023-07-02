import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateStatusDto } from './dto/statuses.dto';

@Injectable()
export class StatusesService {
  constructor(private prisma: PrismaService) {}

  async createStatus(createStatusDto: CreateStatusDto, parentId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const status = await this.prisma.status.create({
          data: {
            ...createStatusDto,
          },
        });
        return status;
      }

      if (admin.role === 'ADMIN') {
        const status = await this.prisma.status.create({
          data: {
            ...createStatusDto,
            parentId,
          },
        });
        return status;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllStatus(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const statuses = await this.prisma.status.findMany();
        return statuses;
      }

      if (admin.role === 'ADMIN') {
        const statusesByAdmin = await this.prisma.status.findMany({
          where: { parentId: id },
        });
        const statusesDefault = await this.prisma.status.findMany({
          where: { parentId: null },
        });
        const statuses = [...statusesByAdmin, ...statusesDefault];

        return statuses;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getStatusById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const status = await this.prisma.status.findFirst({
          where: { id },
        });
        return status;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { id },
        });

        if (restaurant.parentId !== adminId && restaurant.parentId !== null) {
          throw new HttpException(
            `У вас нет прав на просмотр статусов данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const status = await this.prisma.status.findFirst({
          where: { id },
        });
        return status;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateStatusById(
    id: string,
    adminId: string,
    createStatusDto: CreateStatusDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const status = await this.prisma.status.update({
          where: { id },
          data: {
            ...createStatusDto,
          },
        });
        return status;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { id },
        });

        if (restaurant.parentId !== adminId) {
          throw new HttpException(
            `У вас нет прав на редактирование статусов данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const status = await this.prisma.status.update({
          where: { id },
          data: {
            ...createStatusDto,
          },
        });
        return status;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteStatusById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const status = await this.prisma.status.delete({
          where: { id },
        });
        return status;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { id },
        });

        if (restaurant.parentId !== adminId) {
          throw new HttpException(
            `У вас нет прав на удаление статусов данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const status = await this.prisma.status.delete({
          where: { id },
        });
        return status;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
