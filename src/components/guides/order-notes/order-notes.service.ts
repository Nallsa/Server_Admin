import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderNotesDto } from './dto/order-notes.dto';

@Injectable()
export class OrderNotesService {
  constructor(private prisma: PrismaService) {}

  async createOrderNotes(createOrderNotesDto: CreateOrderNotesDto) {
    try {
      const orderNotes = await this.prisma.orderNotes.create({
        data: {
          ...createOrderNotesDto,
        },
      });
      return orderNotes;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllOrderNotes() {
    try {
      return await this.prisma.orderNotes.findMany();
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getOrderNotesById(id: string) {
    try {
      const orderNotes = await this.prisma.orderNotes.findFirst({
        where: { id },
      });
      return orderNotes;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async updateOrderNotesById(
    id: string,
    createOrderNotesDto: CreateOrderNotesDto,
  ) {
    try {
      const orderNotes = await this.prisma.orderNotes.update({
        where: { id },
        data: {
          ...createOrderNotesDto,
        },
      });
      return orderNotes;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteOrderNotesById(id: string) {
    try {
      const orderNotes = await this.prisma.orderNotes.delete({
        where: { id },
      });
      return orderNotes;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
