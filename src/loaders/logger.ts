//utilizaremos pino, tiene salida estructurada json

import pino from 'pino';
import {config} from '../config/index.ts';

export const logger = pino(
    {
        level: config.logs.level,
        transport: config.nodeEnv === 'development' ? {
                target: 'pino-pretty',
                options: {colorize: true},
            }:undefined,
        
    }
);

