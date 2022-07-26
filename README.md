docker run -dit --name zookeeper -p 2181:2181 -v hadiya_zookeeper_data:/bitnami/zookeeper --network hadiya_net -e ALLOW_ANONYMOUS_LOGIN=yes bitnami/zookeeper:latest

docker run -dit --name kafka -p 9092:9092 -v hadiya_kafka_data:/bitnami/kafka --network hadiya_net -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181 -e ALLOW_PLAINTEXT_LISTENER=yes bitnami/kafka:latest

docker run -dit --name hadiya_elasticsearch -p 9200:9200 -p 9300:9300 --network hadiya_net --network-alias elasticsearch -v hadiya_elasticsearch_data:/bitnami/elasticsearch/data bitnami/elasticsearch:8

docker run -dit --name hadiya_kibana -p 5601:5601 --network hadiya_net --network-alias kibana -v hadiya_kibana_data:/bitnami/kibana bitnami/kibana:8

az servicebus namespace create --resource-group rg-hadiya-service-bus --name hadiya --location centralindia

az servicebus queue create --resource-group rg-hadiya-service-bus --namespace-name ContosoSBusNS --name product_cart