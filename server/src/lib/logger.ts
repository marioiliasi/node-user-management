import winston, { Logger } from 'winston';

const loggingLevel = process.env.LOG_LEVEL || 'info';

const LOGGER: Logger = winston.createLogger({
    level: loggingLevel,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
    ],
});

export {
    LOGGER,
};
