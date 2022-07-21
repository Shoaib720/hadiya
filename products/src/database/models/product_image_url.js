import { DataTypes } from 'sequelize';
import { sequelize } from '../index.js'

export const ProductImageURL = sequelize.define('ProductImageURL', {
    id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});