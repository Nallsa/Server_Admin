import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/auth/decorator/user.decorator';
import { AuthUserGuard } from 'src/auth/guards/authUser.guard';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':goodId/add')
  @ApiOperation({ summary: 'Создание акции' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthUserGuard)
  addGoodToCart(
    @Param('goodId') goodId: string,
    @Body() createCartDto: CreateCartDto,
    @User('userId') userId: string,
  ) {
    return this.cartService.addGoodToCart(goodId, createCartDto, userId);
  }

  @Delete(':goodId/remove')
  @ApiOperation({ summary: 'Создание акции' })
  @ApiResponse({
    status: 201,
    description: 'Успешно создан',
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthUserGuard)
  removeGoodFromCart(
    @Param('goodId') goodId: string,
    @User('userId') userId: string,
  ) {
    return this.cartService.removeGoodFromCart(goodId, userId);
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Удаление корзины' })
  @ApiResponse({
    status: 201,
    description: 'Успешно удалена',
  })
  @UseGuards(AuthUserGuard)
  clearCart(@User('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
