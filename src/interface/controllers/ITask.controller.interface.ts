import { Response } from "express";
import IRequest from "../others/IReqeust";

export default interface ITaskController{
    addTask(req:IRequest,res:Response):Promise<void>
    updateStatus(req:IRequest,res:Response):Promise<void>
    getTask(req:IRequest,res:Response):Promise<void>
}