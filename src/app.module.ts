import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthAdminMiddleware } from './auth/middleware/authAdmin.middleware';
import { AuthUserMiddleware } from './auth/middleware/authUser.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';
import { RestourantsModule } from './components/restaurants/restaurants.module';
import { MeasureUnitsModule } from './components/guides/measure-units/measure-units.module';
import { StatusesModule } from './components/guides/statuses/statuses.module';
import { PaymentModule } from './components/guides/payment/payment.module';
import { DeliveryTypeModule } from './components/guides/delivery-type/delivery-type.module';
import { FollowingGoodsModule } from './components/guides/following-goods/following-goods.module';
import { GoodsModule } from './components/guides/goods/goods.module';
import { GoodsCategoryModule } from './components/guides/goods-category/goods-category.module';
import { MaterialsCategoryModule } from './components/guides/materials-category/materials-category.module';
import { MaterialsModule } from './components/guides/materials/materials.module';
import { StaffModule } from './components/guides/staff/staff.module';
import { SalesModule } from './components/guides/sales/sales.module';
import { PositionModule } from './components/guides/position/position.module';
import { PaymentStatusesModule } from './components/guides/payment-statuses/payment-statuses.module';
import { OrderNotesModule } from './components/guides/order-notes/order-notes.module';
import { ModificatorsModule } from './components/guides/modificators/modificators.module';
import { DeliveryZoneModule } from './components/guides/delivery-zone/delivery-zone.module';
import { AdminSettingsModule } from './integrations/settings/admin-settings/admin-settings.module';
import { IntegrateSettingsModule } from './integrations/settings/integrate-settings/integrate-settings.module';
import { DeliveryAdressModule } from './components/delivery-adress/delivery-adress.module';
import { CartModule } from './cart/cart.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..'),
    }),
    UsersModule,
    AdminModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
    }),
    RestourantsModule,
    MeasureUnitsModule,
    StatusesModule,
    PaymentModule,
    DeliveryTypeModule,
    FollowingGoodsModule,
    GoodsModule,
    GoodsCategoryModule,
    MaterialsCategoryModule,
    MaterialsModule,
    StaffModule,
    SalesModule,
    PositionModule,
    PaymentStatusesModule,
    OrderNotesModule,
    ModificatorsModule,
    DeliveryZoneModule,
    AdminSettingsModule,
    IntegrateSettingsModule,
    DeliveryAdressModule,
    CartModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthAdminMiddleware, AuthUserMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
