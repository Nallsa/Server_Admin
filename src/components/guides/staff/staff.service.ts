import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateStaffDto } from './dto/staff.dto';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async createStaff(createStaffDto: CreateStaffDto, parentId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const staff = await this.prisma.staff.create({
          data: {
            ...createStaffDto,
          },
        });
        return staff;
      }

      if (admin.role === 'ADMIN') {
        const staff = await this.prisma.staff.create({
          data: {
            ...createStaffDto,
            parentId,
          },
        });
        return staff;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllStaff(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const staff = await this.prisma.staff.findMany();
        return staff;
      }

      if (admin.role === 'ADMIN') {
        const staffByAdmin = await this.prisma.staff.findMany({
          where: { parentId: id },
        });

        const staffDefault = await this.prisma.staff.findMany({
          where: { parentId: null },
        });

        const staff = [...staffByAdmin, ...staffDefault];

        return staff;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getStaffById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const staff = await this.prisma.staff.findFirst({
          where: { id },
        });
        return staff;
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

        const staff = await this.prisma.staff.findFirst({
          where: { id },
        });

        return staff;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateStaffById(
    id: string,
    adminId: string,
    createStaffDto: CreateStaffDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const staff = await this.prisma.staff.update({
          where: { id },
          data: {
            ...createStaffDto,
          },
        });
        return staff;
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

        const staff = await this.prisma.staff.update({
          where: { id },
          data: {
            ...createStaffDto,
          },
        });
        return staff;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteStaffById(id: string, adminId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const staff = await this.prisma.staff.delete({
          where: { id },
        });
        return staff;
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

        const staff = await this.prisma.staff.delete({
          where: { id },
        });
        return staff;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
