import IAuthRepository from "../interface/repository/IAuth.reposiotry.interface"
import IAuthUseCase from "../interface/usecase/IAuth.usecase.interface"


export default class AuthUsecase implements IAuthUseCase{
    
    private authRepository:IAuthRepository
    constructor(authRepository:IAuthRepository){
        this.authRepository=authRepository
    }

  async verifyLogin(email: string, password: string): Promise<void> {
      try {
        
  

      } catch (error) {
        
      }
  }



}