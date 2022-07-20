import { v4, validate } from 'uuid';
import { CartItem } from '../models/index.js';

export class CartItemRepository {
    async insertCartItem (itemData) {
        itemData.id = v4();
        if(!validate(itemData.cartId) || !validate(itemData.productId)){
          throw new Error('Invalid UUID');
        }
        console.log(itemData);
        await CartItem.create(itemData);
      }
      
    async fetchAllCartItems () {
    return await CartItem.findAll();
    }
}