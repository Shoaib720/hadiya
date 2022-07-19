import { sequelize } from './connection.js'
import { insertProduct, fetchAllProducts } from './models/Product.js'
export {
  sequelize,
  insertProduct,
  fetchAllProducts
}