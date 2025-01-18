import TaskEntity, { TaskStatus } from "../../entity/taskEntity"

export default interface ITaskUsecase{
    verifyAddTask(title:string,description:string,projectId:number):Promise<void>
    verifyUpdateTaskStatus(taskId:number,status:TaskStatus.Completed|TaskStatus.Pending|TaskStatus.InProgress,userId:number):Promise<void>
    verifyDeleteTask(taskId:number,userId:number):Promise<void>
    verifyGetTask(projectId:number):Promise<null|TaskEntity[]>
}