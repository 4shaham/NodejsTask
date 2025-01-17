import { Request, Response, NextFunction } from 'express';

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(err.statusCode || 500).json({message:err.message});
};

export default errorHandlerMiddleware;
