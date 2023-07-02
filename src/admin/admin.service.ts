import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const allAdmins = await this.prisma.admin.findMany();

      const newResponse = allAdmins.map((admin) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...obj } = admin;
        return obj;
      });

      return newResponse;
    } catch (e) {
      throw new HttpException(
        'Администраторы не найдены',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<Admin> {
    const user = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        'Администратор не найден',
        HttpStatus.BAD_REQUEST,
      );
    }

    delete user.password;
    return user;
  }

  async update(id: string, updateAdminDto: CreateAdminDto): Promise<Admin> {
    try {
      const admin = await this.prisma.admin.update({
        where: { id },
        data: { ...updateAdminDto, createdAt: new Date() },
      });

      delete admin.password;
      return admin;
    } catch (e) {
      throw new HttpException(
        `Не удалось обновить данные либо ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string): Promise<Admin> {
    try {
      return await this.prisma.admin.delete({
        where: { id },
      });
    } catch (e) {
      throw new HttpException('Администратор не найден', HttpStatus.NOT_FOUND);
    }
  }
}
