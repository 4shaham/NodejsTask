import { Response } from "express";
import ITaskController from "../../interface/controllers/ITask.controller.interface";
import IRequest from "../../interface/others/IReqeust";
import ITaskUsecase from "../../interface/usecase/ITask.usecase.interface";


export default class TaskController implements ITaskController{
   
    private taskUsecase:ITaskUsecase
    constructor(taskUseCase:ITaskUsecase){
        this.taskUsecase=taskUseCase
    }


    async addTask(req: IRequest, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            throw error
        }
    }

    async updateStatus(req: IRequest, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            throw error
        }
    }


    async getTask(req: IRequest, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            throw error
        }
    }

    




}