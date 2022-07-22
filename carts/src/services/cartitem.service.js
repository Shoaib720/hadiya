import { CartItemRepository } from '../database/index.js'

export const Events = {
    ADD_TO_CART: 'ADD_PRODUCT_TO_CART'
}

export class CartItemService {
    constructor() {
        this.repository = new CartItemRepository();
    }

    async GetCartItems () {
        return await this.repository.fetchAllCartItems();
    }

    async AddCartItem (cartItemData) {
        const { cartId, productId, quantity } = cartItemData;
        await this.repository.insertCartItem({ cartId, productId, quantity });
    }

    async SubscribeEvents(payload) {
        const { event, data } = JSON.parse(payload);
        switch(event) {
            case Events.ADD_TO_CART:
                await this.AddCartItem(data);
                break;
            default:
                break;
        }
    }
}