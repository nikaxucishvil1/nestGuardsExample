import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthSub } from './guards/product.sub.guard';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, AuthSub],
  imports: [UsersModule],
})
export class ProductsModule {}
