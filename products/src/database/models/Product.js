import { DataTypes } from 'sequelize';
import { v4, validate } from 'uuid';
import { sequelize } from '../index.js'

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
});

export async function insertProduct (productData) {
  productData.id = v4();
  productData.createdOn = new Date();
  productData.updatedOn = new Date();
  await Product.create(productData);
}

export async function fetchAllProducts () {
  return await Product.findAll();
}