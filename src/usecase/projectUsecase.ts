import { StatusCode } from "../enums/statusCode";
import Errors from "../errors/errors";
import IProjectRepository from "../interface/repository/IProject.repository.interface";
import IProjectUsecase from "../interface/usecase/IProject.usecase.interface";


export default class ProjectUsecase implements IProjectUsecase{
    private projectRepository:IProjectRepository
    constructor(projectRepository:IProjectRepository){
        this.projectRepository=projectRepository
    }

    async verifyCreateProject(name: string, description: string, ownerId:number): Promise<void> {
        try {

            if(name.trim()==""||description.trim()==""){
                throw new Errors("Name and description are required fields",StatusCode.badRequest)
            }


            let user=await this.projectRepository.userIsValid(ownerId)

            if(!user){
                throw new Errors("Invalid UserId",StatusCode.badRequest)
            }

            // let isProject=await this.projectRepository.projectNameIsUsed(name)

            // if(isProject){
            //      throw new Errors("Project name is Used",StatusCode.badRequest)
            // }
        

            await this.projectRepository.saveProject(name,description,ownerId)


            
        } catch (error) {
             throw error
        }
    }


    async verifyAddMemeber(addedUser:number[], projectId: number,id:number): Promise<void> {
        try {
            
            if(addedUser.length==0){
                 throw new Errors("addedUser is required",StatusCode.badRequest)
            }

               // the user is owner of project then only it will able
               let status=await this.projectRepository.verifyOwnerOfTheProject(id,projectId)

               if(status==false){
                   throw new Errors("The Owner only able to add member",StatusCode.badRequest)
               }    


               
            const isProject=await this.projectRepository.projectIdIsValid(projectId)

            if(!isProject){
                throw new Errors("projectId is not valid",StatusCode.badRequest)
            }


            for(let id of addedUser){

                let data=await this.projectRepository.userIsValid(id)
                
                if(!data){
                    throw new Errors("UserId is not valid",StatusCode.badRequest)
                }
            }

            for(let id of addedUser){
                let isMemberExeedInthatProject=await this.projectRepository.memberisExcedd(id,projectId)
                if(!isMemberExeedInthatProject){
                    await this.projectRepository.addMembers(id,projectId)   
                } 
            }

        } catch (error) {    
             throw error
        }
    }



    async getAllProjectUsecase(userId: number): Promise<any> {
        try {

          return await this.projectRepository.fetchAllProjects(userId)
            
        } catch (error) {
            throw error
        }
    }


    async verifyRemoveMember(userId: number[], projectId: number,id:number): Promise<void> {
        try {

            if(userId.length==0){
                throw new Errors("addedUser is required",StatusCode.badRequest)
            }

            // the user is owner of project then only it will able
            let status=await this.projectRepository.verifyOwnerOfTheProject(id,projectId)

            if(status==false){
                throw new Errors("You are not the owner of this project",StatusCode.forBidden)
            }

            const isProject=await this.projectRepository.projectIdIsValid(projectId)

           if(!isProject){
               throw new Errors("projectId is not valid",StatusCode.badRequest)
           }
            
           for(let id of userId){
             await this.projectRepository.removeMembers(id,projectId)   
           }

         
        } catch (error) {
             throw error
        }
    }



    async verifyEditProject(projectId: number, name: string, description: string, userId: number): Promise<void> {
        try {
            
           
            if(name.trim()==""||description.trim()==""){
                 throw new Errors("name and description is required field",StatusCode.badRequest)
            }


           let isOwner=await this.projectRepository.verifyOwnerOfTheProject(userId,projectId)

           if(!isOwner){
              throw new Errors("You are not the owner of this project.",StatusCode.forBidden)
           }

           let projectExeed=await this.projectRepository.projectIdIsValid(projectId)
           if(!projectExeed){
             throw new Errors("ProjectId is not valid",StatusCode.badRequest)
           }

           await this.projectRepository.updateProject(name,description,projectId)
    

        } catch (error) {
            throw error
        }
    }


    async verifyDeleteProject(projectId: number, userId: number): Promise<void> {
         try {

            if(!projectId){
                 throw new Errors("projectId is required",StatusCode.badRequest)
            }

            let projectIdisValid=await this.projectRepository.projectIdIsValid(projectId)

            if(!projectIdisValid){
                 throw new Errors("project not found",StatusCode.notFound)
            }


            let isOwner=await this.projectRepository.verifyOwnerOfTheProject(userId,projectId)

            if(!isOwner){
                 throw new Errors("You are not the owner of this project",StatusCode.conflict)
            }

            await this.projectRepository.deleteProject(projectId)
            
         } catch (error) {
              throw error
         }
    }

}