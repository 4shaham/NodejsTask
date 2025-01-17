
import { NextFunction, Request, Response } from "express";
import JwtService from "../utils/jwtService";
import { StatusCode } from "../../enums/statusCode";

const jwtService = new JwtService();

const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {  
  try {

    const authHeader = req.headers.authorization; // Access the Authorization header
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return 
    }

    const token = authHeader.split(" ")[1]; 
    let verification = jwtService.verify(token);
    console.log(verification)
    next();
  } catch (error) {
    res.status(401).json({ message:"userTokenExpired"});
  }
};

export default authorizationMiddleware;


