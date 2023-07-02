import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma.service';
import { compare, hash } from 'bcrypt';
import { Admin, User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from './user.config/user.config';
import { AdminResponseInterface } from './types/AdminbuildResponse.types';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseInterface } from './types/UserbuildResponse.types';
import { TwoFactorDto } from './dto/two-factor.dto';
import axios from 'axios';
import {
  IGreenSMSResponse,
  ITokenGreenSms,
} from 'src/types/greenSmsResponse.interface';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async registerUserOnDB(registerUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.prisma.user.findFirst({
        where: { phone: registerUserDto.phone, email: registerUserDto.email },
      });

      if (newUser) {
        throw new HttpException(
          'Такой пользователь уже существует',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      if (registerUserDto.password) {
        const hashPassword = await hash(registerUserDto.password, 10);
        registerUserDto.password = hashPassword;
      }

      const user = await this.prisma.user.create({ data: registerUserDto });

      if (user) {
        const otp = await this.createCall(user.phone);

        if (otp) {
          const hashOtp = await hash(otp, 10);

          await this.prisma.oneTimePassword.create({
            data: { userId: user.id, otp: hashOtp },
          });
        }
      }

      delete user.password;

      return user;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async resendCall(userId: string) {
    try {
      const otp = await this.prisma.oneTimePassword.findFirst({
        where: { userId },
      });

      const user = await this.prisma.user.findFirst({
        where: { id: userId },
      });

      if (otp) {
        await this.prisma.oneTimePassword.delete({
          where: { id: otp.id },
        });

        const newOtp = await this.createCall(user.phone);
        if (newOtp) {
          const hashOtp = await hash(newOtp, 10);

          await this.prisma.oneTimePassword.create({
            data: { userId: user.id, otp: hashOtp },
          });
        }
        return { Status: 'Сообщение успешно отправлено' };
      }

      const newOtp = await this.createCall(user.phone);
      if (newOtp) {
        const hashOtp = await hash(newOtp, 10);

        await this.prisma.oneTimePassword.create({
          data: { userId: user.id, otp: hashOtp },
        });
      }
      return { Status: 'Сообщение успешно отправлено' };
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  private phoneValidate(phone: string) {
    // Regular expression for a valid Russian phone number
    const regex = /^(\+7)\d{10}$/;
    if (regex.test(phone)) {
      return phone;
    }
  }

  private async getAccessToken(): Promise<string> {
    const adminSettings = await this.prisma.adminSettings.findFirst({
      where: { isActive: true },
    });

    const data = {
      user: adminSettings.nickName,
      pass: adminSettings.password,
    };

    const url = 'https://api3.greensms.ru/account/token';

    try {
      const response = await axios.post<ITokenGreenSms>(url, data);
      return response.data.access_token;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  private async createCall(phone: string): Promise<string> {
    const validPhone = this.phoneValidate(phone);
    const phoneNumber = validPhone.replace('+', '');
    const token: string = await this.getAccessToken();

    const adminSettings = await this.prisma.adminSettings.findFirst({
      where: { isActive: true },
    });

    const data = {
      user: adminSettings.nickName,
      pass: adminSettings.password,
      to: phoneNumber,
    };
    const url = `https://api3.greensms.ru/call/send`;
    try {
      const response = await axios.post<IGreenSMSResponse>(url, data, {
        headers: {
          Authorization: token,
        },
      });

      setTimeout(async () => {
        const user = await this.prisma.user.findFirst({
          where: { phone },
        });

        return await this.prisma.oneTimePassword.deleteMany({
          where: { userId: user.id },
        });
      }, 180000);

      console.log(response.data.code);
      return response.data.code;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async twoFactorAuth(code: TwoFactorDto, userId: string): Promise<User> {
    try {
      const otp = await this.prisma.oneTimePassword.findFirst({
        where: { userId },
      });

      if (!otp) {
        throw new HttpException(
          'Пользователь не найден',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const otpIsCorrect = await compare(code.otp, otp.otp);

      if (!otpIsCorrect) {
        throw new HttpException(
          'Неверный одноразовый пароль',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      await this.prisma.oneTimePassword.delete({
        where: { id: otp.id },
      });

      return await this.prisma.user.update({
        where: { id: userId },
        data: { isActive: true },
      });
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { phone: loginUserDto.phone },
      });

      if (!user) {
        throw new HttpException(
          'Пользователь не найден',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const isPasswordCorrect = await compare(
        loginUserDto.password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new HttpException(
          'Неверный пароль',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      delete user.password;

      const otp = await this.createCall(user.phone);

      if (otp) {
        const hashOtp = await hash(otp, 10);

        await this.prisma.oneTimePassword.create({
          data: { userId: user.id, otp: hashOtp },
        });
      }

      return user;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async loginAdmin(loginAdminDto: LoginUserDto): Promise<Admin> {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { phone: loginAdminDto.phone },
      });

      if (!admin) {
        throw new HttpException(
          'Пользователь не найден',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const isPasswordCorrect = await compare(
        loginAdminDto.password,
        admin.password,
      );

      if (!isPasswordCorrect) {
        throw new HttpException(
          'Неверный пароль',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      if (!admin.isActive) {
        throw new HttpException(
          'Аккаунт не активирован',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      delete admin.password;
      return admin;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async registerAdmin(registerAdminDto: CreateAdminDto) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { phone: registerAdminDto.phone, email: registerAdminDto.email },
      });

      if (admin) {
        throw new HttpException(
          'Такой пользователь уже существует',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      // if (registerAdminDto.role === 'ROOT') {
      //   throw new HttpException(
      //     'Нельзя создать суперпользователя',
      //     HttpStatus.UNPROCESSABLE_ENTITY,
      //   );
      // }

      const hashPassword = await hash(registerAdminDto.password, 10);
      registerAdminDto.password = hashPassword;

      const registerRoot = await this.prisma.admin.create({
        data: registerAdminDto,
      });

      delete registerRoot.password;

      return registerRoot;
    } catch (e) {
      throw new HttpException(
        `Что-то пошло не так... Ошибка ${e}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  buildAdminResponse(admin: Admin): AdminResponseInterface {
    return {
      admin: {
        ...admin,
        token: this.generateJWT(admin),
      },
    };
  }

  buildUserResponse(user: User): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJWT(user),
      },
    };
  }

  private generateJWT(user: User | Admin): string {
    return sign(
      {
        id: user.id,
        username: user.name,
        password: user.password,
      },
      JWT_SECRET,
    );
  }
}
