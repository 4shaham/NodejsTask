import { IAuthController } from "../../interface/controllers/IAuth.controller.interface"
import IAuthUseCase from "../../interface/usecase/IAuth.usecase.interface"


export default class AuthController implements IAuthController{
 
    private authUseCase:IAuthUseCase
    constructor(authUseCase:IAuthUseCase){
        this.authUseCase=authUseCase
    }

                 



      

    
}