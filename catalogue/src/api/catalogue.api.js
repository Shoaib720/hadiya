import { CatalogueService } from '../services/index.js';
import { LOGGERS } from '../utils/index.js';

const SuccessCode = {
    'OK': 200,
    'CREATED': 201
}

export async function CatalogueAPI (app, producer, esClient) {

    const catalogueService = new new CatalogueService(esClient);


    app.post('/catalogue', async (req, res, next) => {
        try{
            const productData = {
                name: req.body.name,
                price: req.body.price,
                currency: req.body.currency
            }
            // await productService.AddProduct(productData);
            await esService.AddProduct(productData);
            const info = `${new Date()} Request id: ${req.id}. POST /products ${SuccessCode.CREATED} Product added successfully`;
            await LOGGERS.InfoLogger.log(info);
            res.status(SuccessCode.CREATED).send({
                message: "Product added successfully"
            })
        }
        catch(err) {
            // handle
            next(err);
        }
        
    });

    app.get('/catalogue', async (req, res, next) => {
        try{

            if(req.query.id){
                const product = await productService.GetProductById(req.query.id);
                const info = `${new Date()} Request id: ${req.id}. GET /products ${SuccessCode.OK} Product with id ${req.query.id} fetched successfully`;
                await LOGGERS.InfoLogger.log(info);
                res.status(SuccessCode.OK).json({
                    message: "Success",
                    data: product
                });
            }
            else{
                let pagination = {};
                if(req.query.limit && req.query.offset){
                    pagination.limit = +req.query.limit;
                    pagination.offset = +req.query.offset
                }
                const products = await productService.GetProducts(pagination);
                const info = `${new Date()} Request id: ${req.id}. GET /products ${SuccessCode.OK} Products fetched successfully`;
                LOGGERS.InfoLogger.log(info);
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

    app.put('/catalogue', async (req, res, next) => {
        try{
            const data = {
                id: req.query.id,
                name: req.body.name,
                price: req.body.price,
                currency: req.body.currency
            }
            await productService.UpdateProduct(data);
            const info = `${new Date()} Request id: ${req.id}. PUT /products ${SuccessCode.OK} Product with id ${req.query.id} updated successfully`;
            await LOGGERS.InfoLogger.log(info);
            res.status(SuccessCode.OK).json({
                message: "Record updated successfully"
            });
        }
        catch(err){
            next(err);
        }
    })

    app.delete('/catalogue', async (req, res, next) => {
        try{
            await productService.DeleteProduct(req.query.id);
            const info = `${new Date()} Request id: ${req.id}. DEL /products ${SuccessCode.OK} Product with id ${req.query.id} deleted successfully`;
            await LOGGERS.InfoLogger.log(info);
            res.status(SuccessCode.OK).json({
                message: "Record deleted successfully"
            })
        }
        catch(err){
            next(err);
        }
    });

}