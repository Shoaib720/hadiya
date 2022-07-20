import { ProductService } from '../services/index.js';

export async function ProductAPI (app, producer) {

    console.log(producer);

    const productService = new ProductService(producer);

    app.post('/products', async (req, res, next) => {
        try{
            const productData = {
                name: req.body.name,
                price: req.body.price,
                currency: req.body.currency
            }
            await productService.AddProduct(productData);
            res.status(201).send({
                message: "Product added successfully"
            })
        }
        catch(err) {
            next(err);
        }
        
    });

    app.get('/products', async (req, res, next) => {
        try{
            const products = await productService.GetProducts();
            res.status(200).json({
                message: "Success",
                data: products
            })
        }
        catch(err){
            console.log(err);
            res.status(500).send("Error")
        }
    })

    app.post('/products/add_to_cart', async (req, res, next) => {
        try{
            const payload = {
                productId: req.body.productId,
                cartId: req.body.cartId,
                quantity: req.body.quantity
            }
            await productService.AddToCart(payload);
            res.status(200).json(payload);
        }
        catch(err) {
            console.log(err);
        }

    })

}