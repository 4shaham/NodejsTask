import { Model } from "sequelize";
import userEntity from "../../entity/userEntity";
import IAuthRepository from "../../interface/repository/IAuth.reposiotry.interface";
import User from "../../framework/model/userModel";

export default class AuthRepository implements IAuthRepository{
    
   private User:Model<userEntity>

   constructor(user:Model<userEntity>){
    this.User=user
   }

 async getUser(email: string): Promise<null | userEntity> {
     try {

        const data = await User.findOne({
            where: { email },
            attributes: ['id', 'password', 'email', 'name'],
          });

        return data?.dataValues?data.dataValues:null
     } catch (error) {
          throw error
     }
 }


async saveUser(name: string, email: string, password: string): Promise<void> {
    try {
        await User.create({name,email,password})
    } catch (error) {
         throw error
    }
}
     

}