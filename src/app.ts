import express, { type Express, type Request, type Response } from 'express';

//inicializamos el servidor web
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

//iniciamos el servidor web en el puerto 3000
//con listen nos aseguramos que el servidor se ejecuta en el puerto 3000
//todas las peticiones las debemos recibir en el puerto 3000
app.listen(3000, ()=>{
    console.log('consola de express');
});

