import { Router } from "express";
import ProjectRepository from "../../adapters/respository/projectRepository";
import ProjectUsecase from "../../usecase/projectUsecase";
import ProjectController from "../../adapters/controller/projectController";
import authorizationMiddleware from "../middleware/auth-middleware";



const projectRespository=new ProjectRepository()
const projectUsecase=new ProjectUsecase(projectRespository)
const projectController=new ProjectController(projectUsecase)




const projectRouter=Router()



projectRouter.post("/add",authorizationMiddleware,projectController.createProject.bind(projectController)) // completed
projectRouter.get("/getAll",authorizationMiddleware,projectController.getAllProject.bind(projectController)) // complete
projectRouter.put("/edit/:projectId",authorizationMiddleware,projectController.editProject.bind(projectController))//completed
projectRouter.get("/get/:id",authorizationMiddleware,projectController.getProject.bind(projectController))
projectRouter.delete("/delete/:id",authorizationMiddleware,projectController.deleteProject.bind(projectController)) 
projectRouter.post("/addMember/:projectId",authorizationMiddleware,projectController.addMember.bind(projectController)) // completed
projectRouter.delete("/removeMember/:ProjectId",authorizationMiddleware,projectController.removeMember.bind(projectController)) // completed







export default projectRouter