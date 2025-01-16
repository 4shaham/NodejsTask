import IAuthRepository from "../interface/repository/IAuth.reposiotry.interface"


export default class AuthUsecase implements IAuthRepository{
    
    private authRepository:IAuthRepository
    constructor(authRepository:IAuthRepository){
        this.authRepository=authRepository
    }



}