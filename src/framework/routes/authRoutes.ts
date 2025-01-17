import { Request, Response, Router } from "express";
import AuthController from "../../adapters/controller/authController";
import AuthRepository from "../../adapters/respository/authRepository";
import AuthUsecase from "../../usecase/authUsecase";
import HashingServices from "../utils/hasingService";
import JwtService from "../utils/jwtService";
import User from "../model/userModel";

import authorizationMiddleware from "../middleware/auth-middleware";
import userEntity from "../../entity/userEntity";


const hashingServices=new HashingServices()
const jwtServices=new JwtService()


const authRepository=new AuthRepository(User as any)
const authUsecase=new AuthUsecase(authRepository,hashingServices,jwtServices)
const authController=new AuthController(authUsecase)






const authRouter=Router()


authRouter.post("/login",authController.login.bind(authController))
authRouter.post("/register",authController.register.bind(authController))
authRouter.post("/logout",authorizationMiddleware,authController.logout.bind(authController))


export default authRouter