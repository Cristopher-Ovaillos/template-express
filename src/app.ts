import express, { type Application } from 'express';
import { initLoaders } from './loaders/index.ts';
import { config } from './config/index.ts';
import { errorHandler } from './core/errors/errorHandler.ts';
import { swaggerAuth } from './core/middlewares/swaggerAuth.ts';
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
  const swaggerEnabled = Boolean(config.swagger.user && config.swagger.password);
  if (!swaggerEnabled) {
    console.warn('X documentacion deshabilitada: definir SWAGGER_USER y SWAGGER_PASSWORD en el .env');
  } else if (fs.existsSync(swaggerFilePath)) {
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));
    app.use('/api-docs', swaggerAuth, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Swagger UI estatico (carpeta swagger_ui) que consume el mismo JSON
    app.get('/swagger-ui/swagger-output.json', swaggerAuth, (_req, res) => {
      res.json(swaggerDocument);
    });
    app.use('/swagger-ui', swaggerAuth, express.static(path.resolve('./swagger_ui')));
  }

  //app.use(config.api.prefix, routes);
  app.use(errorHandler);

  return app;
};