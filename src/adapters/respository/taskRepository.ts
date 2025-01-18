import { title } from "process";
import Task from "../../framework/model/taskModel";
import ITaskRepository from "../../interface/repository/ITask.repository.interface";
import TaskEntity, { TaskStatus } from "../../entity/taskEntity";
import Project from "../../framework/model/projectModel";
import UserProjects from "../../framework/model/userProjectsModel";

export default class TaskRepository implements ITaskRepository{
    constructor(){
        
    }
  

    async storeTask(title: string, description: string, projectId: number): Promise<void> {
      try {
      
        await Task.create({title,description,projectId,status:TaskStatus.Pending});
      
      } catch (error) {
        console.log("erroor",error)
        throw error;
      }
    }

  
    async projectIdIsValid(projectId: number): Promise<Boolean> {
        try {
          const data = await Project.findOne({
            where: { projectId },
            attributes: ["projectId"],
          });
          return data?.dataValues?true:false
        } catch (error) {
          throw error;
        }
    }

    async taskIdIsValid(taskId: number): Promise<TaskEntity | null> {
         try {

            const data=await Task.findOne({
                where:{taskId},
                attributes:["taskId","projectId","title","description","status"],
            })
            return data?.dataValues?data.dataValues:null
            
         } catch (error) {
             throw error
         }
    }


    async verifyOwnerOfTheProject(userId: number, projectId: number): Promise<Boolean> {
        try {
         
         let project=await UserProjects.findOne({
           where:{userId,projectId},
           attributes: ["role"],
         });
         return project?.dataValues.role=="owner"?true:false
        
        }catch (error) {
          throw error
        }
    }
    

     async updateStatus(taskId: number, status: TaskStatus.Completed | TaskStatus.InProgress | TaskStatus.Completed): Promise<void> {
         try {

            await Task.update(
                { 
                  status 
                }, 
                { 
                  where: {taskId}
                }
              );
            
         } catch (error) {
            console.log("error",error)
             throw error
         }
    }


   async deleteTask(taskId: number): Promise<void> {
        try {

            await Task.destroy({
                where: {
                  taskId
            }})
            
        } catch (error) {
             throw error
        }
   }


    async getTask(projectId:number): Promise<null | TaskEntity[]> {
         try {

            let task=await Task.findAll({
                where: {projectId}, 
                attributes:["taskId","title","description","projectId","status"],
            })
            console.log(task)
            return task

         } catch (error) {
             throw error
         }
    }


}