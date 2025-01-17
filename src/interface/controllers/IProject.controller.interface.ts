import { NextFunction, Response } from "express";
import IRequest from "../others/IReqeust";



export default interface IProjectController{
    createProject(req:IRequest,res:Response,next:NextFunction):Promise<void>
    getProject(req:IRequest,res:Response,next:NextFunction):Promise<void>
    getAllProject(req:IRequest,res:Response,next:NextFunction):Promise<void>
    editProject(req:IRequest,res:Response,next:NextFunction):Promise<void>
    deleteProject(req:IRequest,res:Response,next:NextFunction):Promise<void>
    addMember(req:IRequest,res:Response,next:NextFunction):Promise<void>
    removeMember(req:IRequest,res:Response,next:NextFunction):Promise<void>
}