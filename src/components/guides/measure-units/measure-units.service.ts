import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMeasurementUnitsDto } from './dto/measure-units.dto';

@Injectable()
export class MeasureUnitsService {
  constructor(private prisma: PrismaService) {}

  async createMeasurementUnit(
    createMeasurementUnitsDto: CreateMeasurementUnitsDto,
    parentId: string,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: parentId },
      });

      if (admin.role === 'ROOT') {
        const measureUnit = await this.prisma.measurmentsUnits.create({
          data: {
            ...createMeasurementUnitsDto,
          },
        });
        return measureUnit;
      }

      if (admin.role === 'ADMIN') {
        const measureUnit = await this.prisma.measurmentsUnits.create({
          data: {
            ...createMeasurementUnitsDto,
            parentId,
          },
        });
        return measureUnit;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllMeasurementUnit(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id },
      });

      if (admin.role === 'ROOT') {
        const measureUnits = await this.prisma.measurmentsUnits.findMany();
        return measureUnits;
      }

      if (admin.role === 'ADMIN') {
        const measureUnitsByAdmin = await this.prisma.measurmentsUnits.findMany(
          {
            where: { parentId: id },
          },
        );
        const measureUnitsDefault = await this.prisma.measurmentsUnits.findMany(
          {
            where: { parentId: null },
          },
        );
        const measureUnits = [...measureUnitsByAdmin, ...measureUnitsDefault];

        return measureUnits;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getMeasurementUnitById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const measurmentsUnits = await this.prisma.measurmentsUnits.findFirst({
          where: { id },
        });
        return measurmentsUnits;
      }

      if (admin.role === 'ADMIN') {
        const restaurant = await this.prisma.restaurant.findFirst({
          where: { id },
        });

        if (restaurant.parentId !== adminId && restaurant.parentId !== null) {
          throw new HttpException(
            `У вас нет прав на просмотр единиц измерения данного ресторана`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const measurmentsUnits = await this.prisma.measurmentsUnits.findFirst({
          where: { id },
        });
        return measurmentsUnits;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateMeasurementUnitById(
    id: string,
    adminId: string,
    createMeasurementUnitsDto: CreateMeasurementUnitsDto,
  ) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const measurmentsUnits = await this.prisma.measurmentsUnits.update({
          where: { id },
          data: {
            ...createMeasurementUnitsDto,
          },
        });
        return measurmentsUnits;
      }

      if (admin.role === 'ADMIN') {
        // const restaurant = await this.prisma.restaurant.findFirst({
        //   where: { id },
        // });

        // if (restaurant.parentId !== adminId) {
        //   throw new HttpException(
        //     `У вас нет прав на редактирование единиц измерения данного ресторана`,
        //     HttpStatus.UNPROCESSABLE_ENTITY,
        //   );
        // }

        const measurmentsUnits = await this.prisma.measurmentsUnits.update({
          where: { id },
          data: {
            ...createMeasurementUnitsDto,
          },
        });
        return measurmentsUnits;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteMeasurementUnitById(adminId: string, id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { id: adminId },
      });

      if (admin.role === 'ROOT') {
        const measurmentsUnits = await this.prisma.measurmentsUnits.delete({
          where: { id },
        });
        return measurmentsUnits;
      }

      if (admin.role === 'ADMIN') {
        // const restaurant = await this.prisma.restaurant.findFirst({
        //   where: { id },
        // });

        // if (restaurant.parentId !== adminId) {
        //   throw new HttpException(
        //     `У вас нет прав на удаление единиц измерения данного ресторана`,
        //     HttpStatus.UNPROCESSABLE_ENTITY,
        //   );
        // }

        const measurmentsUnits = await this.prisma.measurmentsUnits.delete({
          where: { id },
        });
        return measurmentsUnits;
      }
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
