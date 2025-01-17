import { Request, Response, Router } from "express";
import AuthController from "../../adapters/controller/authController";
import AuthRepository from "../../adapters/respository/authRepository";
import AuthUsecase from "../../usecase/authUsecase";
import HashingServices from "../utils/hasingService";
import JwtService from "../utils/jwtService";
import User from "../model/userModel";


const hashingServices=new HashingServices()
const jwtServices=new JwtService()


const authRepository=new AuthRepository()
const authUsecase=new AuthUsecase(authRepository,hashingServices,jwtServices)
const authController=new AuthController(authUsecase)






const authRouter=Router()


authRouter.post("/login",authController.login.bind(authController))
authRouter.post("/register",authController.register.bind(authController))
authRouter.post("/logout",authController.logout.bind(authController))


export default authRouter