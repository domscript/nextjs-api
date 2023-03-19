import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async addProduct(
    // @Body() completeBody: { title: string; description: string; price: number },
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('url') prodUrl: string,
    @Body('mass') prodMass: number,
    @Body('date') prodDate: Date,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
      prodUrl,
      prodMass,
      prodDate,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getallProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    return await this.productsService.getProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('url') prodUrl: string,
    @Body('mass') prodMass: number,
    @Body('date') prodDate: Date,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
      prodUrl,
      prodMass,
      prodDate,
    );
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
