import { createLogger, transports } from 'winston';

const LogError = createLogger({
    transports: [
        new transports.Console()
    ]
})

