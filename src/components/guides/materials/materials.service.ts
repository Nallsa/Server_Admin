import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMaterialsDto } from './dto/materials.dto';

@Injectable()
export class MaterialsService {
  constructor(private prisma: PrismaService) {}

  async createMaterials(
    сreateMaterialsDto: CreateMaterialsDto,
    parentId: string,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const materials = await this.prisma.materials.create({
          data: {
            ...сreateMaterialsDto,
          },
        });
        return materials;
      }

      if (admin.role === 'ADMIN') {
        const materials = await this.prisma.materials.create({
          data: {
            ...сreateMaterialsDto,
            parentId,
          },
        });
        return materials;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllMaterials(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const materials = await this.prisma.materials.findMany();
        return materials;
      }

      if (admin.role === 'ADMIN') {
        const materialsByAdmin = await this.prisma.materials.findMany({
          where: { parentId: id },
        });

        const materialsDefault = await this.prisma.materials.findMany({
          where: { parentId: null },
        });

        const materials = [...materialsByAdmin, ...materialsDefault];

        return materials;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getMaterialsById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const materials = await this.prisma.materials.findFirst({
          where: { id },
        });
        return materials;
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

        const materials = await this.prisma.materials.findFirst({
          where: { id },
        });

        return materials;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateMaterialsById(
    id: string,
    adminId: string,
    сreateMaterialsDto: CreateMaterialsDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const materials = await this.prisma.materials.update({
          where: { id },
          data: {
            ...сreateMaterialsDto,
          },
        });
        return materials;
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

        const materials = await this.prisma.materials.update({
          where: { id },
          data: {
            ...сreateMaterialsDto,
          },
        });
        return materials;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteMaterialsById(id: string, adminId: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const materials = await this.prisma.materials.delete({
          where: { id },
        });
        return materials;
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

        const materials = await this.prisma.materials.delete({
          where: { id },
        });
        return materials;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
