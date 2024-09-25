import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'apple',
      price: 24,
    },
  ];

  create(createProductDto: CreateProductDto) {
    const lastId = this.products[this.products.length - 1]?.id | 0;
    if (!createProductDto.name || !createProductDto.price)
      throw new BadRequestException();
    const newProduct = { id: lastId + 1, ...createProductDto };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(request: any) {
    return request.discount
      ? this.products.map((product) => ({
          ...product,
          price: product.price * 0.9,
        }))
      : this.products;
  }

  findOne(id: number) {
    return this.products.find((el) => el.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException();
    const updatedProduct = {
      ...this.products[index],
      ...updateProductDto,
    };
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  remove(id: number) {
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException();
    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct;
  }
}
