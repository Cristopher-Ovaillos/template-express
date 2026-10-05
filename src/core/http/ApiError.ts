export class ApiError extends Error{
    constructor(
        public statusCode:number,
        public code:string,
        messaje:string,
        public details?:unknown
    )
    {
        super(messaje);
    }
}