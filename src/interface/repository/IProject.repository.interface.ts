import ProjectEntity from "../../entity/projectEntity";
import userEntity from "../../entity/userEntity";

export default interface IProjectRepository {
  userIsValid(id: number): Promise<null | userEntity>;
  projectNameIsUsed(name:string): Promise<null | ProjectEntity>;
  projectIdIsValid(projectId:number): Promise<null | ProjectEntity>;
  saveProject(name:string,description:string,ownerId:number):Promise<void>
  addMembers(userIds:number,projectId:number):Promise<void>
  removeMembers(userId:number,projectId:number):Promise<void>
  fetchAllProjects(userId:number):Promise<any>
  verifyOwnerOfTheProject(userId:number,projectId:number):Promise<Boolean>
  memberisExcedd(userId:number,projectId:number):Promise<Boolean>
  updateProject(name:string,description:string,projectId:number):Promise<void>
}
