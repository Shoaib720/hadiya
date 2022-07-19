import { insertProduct, fetchAllProducts } from '../database/index.js'

export async function AddProduct (productData) {
    const { name, price, currency } = productData;
    await insertProduct({ name, price, currency });
}

export async function GetProducts () {
    const products = await fetchAllProducts();
    return products;
}