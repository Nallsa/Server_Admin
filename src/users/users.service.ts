import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';
import { PaginationAndSearchQueryDto } from 'src/common/pagination-query.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashPassword = await hash(createUserDto.password, 10);
      createUserDto.password = hashPassword;

      return await this.prisma.user.create({ data: createUserDto });
    } catch (e) {
      throw new HttpException(`Что-то пошло не так ${e}`, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(paginationAndSearchQuery: PaginationAndSearchQueryDto) {
    try {
      const { limit, offset, search } = paginationAndSearchQuery;
      const allUsers = await this.prisma.user.findMany({
        orderBy: { lastName: 'asc' },
        take: limit,
        skip: offset >= 0 ? offset : 0,
        where: search
          ? {
              OR: [
                {
                  phone: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  lastName: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  middleName: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  email: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {},
      });

      const users = allUsers.map((admin) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...obj } = admin;
        return obj;
      });

      const count = await this.prisma.user.count();

      return { users, count };
    } catch (e) {
      throw new HttpException('Что-то пошло не так', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    delete user.password;
    return user;
  }

  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    try {
      return this.prisma.user.update({
        where: { id },
        data: { ...updateUserDto, updatedAt: new Date() },
      });
    } catch (e) {
      throw new HttpException('Что-то пошло не так', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (e) {
      throw new HttpException(
        `User not found ${console.log(e)}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
