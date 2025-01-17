
export default interface IAuthUseCase{
    verifyLogin(email:string,password:string):Promise<{token:string}|null>
    verifyRegister(name:string,email:string,password:string,confrimPassword:string):Promise<void>
}