// genera swagger-output.json a partir de las rutas. uso: npm run swagger
// (este archivo esta fuera de src/, asi que el tsconfig no lo cubre: referenciamos los tipos de node)
/// <reference types="node" />

import 'dotenv/config';
import swaggerAutogen from 'swagger-autogen';

const port = process.env.PORT || '3000';
const prefix = process.env.API_PREFIX || '/api';

const doc = {
  info: {
    title: process.env.SWAGGER_TITLE || 'API Template Express',
    description: process.env.SWAGGER_DESCRIPTION || 'Documentación OpenAPI generada automáticamente',
    version: process.env.SWAGGER_VERSION || '1.0.0',
  },
  // las rutas se montan bajo config.api.prefix
  servers: [{ url: process.env.SWAGGER_SERVER_URL || `http://localhost:${port}${prefix}` }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
