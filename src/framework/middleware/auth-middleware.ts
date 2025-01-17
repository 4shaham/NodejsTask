
import { NextFunction,Response} from "express";
import JwtService from "../utils/jwtService";
import { StatusCode } from "../../enums/statusCode";
import IRequest from "../../interface/others/IReqeust";

const jwtService = new JwtService();

const authorizationMiddleware = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {  
  try {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
       return
    }
    const token = authHeader.split(" ")[1]; 
    let verification = jwtService.verify(token);
    req.userId=verification?.id 
    req.email=verification?.email
    next();

  } catch (error) {
    res.status(401).json({ message:"userTokenExpired"});
  }
};

export default authorizationMiddleware;


