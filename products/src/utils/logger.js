import { createLogger, transports, format } from 'winston';
//import { LogstashTransport } from 'winston-logstash-transport';
import WinstonLogStash from 'winston3-logstash-transport';
import ecsFormat from '@elastic/ecs-winston-format';
import { AppError } from './errors/app.error.js';
import { Formatter } from './formatter.js';

export const Logger = createLogger({
    level: 'info',
    format: ecsFormat(),
    defaultMeta: { service: 'product' },
    transports: [
        new transports.Console(),
        new WinstonLogStash({
  	    mode: 'tcp',
            host: '10.0.62.49',
            port: 8000
        }),
        //new LogstashTransport({
        //    host: '10.0.61.220',
        //    port: 8000
        //})
    ]
})

export class InfoLogger {
    static async log(message) {
        Logger.log({
            level: 'info',
            message: JSON.stringify(message)
        });
    }
}

export class HttpLogger{
    static async log(req) {
        Logger.log({
            level: 'info',
            request: 'asdf'
        })
    }
}

export class ErrorLogger{
    constructor(){}

    async error(err){
        console.log("=================START ERROR LOGGER=================");
        Logger.log({
            level: 'error',
            message: {
                timestamp: new Date(),
                message: JSON.stringify(err),
                trace: JSON.stringify(err.stack)
            },
                
        });
        console.log("=================END ERROR LOGGER=================");
        return false;
    }

    async isOperational(error) {
        if(error instanceof AppError){
            return error.isOperational();
        }
        else{
            return false;
        }
    }
}
