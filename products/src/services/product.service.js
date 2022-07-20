import { ProductRepository } from '../database/index.js'
import { KafkaService } from './kafka.service.js';
import { KAFKA_PRODUCT_CART_TOPIC_NAME } from '../config/index.js';

export const Events = {
    ADD_TO_CART: 'ADD_PRODUCT_TO_CART'
}

export class ProductService {

    constructor(producer) {
        this.kafkaService = new KafkaService(producer);
        this.repository = new ProductRepository();
    }

    async AddProduct (productData) {
        const { name, price, currency } = productData;
        await this.repository.insertProduct({ name, price, currency });
    }

    async GetProducts () {
        const products = await this.repository.fetchAllProducts();
        return products;
    }

    async AddToCart (data) {
        const payload = {
            event: Events.ADD_TO_CART,
            data: data
        }
        this.kafkaService.SendMessage(KAFKA_PRODUCT_CART_TOPIC_NAME, payload);
    }

}