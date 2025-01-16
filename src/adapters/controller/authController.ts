import { NextFunction, Request, Response } from "express"
import { IAuthController } from "../../interface/controllers/IAuth.controller.interface"
import IAuthUseCase from "../../interface/usecase/IAuth.usecase.interface"


export default class AuthController implements IAuthController{
 
    private authUseCase:IAuthUseCase
    constructor(authUseCase:IAuthUseCase){
        this.authUseCase=authUseCase
    }

    async login(req:Request, res: Response,next:NextFunction): Promise<void> {
        try {
            
            res.status(200).json({success:true})
            
        } catch (error) {
            next(error)
        }
    }



      

    
}