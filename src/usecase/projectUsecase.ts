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

            let isProject=await this.projectRepository.projectNameIsUsed(name)

            if(isProject){
                 throw new Errors("Project name is Used",StatusCode.badRequest)
            }
        

            await this.projectRepository.saveProject(name,description,ownerId)


            
        } catch (error) {
             throw error
        }
    }


    async verifyAddMemeber(addedUser:number[], projectId: number): Promise<void> {
        try {
            
            if(addedUser.length==0){
                 throw new Errors("addedUser is required",StatusCode.badRequest)
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
                await this.projectRepository.addMembers(id,projectId)   
            }

            
            

        } catch (error) {    
             throw error
        }
    }


}