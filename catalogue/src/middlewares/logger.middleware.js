import { LOGGERS } from '../utils/index.js';

export const LogHandler = async (err, _req, _res, next) => {
    const logger = new LOGGERS.ErrorLogger();
    await logger.error(err);
    next(err);
}