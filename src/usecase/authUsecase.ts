import IAuthRepository from "../interface/repository/IAuth.reposiotry.interface"


export default class AuthUsecase {
    
    private authRepository:IAuthRepository
    constructor(authRepository:IAuthRepository){
        this.authRepository=authRepository
    }



}