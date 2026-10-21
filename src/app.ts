import express, { type Application } from 'express';
import { initLoaders } from './loaders/index.ts';
import { config } from './config/index.ts';
import { errorHandler } from './core/errors/errorHandler.ts';
//descomentar para activar rutas
//import {routes} from './routes/index.ts';
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';
import path from 'node:path';

export const createApp = async (): Promise<Application> => {
  const app: Application = express();
  await initLoaders({ expressApp: app });

  // documentacion OpenAPI generada con `npm run swagger`
  const swaggerFilePath = path.resolve('./swagger-output.json');
  if (fs.existsSync(swaggerFilePath)) {
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  //app.use(config.api.prefix, routes);
  app.use(errorHandler);

  return app;
};