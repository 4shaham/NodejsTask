
export default interface IAuthUseCase{
    verifyLogin(email:string,password:string):Promise<void>
}