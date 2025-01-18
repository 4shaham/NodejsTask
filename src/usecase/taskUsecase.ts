import TaskEntity, { TaskStatus } from "../entity/taskEntity";
import { StatusCode } from "../enums/statusCode";
import Errors from "../errors/errors";
import ITaskRepository from "../interface/repository/ITask.repository.interface";
import ITaskUsecase from "../interface/usecase/ITask.usecase.interface";


export default class TaskUseCase implements ITaskUsecase{
     
    private taskRepository:ITaskRepository
    constructor(taskRepository:ITaskRepository){
        this.taskRepository=taskRepository
    }


    async verifyAddTask(title: string, description:string, projectId: number): Promise<void> {
        try {
            
            if(title.trim()==""||description.trim()==""){
                throw new Errors("title and description field is required",StatusCode.badRequest)
            }
            
            let projectIdIsValid=await this.taskRepository.projectIdIsValid(projectId)
            if(projectIdIsValid==false){
                throw new Errors("Project is not found",StatusCode.notFound)
            }

            await this.taskRepository.storeTask(title,description,projectId)
  
        } catch (error) {
            throw error
        }
    }

   async verifyUpdateTaskStatus(taskId: number, status: TaskStatus.Completed | TaskStatus.Pending | TaskStatus.InProgress, userId: number): Promise<void> {
       try {

        let task=await this.taskRepository.taskIdIsValid(taskId)

        if(!task){
            throw new Errors("task Id is not valid",StatusCode.notFound)
        }


        // it is the projectOwner 
        let isOwner=await this.taskRepository.verifyOwnerOfTheProject(userId,task.projectId)  
       
        if(!isOwner){
              throw new Errors("You are not the owner of this project",StatusCode.conflict)
        }
        //updateStatus 
        await this.taskRepository.updateStatus(taskId,status as any)
       }catch(error) {
         throw error
       }
    }



    async  verifyDeleteTask(taskId: number, userId: number): Promise<void> {
         try {

           let task=await this.taskRepository.taskIdIsValid(taskId)
           if(!task){
            throw new Errors("Task Id is not valid",StatusCode.badRequest)
           }


           let owner=await this.taskRepository.verifyOwnerOfTheProject(userId,task.projectId)
           if(!owner){
            throw new Errors("You do not have permission to delete this task",StatusCode.conflict)
           }


           await this.taskRepository.deleteTask(taskId)

               
            
         } catch (error) {
              throw error
         }
    }




    async verifyGetTask(projectId: number): Promise<null | TaskEntity[]> {
         try {
            
           let isValid=await this.taskRepository.projectIdIsValid(projectId)   
           if(!isValid){
                 throw new Errors("projectId is not valide",StatusCode.notFound)
           } 

           return await this.taskRepository.getTask(projectId)

         } catch (error) {
             throw error
         }
    }


}