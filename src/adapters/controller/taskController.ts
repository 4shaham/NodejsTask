import ITaskController from "../../interface/controllers/ITask.controller.interface";
import ITaskUsecase from "../../interface/usecase/ITask.usecase.interface";


export default class TaskController implements ITaskController{
   
    private taskUsecase:ITaskUsecase
    constructor(taskUseCase:ITaskUsecase){
        this.taskUsecase=taskUseCase
    }

}