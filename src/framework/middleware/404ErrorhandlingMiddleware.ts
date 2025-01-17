

import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../../enums/statusCode';



const middleware404=(req:Request,res:Response,next:NextFunction):void=>{
    res.status(StatusCode.notFound).json({message:"This router in not foud"})
}

export default middleware404

