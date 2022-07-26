import { Client } from '@elastic/elasticsearch';

const esClient = new Client({
    node: ELASTICSEARCH_URL
});

export const CONNECTION = {
    esClient: esClient
}