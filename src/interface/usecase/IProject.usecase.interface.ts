

export default interface IProjectUsecase{
   verifyCreateProject(name:string,description:string,ownerId:number):Promise<void>   
   verifyAddMemeber(addedUser:number[],projectId:number):Promise<void>
}
