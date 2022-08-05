import { Sequelize } from 'sequelize';
import { Client } from '@elastic/elasticsearch';
import { EnvConfig } from './env.config.js';
const sequelize = new Sequelize(EnvConfig.DB_CONNECTION_STRING, {
    dialect: 'mysql'
});

const esClient = new Client({
    node: EnvConfig.ELASTICSEARCH_URL
})

export const Connection = {
    sequelize,
    esClient
}