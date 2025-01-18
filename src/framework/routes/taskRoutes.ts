import { Router } from "express";
import TaskController from "../../adapters/controller/taskController";
import TaskRepository from "../../adapters/respository/taskRepository";
import TaskUseCase from "../../usecase/taskUsecase";




const taskRepository=new TaskRepository()
const taskUsecase=new TaskUseCase(taskRepository)
const taskController=new TaskController(taskUsecase)


import authorizationMiddleware from "../middleware/auth-middleware";

const taskRouter=Router()


taskRouter.post("/add",authorizationMiddleware,taskController.addTask.bind(taskController)) //
taskRouter.patch("/edit/:taskId",authorizationMiddleware,taskController.updateStatus.bind(taskController))//
taskRouter.get("/get/:projectId",authorizationMiddleware,taskController.getTask.bind(taskController))
taskRouter.delete("/delete/:taskId",authorizationMiddleware,taskController.deleteTask.bind(taskController)) //







export default taskRouter