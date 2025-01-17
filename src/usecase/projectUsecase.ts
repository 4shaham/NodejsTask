import IProjectRepository from "../interface/repository/IProject.repository.interface";
import IProjectUsecase from "../interface/usecase/IProject.usecase.interface";


export default class ProjectUsecase implements IProjectUsecase{
    private projectRepository:IProjectRepository
    constructor(projectRepository:IProjectRepository){
        this.projectRepository=projectRepository
    }
}