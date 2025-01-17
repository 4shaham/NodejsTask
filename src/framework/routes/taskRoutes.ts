import { Router } from "express";
import TaskController from "../../adapters/controller/taskController";
import TaskRepository from "../../adapters/respository/taskRepository";
import TaskUseCase from "../../usecase/taskUsecase";




const taskRepository=new TaskRepository()
const taskUsecase=new TaskUseCase(taskRepository)
const taskController=new TaskController(taskUsecase)



const taskRouter=Router()


taskRouter.post("/add",taskController.addTask.bind(taskController))






export default taskRouter