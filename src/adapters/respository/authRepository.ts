import userEntity from "../../entity/userEntity";
import IAuthRepository from "../../interface/repository/IAuth.reposiotry.interface";


export default class AuthRepository implements IAuthRepository{

 constructor(){

 }

 async getUser(email: string): Promise<null | userEntity> {
     try {
        return null
     } catch (error) {
          throw error
     }
 }

     

}