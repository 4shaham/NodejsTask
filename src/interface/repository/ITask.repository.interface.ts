import TaskEntity, { TaskStatus } from "../../entity/taskEntity"

export default interface ITaskRepository{
    storeTask(title:string,description:string,projectId:number):Promise<void>
    projectIdIsValid(projectId: number): Promise<Boolean>
    taskIdIsValid(taskId:number):Promise<TaskEntity|null>
    verifyOwnerOfTheProject(userId: number, projectId: number): Promise<Boolean>
    updateStatus(taskId:number,status:TaskStatus.Completed|TaskStatus.InProgress|TaskStatus.Completed):Promise<void>
    deleteTask(taskId:number):Promise<void>
    getTask(projectId:number):Promise<null|TaskEntity[]>
}