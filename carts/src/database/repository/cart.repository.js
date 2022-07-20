import { Cart } from '../models/Cart.js';
import { v4, validate } from 'uuid';

export class CartRepository{

    async insertCart (cartData) {
        cartData.id = v4();
        await Cart.create(cartData);
    }
}