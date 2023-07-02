import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthAdminGuard } from 'src/auth/guards/authAdmin.guard';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { getSlug } from 'src/components/utils/get-slug.utils';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const goodId = req.params.goodId;
          const dir = `static/${goodId}/goods/images/`;
          if (!fs.existsSync(dir)) {
            return fs.mkdir(dir, { recursive: true }, (error) =>
              cb(error, dir),
            );
          }
          return cb(null, dir);
        },
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fromEncoding = 'binary';
          const toEncoding = 'utf8';
          const buf = Buffer.from(name, fromEncoding);
          const decoder = new TextDecoder(toEncoding);
          const decodedStr = decoder.decode(buf);
          const finalName = getSlug(decodedStr);
          const randomName = Array(6)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${finalName}-${randomName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (
          !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)
        ) {
          return callback(new Error('Only images are allowed'), false);
        }
        callback(null, true);
      },
    }),
  ],
  controllers: [UploadController],
  providers: [PrismaService, AuthAdminGuard, UploadService],
  exports: [],
})
export class UploadModule {}
