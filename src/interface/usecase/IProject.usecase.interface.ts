

export default interface IProjectUsecase{
   verifyCreateProject(name:string,description:string,ownerId:number):Promise<void>   
   verifyAddMemeber(addedUser:number[],projectId:number,id:number):Promise<void>
   verifyRemoveMember(userId:number[],projectId:number,id:number):Promise<void>
   getAllProjectUsecase(userId:number):Promise<any>
   verifyEditProject(projectId:number,name:string,description:string,userId:number):Promise<void>

}
