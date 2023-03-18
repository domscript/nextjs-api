import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
    url: string,
  ) {
    const newProduct = new this.productModel({
      title,
      description,
      price,
      url,
    });
    const result = await newProduct.save();
    console.log(result._id);
    return result._id;
  }

  async getallProducts() {
    const products = await this.productModel.find().exec();
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      url: product.url,
    })) as Product[];
  }

  async getProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      url: product.url,
    } as Product;
  }

  async updateProduct(
    prodId: string,
    title: string,
    description: string,
    price: number,
    url: string,
  ) {
    const updatedProduct = await this.findProduct(prodId);
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;
    if (url) updatedProduct.url = url;
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not found product');
    }
  }

  private async findProduct(id: string) {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not found product');
    }
    if (!product) {
      throw new NotFoundException('Could not found product');
    }
    return product;
  }
}
