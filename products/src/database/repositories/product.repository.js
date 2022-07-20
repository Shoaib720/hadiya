import { v4, validate } from 'uuid';
import { Product } from '../models/Product.js';

export class ProductRepository {
    async insertProduct (productData) {
        productData.id = v4();
        productData.createdAt = new Date();
        productData.updatedAt = new Date();
        console.log(productData);
        await Product.create(productData);
    }
      
    async fetchAllProducts () {
        return await Product.findAll();
    }
}