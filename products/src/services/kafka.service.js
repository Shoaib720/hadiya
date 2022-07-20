export class KafkaService {
    constructor(producer){
        this._producer = producer;
    }

    async SendMessage(topic, message){
        await this._producer.connect();
        await this._producer.send({
            topic: topic,
            messages: [
                { value: JSON.stringify(message) }
            ]
        });
        await this._producer.disconnect();
    }

}