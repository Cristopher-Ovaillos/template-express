
# Starter Template Node.js Express + TypeScript

Para este template, se utilizaron como base las siguientes guías y mejores prácticas de arquitectura:
- [Node.js Express Documentation](https://expressjs.com/en/5x/starter/installing/)
- [Creating an Express.js Project Starter Template - Medium](https://medium.com/@roshithprakash7/creating-an-express-js-project-starter-template-62c4fd6f427d)

La documentación y la industria recomiendan utilizar **TypeScript** para garantizar la seguridad de tipos y mejorar la mantenibilidad. Se añadió el archivo `tsconfig.json` optimizado para resolver alias de rutas y trabajar con módulos nativos ECMAScript (ESM) propias de javascript, existe commonjs pero es antiguo.

---

## Características de Express

Express es un framework de Node.js **no prescriptivo**, lo que significa que no impone una forma específica de estructurar la aplicación ni dicta cómo escribir el código. Sabiendo esto, diseñamos este *starter template* con una arquitectura desacoplada, escalable y lista para diversos entornos.

---

## Estructura del Proyecto

Organizamos el código mediante una **arquitectura modular en 3 capas** (Controller, Service, Repository) con la siguiente distribución de archivos:

```text
src/
├── app.ts                  # Instancia e integración de Express
├── routes.ts               # Enrutador central de la API (/api/)
├── server.ts               # Arranque del servidor HTTP y Graceful Shutdown
├── config/
│   └── index.ts            # Variables de entorno tipadas y centralizadas
├── loaders/
│   ├── express.ts          # Middlewares de seguridad (Helmet, CORS, Rate Limit)
│   ├── index.ts            # Orquestador de inicializadores
│   └── logger.ts           # Configuración de Pino Logger
├── core/
│   ├── errors/
│   │   ├── AppError.ts     # Clase de error operacional personalizada
│   │   └── errorHandler.ts # Middleware global de errores (4 parámetros)
│   ├── middlewares/
│   │   └── validateRequest.ts # Validación DTO con Zod
│   └── utils/
│       ├── asyncHandler.ts # Wrapper para controladores asíncronos
│       └── responseHandler.ts # Respuestas de éxito estandarizadas (sendSuccess)
├── modules/
│   └── [recurso]/          # Módulos por dominio de negocio
│       ├── recurso.controller.ts
│       ├── recurso.mapper.ts     # Mapeo de Entidades a DTOs
│       ├── recurso.repository.ts # Consultas SQL / Acceso a datos
│       ├── recurso.routes.ts
│       ├── recurso.schema.ts     # Validaciones y tipos de Zod
│       └── recurso.service.ts
└── types/
    ├── api.ts              # Tipos globales de respuestas (ApiSuccessResponse / ApiErrorResponse)
    └── index.d.ts
```

---

## Componentes Reutilizables del Template

1. **Patrón Loaders (`src/loaders/`)**:
   Desacopla la inicialización de la base de datos, el logger y los middlewares de Express para evitar que `app.ts` se convierta en un archivo monolítico.

2. **Cierre Controlado**:
   El servidor en `server.ts` escucha las señales del sistema (`SIGTERM`, `SIGINT`) para completar las peticiones en curso y cerrar las conexiones a bases de datos de manera limpia antes de apagar el proceso.

3. **Manejo Centralizado de Errores**:
   - `AppError`: Clase personalizada para distinguir errores operacionales (400, 401, 404) de fallos inesperados del sistema (500).
   - `errorHandler`: Middleware global que captura cualquier excepción y responde con un formato JSON unificado sin filtrar *stack traces* en producción.

4. **Validación de Entradas (Zod)**:
   Middleware reutilizable (`validateRequest`) que intercepta `body`, `query` y `params`, valida los datos en tiempo de ejecución y retorna un reporte estructurado de errores en caso de fallo.

5. **Respuestas API Homogéneas**:
   Todas las respuestas de la API siguen la estructura encriptada por el tipo `ApiResponse<T>`, evitando valores nulos innecesarios gracias a uniones discriminadas (`success: true | false`).

6. **Control de Asincronía (`asyncHandler`)**:
   Wrapper para funciones asíncronas en controladores que redirige errores automáticamente al manejador global, evitando bloques `try/catch` repetitivos.

---

## Solución de Errores Comunes y Módulos ESM

Si se sigue la documentación básica de Express al trabajar con sintaxis `import/export`, un error clásico al hacer `node src/app.js` es:

```text
Make sure to set "type": "module" in the nearest package.json file or use the .mjs extension.
```

Para solucionarlo:
- Se añadió `"type": "module"` en el `package.json` para activar **ES Modules (ESM)** de forma nativa en Node.js.
- Para el desarrollo con alias de rutas (`@core/*`, `@modules/*`, etc.), utilizamos **`tsx`**, el ejecutor más rápido para TypeScript con soporte nativo de ESM.
- Para la compilación a producción, usamos **`tsc-alias`**, el cual traduce automáticamente los alias `@` a rutas relativas dentro de la carpeta `dist/`.

---

## Paquetes Principales

- [express](https://www.npmjs.com/package/express): Framework web minimalista.
- [pino](https://www.npmjs.com/package/pino) & [pino-pretty](https://www.npmjs.com/package/pino-pretty): Logging estructurado en JSON de alto rendimiento.
- [dotenv](https://www.npmjs.com/package/dotenv): Carga de variables de entorno.
- [cors](https://www.npmjs.com/package/cors): Habilitación de CORS con políticas de origen.
- [helmet](https://www.npmjs.com/package/helmet): Protección mediante cabeceras HTTP seguras.
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit): Prevención de ataques de fuerza bruta y abuso de la API.
- [zod](https://www.npmjs.com/package/zod): Validación de esquemas e inferencia de tipos estáticos.
- [tsx](https://www.npmjs.com/package/tsx): Ejecución ultrarrápida de TypeScript en modo desarrollo.
- [tsc-alias](https://www.npmjs.com/package/tsc-alias): Resolución de alias de rutas en el proceso de compilación (`build`).

---

## Scripts Disponibles

En la raíz del proyecto puedes ejecutar:

```bash
# Iniciar servidor en modo desarrollo con recarga automática
npm run dev

# Compilar el proyecto TypeScript a JavaScript en /dist
npm run build

# Iniciar la aplicación compilada en entorno de producción
npm start

# Limpiar la carpeta dist
npm run clean
```

---

## Fuentes y Referencias

- [Software on the Road - Una arquitectura a prueba de balas para proyectos Node.js](https://softwareontheroad.com/es/ideal-nodejs-project-structure)
- [DEV Community - Architecting Scalable and Maintainable Node.js Applications](https://dev.to/jefersoneiji/architecting-scalable-and-maintainable-nodejs-applications-best-practices-and-examples-o16)
```