import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMaterialsCategoryDto } from './dto/materials-category.dto';

@Injectable()
export class MaterialsCategoryService {
  constructor(private prisma: PrismaService) {}

  async createMaterialCategory(
    сreateMaterialsCategoryDto: CreateMaterialsCategoryDto,
    parentId: string,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const materialCategory = await this.prisma.materialCategory.create({
          data: {
            ...сreateMaterialsCategoryDto,
          },
        });
        return materialCategory;
      }

      if (admin.role === 'ADMIN') {
        const materialCategory = await this.prisma.materialCategory.create({
          data: {
            ...сreateMaterialsCategoryDto,
            parentId,
          },
        });
        return materialCategory;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllMaterialCategory(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const materialCategory = await this.prisma.materialCategory.findMany();
        return materialCategory;
      }

      if (admin.role === 'ADMIN') {
        const materialCategoryByAdmin =
          await this.prisma.materialCategory.findMany({
            where: { parentId: id },
          });

        const materialCategoryDefault =
          await this.prisma.materialCategory.findMany({
            where: { parentId: null },
          });

        const materialCategory = [
          ...materialCategoryByAdmin,
          ...materialCategoryDefault,
        ];

        return materialCategory;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getMaterialCategoryById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const materialCategory = await this.prisma.materialCategory.findFirst({
          where: { id },
        });
        return materialCategory;
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

        const materialCategory = await this.prisma.materialCategory.findFirst({
          where: { id },
        });

        return materialCategory;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateMaterialCategoryById(
    id: string,
    adminId: string,
    сreateMaterialsCategoryDto: CreateMaterialsCategoryDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const materialCategory = await this.prisma.materialCategory.update({
          where: { id },
          data: {
            ...сreateMaterialsCategoryDto,
          },
        });
        return materialCategory;
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

        const materialCategory = await this.prisma.materialCategory.update({
          where: { id },
          data: {
            ...сreateMaterialsCategoryDto,
          },
        });
        return materialCategory;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteMaterialCategoryById(id: string, adminId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const materialCategory = await this.prisma.materialCategory.delete({
          where: { id },
        });
        return materialCategory;
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

        const materialCategory = await this.prisma.materialCategory.delete({
          where: { id },
        });
        return materialCategory;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
