import { CartItemService } from '../services/index.js';

export default async function (app) {

    const cartItemService = new CartItemService();

    app.post('/cart_items', async (req, res, next) => {
        try{
            const cartData = {
                cartId: req.body.cartId,
                productId: req.body.productId,
                quantity: req.body.quantity
            }
            // await AddCartItem(cartData);
            res.status(201).send({
                message: "Product added successfully"
            })
        }
        catch(err) {
            next(err);
        }
        
    });

    app.get('/cart_items', async (req, res, next) => {
        try{
            const cartItems = await GetCartItems();
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