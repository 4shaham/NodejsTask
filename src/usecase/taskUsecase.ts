import ITaskRepository from "../interface/repository/ITask.repository.interface";
import ITaskUsecase from "../interface/usecase/ITask.usecase.interface";


export default class TaskUseCase implements ITaskUsecase{
     
    private taskRepository:ITaskRepository
    constructor(taskRepository:ITaskRepository){
        this.taskRepository=taskRepository
    }
}