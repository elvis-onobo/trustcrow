import { Response } from "express";

export const success = (res:Response, message:string='', code:number, data:any = []) => {
    return res.status(code).json({
        success: true,
        status: code,
        message,
        data,
    });
}

export const error = (res:Response, message:string = '', code:number = 500) => {
  res.status(code).json({
    success: false,
    status: code,
    message,
  });
};