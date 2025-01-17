import IProjectController from "../../interface/controllers/IProject.controller.interface";
import IProjectUsecase from "../../interface/usecase/IProject.usecase.interface";


export default class ProjectController implements IProjectController{

     private projectUsecase:IProjectUsecase
      constructor(projectUsecase:IProjectUsecase){
        this.projectUsecase=projectUsecase
      }
}