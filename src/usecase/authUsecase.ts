import { emit } from "process";
import { StatusCode } from "../enums/statusCode";
import Errors from "../errors/errors";
import IAuthRepository from "../interface/repository/IAuth.reposiotry.interface"
import IAuthUseCase from "../interface/usecase/IAuth.usecase.interface"
import IHashingService from "../interface/utils/IHashingService";
import IJwtService from "../interface/utils/IJWTService";


export default class AuthUsecase implements IAuthUseCase{
    
    private authRepository:IAuthRepository;
    private hashingServices: IHashingService;
    private jwtServices: IJwtService;
    constructor(authRepository:IAuthRepository,hashingServices:IHashingService,jwtServices:IJwtService){
        this.authRepository=authRepository
        this.hashingServices=hashingServices
        this.jwtServices=jwtServices
    }

  async verifyLogin(email: string, password: string): Promise<{token:string}|null> {
      try {
        
       
        if(email.trim()==""||password.trim()==""){
            throw new Errors("filed is required",StatusCode.badRequest)
        }
         
 
       let user=await this.authRepository.getUser(email)

       if(!user){
          throw new Errors("Invalid credentials Email is not match",StatusCode.UnAuthorized)
       }

        const status=await this.hashingServices.compare(password,user.password)

        if(!status){
            throw new Errors("Invalid Credentils Password is not match",StatusCode.UnAuthorized)
        }

        
        let token=await this.jwtServices.createToken({email:user.email,id:user.id})

        return {
            token:token
        }
         
      } catch (error) {
           throw error
      }
  }


  async verifyRegister(name: string, email: string, password: string, confrimPassword: string): Promise<void> {
      try {

        if(name.trim()==""||email.trim()==""||password.trim()=="",confrimPassword.trim()==""){
            throw new Errors("all fields are required",StatusCode.badRequest)
        }

        if(password!=confrimPassword){
            throw new Errors("Password is not match",StatusCode.badRequest)
        }

        let user=await this.authRepository.getUser(email)
        if(user){
            throw new Errors("Email is alreday in use",StatusCode.conflict)
        }

        let bcryptPassword:string=await this.hashingServices.hashing(password)
        await this.authRepository.saveUser(name,email,bcryptPassword)
      } catch (error) {
        throw error
      }
}


}