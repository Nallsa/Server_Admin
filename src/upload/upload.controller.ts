import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { UploadService } from './upload.service';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Загрузка в Тур')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post(':tourId/image')
  @ApiOperation({ summary: 'Загрузка изображения по tourId' })
  @ApiResponse({
    status: 201,
    description: 'Успешно',
  })
  @UseGuards(AuthAdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImageFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('tourId') tourId: string,
  ) {
    return await this.uploadService.uploadImageFile(file, tourId);
  }

  @Post(':tourId/upload-multiply-images')
  @ApiOperation({ summary: 'Загрузка изображений по tourId' })
  @ApiResponse({
    status: 201,
    description: 'Успешно',
  })
  @UseGuards(AuthAdminGuard)
  @UseInterceptors(FilesInterceptor('image', 10))
  async uploadMultipleImageFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('tourId') tourId: string,
  ) {
    return await this.uploadService.uploadMultipleImageFiles(files, tourId);
  }

  @Get(':image')
  @ApiOperation({ summary: 'Поиск изображения по имени' })
  @ApiResponse({
    status: 200,
    description: 'Изображение найдено',
  })
  async getImage(@Param('image') image: string, @Res() res: Response) {
    return await this.uploadService.getImageByName(image, res);
  }

  @Get(':tourId/images')
  @ApiOperation({ summary: 'Поиск изображений по tourId' })
  @ApiResponse({
    status: 200,
    description: 'Изображения найдены',
  })
  async getImagesByTourId(@Param('tourId') tourId: string) {
    return this.uploadService.getImagesByTourId(tourId);
  }

  @Delete(':image/delete_image')
  @ApiOperation({ summary: 'Удаление изображения по названию' })
  @ApiResponse({
    status: 204,
    description: 'Изображение удалено',
  })
  @UseGuards(AuthAdminGuard)
  async deleteImageByName(@Param('image') image: string) {
    return await this.uploadService.deleteImageByName(image);
  }
}
