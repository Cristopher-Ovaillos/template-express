/**
 * Es la configuracion centralizada. 
 * Centralizamos accesos al env ya sea para buscar el PORT, o DB URI
 * Sirve para no tener dispersos los datos.
 */

import dotenv from 'dotenv';
const envFound = dotenv.config(); // config(), lee el .env y parsea el contenido dentro del obj global de process.env de node

if (envFound.error) {
    console.warn("X no se encontro el archivo .env");
}
//uso: import {config} from './config/index.ts'

export const config = {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    api: {
        prefix: process.env.API_PREFIX || '/api'
    },
    logs: {
        level: process.env.LOG_LEVEL || 'info'
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        name: process.env.DB_NAME || 'inelco_tickets_db',
        // si es true y la BD no responde al arrancar, el servidor no inicia.
        // por defecto solo es obligatoria en produccion (DB_REQUIRED=true/false para forzar)
        required: process.env.DB_REQUIRED
            ? process.env.DB_REQUIRED === 'true'
            : (process.env.NODE_ENV || 'development') === 'production'
    },
    // credenciales de la documentacion (/api-docs y /swagger-ui). sin ambas, las rutas no se montan
    swagger: {
        user: process.env.SWAGGER_USER || '',
        password: process.env.SWAGGER_PASSWORD || ''
    },
    ai: {
        url: process.env.AI_SERVICE_URL || '',
        apiKey: process.env.AI_SERVICE_API_KEY || ''
    }
};