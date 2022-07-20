import { DataTypes } from 'sequelize';
import { sequelize } from '../index.js';

export const CartItem = sequelize.define('CartItem', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
      // references: {
      //   model: 'carts',
      //   key: 'id'
      // }
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });