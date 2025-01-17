import ProjectEntity from "../../entity/projectEntity";
import userEntity from "../../entity/userEntity";

export default interface IProjectRepository {
  userIsValid(id: number): Promise<null | userEntity>;
  projectNameIsUsed(name:string): Promise<null | ProjectEntity>;
  projectIdIsValid(projectId:number): Promise<null | ProjectEntity>;
  saveProject(name:string,description:string,ownerId:number):Promise<void>
  addMembers(userIds:number,projectId:number):Promise<void>
}
