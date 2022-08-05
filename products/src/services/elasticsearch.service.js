import { ESRepository } from '../repositories/index.js';

export class ESService {

    constructor(client) {
        this.repository = new ESRepository(client);
    }

    async AddProduct(product){
        await this.repository.IndexProduct(product);
    }
}