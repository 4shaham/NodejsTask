import { NextFunction, Response } from "express";
import IRequest from "../others/IReqeust";

export default interface ITaskController{
    addTask(req:IRequest,res:Response,next:NextFunction):Promise<void>
    updateStatus(req:IRequest,res:Response,next:NextFunction):Promise<void>
    getTask(req:IRequest,res:Response,next:NextFunction):Promise<void>
    deleteTask(req:IRequest,res:Response,next:NextFunction):Promise<void>
}