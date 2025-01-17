import { Router } from "express";
import ProjectRepository from "../../adapters/respository/projectRepository";
import ProjectUsecase from "../../usecase/projectUsecase";
import ProjectController from "../../adapters/controller/projectController";


const projectRespository=new ProjectRepository()
const projectUsecase=new ProjectUsecase(projectRespository)
const projectController=new ProjectController(projectUsecase)


const projectRouter=Router()









export default projectRouter