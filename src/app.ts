import express, { type Application } from 'express';
import { initLoaders } from './loaders/index.ts';
import { config } from './config/index.ts';
import { errorHandler } from './core/errors/errorHandler.ts';
//descomentar para activar rutas
//import {routes} from './routes/index.ts';

export const createApp = async (): Promise<Application> => {
  const app: Application = express();
  await initLoaders({ expressApp: app });
  //app.use(config.api.prefix, routes);
  app.use(errorHandler);

  return app;
};