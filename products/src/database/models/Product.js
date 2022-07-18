import { DataTypes } from 'sequelize';
import { sequelize } from '../index.js'

export const Procuct = sequelize.define('Product', {
  id: {
    type: DataTypes.UUIDV4,
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
  createdOn: DataTypes.DATE,
  updatedOn: DataTypes.DATE
});