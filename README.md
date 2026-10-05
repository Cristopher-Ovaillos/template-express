# Starter Template Node.js Express

Para este template, se utilizaron las siguientes guías:
- [Node.js Express](https://expressjs.com/en/5x/starter/installing/)
- [Medium - template](https://medium.com/@roshithprakash7/creating-an-express-js-project-starter-template-62c4fd6f427d)

La documentacion nos recomienda utilizar typescript. Se añadio 'tsconfig.json' para que se pueda utilizar typescript.
El contenido de la configuración la proporciona la documetnacion de express.

## Caracteristicas de express

Express es un framework de node.js, es no descriptivo, el cual significa que no impone una forma especifica de estructurar la app ni dicta como escribir el codigo. Sabiendo esto, podemos crear nuestro template de manera flexible.
Con express, crearemos un servidor web.

## Componentes reutilizables de este Starter Template



## Errores

Si se sigue la documentacion de express, uno de los errores comunes al hacer 'node src/app.js' es uno llamado.

```
Make sure to set "type": "module" in the nearest package.json file or use the .mjs extension.
```

Para solucionarlo, se añadio 'type': 'module' en el package.json [no lo dice en la doc].
Previamente decia "type": "commonjs".



# Paquetes 
- https://www.npmjs.com/package/pino [y lo de pino-pretty para  formatear y texto con color]
- https://www.npmjs.com/package/dotenv
- https://www.npmjs.com/package/cors

# Fuentes

- https://softwareontheroad.com/es/ideal-nodejs-project-structure
- https://dev.to/jefersoneiji/architecting-scalable-and-maintainable-nodejs-applications-best-practices-and-examples-o16 