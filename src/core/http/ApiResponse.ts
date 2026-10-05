import type {Response} from 'express';

//ok: Record<string, unknown> es para que se pueda pasar un objeto con datos adicionales
export function ok(res: Response, data: unknown, meta?: Record<string, unknown>) {
    //en vez de hacer return res.status(code).json({objeto}) primero creamos un objeto con la informacion
    //la mejor forma que pueden hacer es no hacer todo en una sola linea, sino crear el objeto y luego retornar
    const response = {
        success: true,
        data, 
        ...(meta && { meta })
    };

    //el  ... se llamas spread operator, pero es basicmaente concatenar los objetos {A} y {B, C} en un solo objeto

    return res.status(200).json(response);
}

export function created(res:Response, data:unknown){

    const response = {
        success: true,
        data
    };

    return res.status(201).json(response);
}