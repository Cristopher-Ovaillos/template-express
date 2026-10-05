/**
 * Es la configuracion centralizada. 
 * Centralizamos accesos al env ya sea para buscar el PORT, o DB URI
 * Sirve para no tener dispersos los datos.
 */

import dotenv from 'dotenv';
const envFound = dotenv.config(); // config(), lee el .env y parsea el contenido dentro del obj global de process.env de node

if(envFound.error) {
    console.warn("X no se encontro el archivo .env");
}
//uso: import {config} from './config/index.ts'

export const config = {
    port : parseInt(process.env.PORT || '3000',10),
    nodeEnv : process.env.NODE_ENV || 'development',
    api: {
        prefix: process.env.API_PREFIX || '/api'
    },
    logs:{
        level: process.env.LOG_LEVEL || 'info'
    },
    database:{
        uri: process.env.DATABASE_URI || 'mysql://localhost:3306/db_ejemplo'
    }
};