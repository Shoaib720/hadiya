import { AddProduct, GetProducts } from '../services/index.js'

export default async function (app) {

    app.post('/products', async (req, res, next) => {
        try{
            const productData = {
                name: req.body.name,
                price: req.body.price,
                currency: req.body.currency
            }
            await AddProduct(productData);
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
            const products = await GetProducts();
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

}