import { Request, Response, Router } from "express";
import AuthController from "../../adapters/controller/authController";
import AuthRepository from "../../adapters/respository/authRepository";
import AuthUsecase from "../../usecase/authUsecase";




const authRepository=new AuthRepository()
const authUsecase=new AuthUsecase(authRepository)
const authController=new AuthController(authUsecase)



const authRouter=Router()






export default authRouter