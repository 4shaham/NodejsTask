import { Response } from "express";
import ITaskController from "../../interface/controllers/ITask.controller.interface";
import IRequest from "../../interface/others/IReqeust";
import ITaskUsecase from "../../interface/usecase/ITask.usecase.interface";


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
 *               status:
 *                 type: string
 *                 enum: ["To Do", "In Progress", "Done"]
 *                 description: The current status of the task
 *               projectId:
 *                 type: integer
 *                 description: The ID of the project that this task belongs to
 *             required:
 *               - title
 *               - status
 *               - projectId
 *     responses:
 *       202:
 *         description: Task successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task successfully created."
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Complete the project documentation"
 *                     description:
 *                       type: string
 *                       example: "Write the documentation for the project."
 *                     status:
 *                       type: string
 *                       enum: ["To Do", "In Progress", "Done"]
 *                       example: "To Do"
 *                     projectId:
 *                       type: integer
 *                       example: 101
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