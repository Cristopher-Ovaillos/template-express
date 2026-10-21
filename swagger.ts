// genera swagger-output.json a partir de las rutas. uso: npm run swagger

import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Microservicio de Consultas Técnicas - Inelco Ingeniería',
    description: 'Documentación OpenAPI generada para el MVP',
    version: '1.0.0',
  },
  // las rutas se montan bajo config.api.prefix
  servers: [{ url: 'http://localhost:3002/api' }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
