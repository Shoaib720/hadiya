import { ProductService } from '../services/index.js';

const SuccessCode = {
    'OK': 200,
    'CREATED': 201
}

export async function ProductAPI (app, producer) {

    const productService = new ProductService(producer);

    app.post('/products', async (req, res, next) => {
        try{
            const productData = {
                name: req.body.name,
                price: req.body.price,
                currency: req.body.currency
            }
            await productService.AddProduct(productData);
            res.status(SuccessCode.CREATED).send({
                message: "Product added successfully"
            })
        }
        catch(err) {
            // handle
            next(err);
        }
        
    });

    app.get('/products', async (req, res, next) => {
        try{

            if(req.query.id){
                const product = await productService.GetProductById(req.query.id);
                res.status(SuccessCode.OK).json({
                    message: "Success",
                    data: product
                });
            }
            else{
                const products = await productService.GetProducts();
                res.status(SuccessCode.OK).json({
                    message: "Success",
                    data: products
                })
            }
        }
        catch(err){
            next(err);
        }
    });

    app.put('/products', async (req, res, next) => {
        try{
            const data = {
                id: req.query.id,
                name: req.body.name,
                price: req.body.price,
                currency: req.body.currency
            }
            await productService.UpdateProduct(data);
            res.status(SuccessCode.OK).json({
                message: "Record updated successfully"
            });
        }
        catch(err){
            next(err);
        }
    })

    app.delete('/products', async (req, res, next) => {
        try{
            await productService.DeleteProduct(req.query.id);
            res.status(SuccessCode.OK).json({
                message: "Record deleted successfully"
            })
        }
        catch(err){
            next(err);
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
            res.status(SuccessCode.OK).json(payload);
        }
        catch(err) {
            // handle
            next(err);
        }

    })

}