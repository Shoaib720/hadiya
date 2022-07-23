import { createLogger, transports } from 'winston';
import { AppError } from './errors/app.error.js';

const LogError = createLogger({
    transports: [
        new transports.Console()
    ]
})

export class ErrorLogger{
    constructor(){}

    async error(err){
        console.log("=================START ERROR LOGGER=================");
        LogError.log({
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