import { DataTypes } from 'sequelize';
import { sequelize } from '../index.js';

export const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.UUID,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  customerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  subTotal: {
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