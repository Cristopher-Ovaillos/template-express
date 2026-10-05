
// inicio de http server

import { createApp } from './app.ts';
import { config } from './config/index.ts';
import { logger } from './loaders/logger.ts';

const startServer = async () => {
  // Inicializamos la app configurada
  const app = await createApp();

  //arrancamos el servidor HTTP
  const server = app.listen(config.port, () => {
    logger.info(` SERVER: ejecutAndose en http://localhost:${config.port}${config.api.prefix}`);
    logger.info(` ENTORNO: ${config.nodeEnv}`);
  });

  //cierre controlado
  const gracefulShutdown = (signal: string) => {
    logger.info(` SENIAL: ${signal} recibida. Iniciando cierre controlado del servidor...`);

    // Deja de aceptar nuevas peticiones HTTP pero permite terminar las peticiones en curso
    server.close(async () => {
      logger.info('SERVIDOR: HTTP cerrado. Desconectando bases de datos y limpiando recursos...');
      logger.info('OK Proceso finalizado de forma limpia.');
      process.exit(0);
    });

    // Fuerza la salida si las conexiones colgadas no se cierran en 10 segundos
    setTimeout(() => {
      logger.error('X Cierre forzado: Tiempo de espera agotado.');
      process.exit(1);
    }, 10000);
  };

  // Capturamos las señales del sistema para apagar el servidor sin cortar peticiones activas
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

startServer().catch((err) => {
  logger.error(err, 'X Error fatal durante el arranque de la aplicación');
  process.exit(1);
});