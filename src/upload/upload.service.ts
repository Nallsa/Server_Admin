import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
import { Response } from 'express';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async uploadImageFile(file: Express.Multer.File, id: string) {
    // try {
    //   const imageFile = await this.prisma.imagePathTours.create({
    //     data: {
    //       path: file.path,
    //       tourId: id,
    //       imageName: file.filename,
    //     },
    //   });
    //   const response = {
    //     originalname: file.originalname,
    //     filename: file.filename,
    //   };
    //   return {
    //     status: HttpStatus.OK,
    //     message: 'Image uploaded successfully!',
    //     data: response,
    //     imageFile,
    //   };
    // } catch (e) {
    //   throw new HttpException(
    //     `Что-то пошло не так... Ошибка ${e}`,
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
  }

  async uploadMultipleImageFiles(files: Express.Multer.File[], id: string) {
    // try {
    //   const paths = files.map((file) => ({
    //     path: file.path,
    //     tourId: id,
    //     imageName: file.filename,
    //   }));
    //   const count = await this.prisma.imagePathTours.createMany({
    //     data: paths,
    //   });
    //   const response = [];
    //   files.forEach((file) => {
    //     const fileReponse = {
    //       originalname: file.originalname,
    //       filename: file.filename,
    //     };
    //     response.push(fileReponse);
    //   });
    //   return {
    //     status: HttpStatus.OK,
    //     message: 'Images uploaded successfully!',
    //     data: response,
    //     count,
    //   };
    // } catch (e) {
    //   throw new HttpException(
    //     `Что-то пошло не так... Ошибка ${e}`,
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
  }

  async uploadVideoFile(file: Express.Multer.File, id: string) {
    // try {
    //   const videoFile = await this.prisma.videoPathTours.create({
    //     data: {
    //       path: file.path,
    //       tourId: id,
    //       videoName: file.filename,
    //     },
    //   });
    //   const response = {
    //     originalname: file.originalname,
    //     filename: file.filename,
    //   };
    //   return {
    //     status: HttpStatus.OK,
    //     message: 'Image uploaded successfully!',
    //     data: response,
    //     videoFile,
    //   };
    // } catch (e) {
    //   throw new HttpException(
    //     `Что-то пошло не так... Ошибка ${e}`,
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
  }

  async getImageByName(image: string, res: Response) {
    // try {
    //   const path = await this.prisma.imagePathTours.findFirst({
    //     where: {
    //       imageName: {
    //         contains: image,
    //         mode: 'insensitive',
    //       },
    //     },
    //   });
    //   if (path) {
    //     const imageStream = fs.createReadStream(path.path);
    //     res.setHeader('Content-Type', 'image/jpeg');
    //     imageStream.pipe(res);
    //   }
    // } catch (e) {
    //   throw new HttpException(
    //     `Что-то пошло не так... Ошибка ${e}`,
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
  }

  async getImagesByTourId(id: string) {
    // try {
    //   return await this.prisma.imagePathTours.findMany({
    //     where: {
    //       tourId: id,
    //     },
    //   });
    // } catch (e) {
    //   throw new HttpException(
    //     `Что-то пошло не так... Ошибка ${e}`,
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
  }

  async deleteImageByName(image: string) {
    //   try {
    //     const imageForDelete = await this.prisma.imagePathTours.findFirst({
    //       where: {
    //         imageName: {
    //           contains: image,
    //           mode: 'insensitive',
    //         },
    //       },
    //     });
    //     if (imageForDelete) {
    //       try {
    //         fs.unlinkSync(imageForDelete.path);
    //         return await this.prisma.imagePathTours.delete({
    //           where: { id: imageForDelete.id },
    //         });
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     }
    //   } catch (e) {
    //     throw new HttpException(
    //       `Что-то пошло не так... Ошибка ${e}`,
    //       HttpStatus.FORBIDDEN,
    //     );
    //   }
  }
}
