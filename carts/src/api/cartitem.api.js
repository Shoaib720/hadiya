import { CartItemService } from '../services/index.js';

export default async function (app) {

    const cartItemService = new CartItemService();

    app.get('/carts/cart_items', async (req, res, next) => {
        try{
            const cartItems = await cartItemService.GetCartItems();
            res.status(200).json({
                message: "Success",
                data: cartItems
            })
        }
        catch(err){
            console.log(err);
            res.status(500).send("Error")
        }
    })

}