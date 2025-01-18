import { NextFunction, Response } from "express";
import ITaskController from "../../interface/controllers/ITask.controller.interface";
import IRequest from "../../interface/others/IReqeust";
import ITaskUsecase from "../../interface/usecase/ITask.usecase.interface";
import { StatusCode } from "../../enums/statusCode";
import { TaskStatus } from "../../entity/taskEntity";
import { error } from "console";
import Errors from "../../errors/errors";


export default class TaskController implements ITaskController{
   
    private taskUsecase:ITaskUsecase
    constructor(taskUseCase:ITaskUsecase){
        this.taskUsecase=taskUseCase
    }


    /**
 * @swagger
 * /api/task/add:
 *   post:
 *     summary: Add a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: The description of the task (optional)
 *               projectId:
 *                 type: integer
 *                 description: The ID of the project that this task belongs to
 *             required:
 *               - description
 *               - status
 *               - projectId
 *     responses:
 *       202:
 *         description: Task successfully created
 *       400:
 *         description: Validation error (e.g., missing fields, invalid status, etc.)
 *       401:
 *         description: Unauthorized. Token is required or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token is required or invalid."
 *       404:
 *         description: Project not found (if the provided projectId is invalid)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Project not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong. Please try again later."
 */

    


    async addTask(req: IRequest, res: Response,next:NextFunction): Promise<void> {
        try {
           
            const {projectId,title,description}=req.body
            await this.taskUsecase.verifyAddTask(title,description,projectId as number)
            res.status(StatusCode.created).json({message:"Task successfully created"})           
 
        } catch (error) {
             next(error)
        }
        
    }

/**
 * @swagger
 * /api/task/edit/{taskId}:
 *   patch:
 *     summary: Update Task Status
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []  # Requires a JWT token
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to edit
 *         example: 123
 *     requestBody:
 *       description: The updated status of the task
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, In Progress, Completed]
 *                 description: The new status of the task
 *             required:
 *               - status
 *             example:
 *               status: "In Progress"
 *     responses:
 *       200:
 *         description: Task status successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task successfully updated."
 *       400:
 *         description: Validation error (e.g., invalid status)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Status must be 'Pending', 'In Progress', or 'Completed'."]
 *       403:
 *         description: Forbidden. User is not authorized to edit the task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not the owner of this project."
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Task not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong. Please try again later."
 */



    async updateStatus(req: IRequest,res:Response,next:NextFunction): Promise<void> {
        try {

            const  taskId:number=Number(req.params.taskId) 
            const {status}=req.body
            const userId:number=Number(req.userId)

            if(status!=TaskStatus.Pending&&status!=TaskStatus.Completed&&status!=TaskStatus.InProgress){
                 throw new Errors("staus field is required",StatusCode.badRequest)
            }

            await this.taskUsecase.verifyUpdateTaskStatus(taskId,status,userId)
            res.status(StatusCode.success).json({message:"Task status successfully updated"})
                        
        } catch (error) {
            next(error)
        }
    }


/**
 * @swagger
 * /api/task/get/{projectId}:
 *   get:
 *     summary: Fetch Tasks for a Project
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []  # Requires a JWT token
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project whose tasks are to be fetched
 *         example: 123
 *     responses:
 *       200:
 *         description: Tasks successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task successfully fetch"
 *                 tasks:
 *                   type: array
 *                   description: List of tasks associated with the project
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Task ID
 *                         example: 3
 *                       name:
 *                         type: string
 *                         description: Task name
 *                         example: "meeting 10pm"
 *                       description:
 *                         type: string
 *                         description: Description of the task
 *                         example: "every day come to 10 pm"
 *                       projectId:
 *                         type: integer
 *                         description: Associated project ID
 *                         example: 2
 *                       status:
 *                         type: string
 *                         description: Task status
 *                         example: "Pending"
 *       400:
 *         description: Validation error (e.g., invalid or missing project ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Project ID is a required field."
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Project ID is not valid."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong. Please try again later."
 */






    async getTask(req: IRequest,res: Response,next:NextFunction): Promise<void> {
        try {
         const projectId=Number(req.params.projectId)
         let tasks=await this.taskUsecase.verifyGetTask(projectId)
         res.status(StatusCode.success).json({message:"Task successfully fetch",tasks})
            
        } catch (error) {
            next(error)
        }
    }




/**
 * @swagger
 * /api/task/delete/{taskId}:
 *   delete:
 *     summary: Delete a Task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []  # Requires a JWT token
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to delete
 *         example: 123
 *     responses:
 *       200:
 *         description: Task successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully."
 *       400:
 *         description: Validation error (e.g., invalid or missing task ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Task ID is required and must be a valid number."
 *       403:
 *         description: Unauthorized deletion attempt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to delete this task."
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Task not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong. Please try again later."
 */

    


    async deleteTask(req: IRequest, res: Response,next:NextFunction): Promise<void> {
        try {
            const userId:number=Number(req.userId)
            const taskId:number=Number(req.params.taskId)
            await this.taskUsecase.verifyDeleteTask(taskId,userId)
            res.status(StatusCode.success).json({message:"deleted succesffully"})
        } catch (error) {
             next(error)
        }
    }
    




}