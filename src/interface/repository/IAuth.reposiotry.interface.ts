import userEntity from "../../entity/userEntity";

export default interface IAuthRepository{
    getUser(email:string):Promise<null|userEntity>
}