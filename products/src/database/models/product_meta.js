import { DataTypes } from 'sequelize';
import { sequelize } from '../index.js'

export const ProductMeta = sequelize.define('ProductMeta', {
    id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
});