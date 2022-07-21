import { v4, validate } from 'uuid';
import { Product } from '../models/product.js';

export class ProductRepository {
    async insertProduct (productData) {
        productData.id = v4();
        await Product.create(productData);
    }
      
    async fetchAllProducts () {
        return await Product.findAll();
    }
}