#runtime de nodejs
FROM node:20-alpine
#dentro del contenedor, en la carpeta app
WORKDIR /app
#dentro de nuestro entorno local(nuestro template), debemos subir las dependencias dentro del contenedor interno
#debido a la instruccion anterior, las dependencias se instalar dentro de /app
COPY package*.json ./
# instalacion de dependencias
RUN npm install
# ahora de mi entorno local, post enviar el package*.json e instarlo, mando mis carpetas al directorio /app
COPY . .
#puerto expuesto para el servidor express
EXPOSE 3000

# init modo desarrollo con recarga automatica
CMD ["npm","run","dev"]
