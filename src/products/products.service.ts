import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  get allProducts() {
    return [...this.products];
  }

  getProduct(prodId: string) {
    const [product] = this.findProduct(prodId);
    return product;
  }

  updateProduct(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, productIndex] = this.findProduct(prodId);
    const updatedProduct = { ...product };
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;
    this.products[productIndex] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    this.products = this.products.filter((el) => el.id !== prodId);
  }

  private findProduct(id: string): [product: Product, productIndex: number] {
    const productIndex = this.products.findIndex((el) => el.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not found product');
    }
    return [product, productIndex];
  }
}
