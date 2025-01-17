

export default interface IProjectUsecase{
   verifyCreateProject(name:string,description:string,ownerId:number):Promise<void>   
}
