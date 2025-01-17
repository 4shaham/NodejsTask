import { NextFunction, Response } from "express";
import IProjectController from "../../interface/controllers/IProject.controller.interface";
import IRequest from "../../interface/others/IReqeust";
import IProjectUsecase from "../../interface/usecase/IProject.usecase.interface";
import { StatusCode } from "../../enums/statusCode";


export default class ProjectController implements IProjectController{


     private projectUsecase:IProjectUsecase
      constructor(projectUsecase:IProjectUsecase){
        this.projectUsecase=projectUsecase
      }



/**
 * @swagger
 * /api/project/add:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Project Alpha"
 *               description:
 *                 type: string
 *                 example: "Description of Project Alpha."
 *     responses:
 *       202:
 *         description: Project created successfully
 *       400:
 *         description: Invalid userId or bad request,Name and description are required fields,Project name is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Name and description are required fields."
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



async createProject(req: IRequest, res: Response,next:NextFunction): Promise<void> {
    try {
        const {name,description}=req.body
        const ownerId:number=req.userId as number
        await this.projectUsecase.verifyCreateProject(name,description,ownerId)
        res.status(StatusCode.created).json({message:"Project created successfully"})                
    } catch (error) {
         next(error)
    }
}






/**
 * @swagger
 * /api/projects/getAll:
 *   get:
 *     summary: Get all projects for a user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires a JWT token
 *     responses:
 *       200:
 *         description: Successfully fetched all projects for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Projects fetched successfully."
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       projectId:
 *                         type: string
 *                         example: "project123"
 *                       name:
 *                         type: string
 *                         example: "Hospital Management"
 *                       description:
 *                         type: string
 *                         example: "A project for hospital administration."
 *                       status:
 *                         type: string
 *                         example: "active"
 *       400:
 *         description: Bad request or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request or token."
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
 *         description: No projects found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No projects found for this user."
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


async getAllProject(req: IRequest, res: Response, next: NextFunction): Promise<void> {
    try {

        
    } catch (error) {
         next(error)
    }
}


/**
 * @swagger
 * /api/project/edit/{id}:
 *   put:
 *     summary: Edit an existing project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires a JWT token
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the project to be edited
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Project Alpha"
 *               description:
 *                 type: string
 *                 example: "Updated description of Project Alpha."
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid userId or bad request
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
 *       403:
 *         description: Forbidden. Only the project owner can edit the project.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not the owner of this project."
 *       404:
 *         description: Project not found
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


async editProject(req: IRequest, res: Response, next: NextFunction): Promise<void> {
    try {


        
    } catch (error) {
        next(error)
    }
}


/**
 * @swagger
 * /api/project/get/{id}:
 *   get:
 *     summary: Get project details
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires a JWT token
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the project to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Project details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: "Project Alpha"
 *                 description:
 *                   type: string
 *                   example: "Description of Project Alpha."
 *       400:
 *         description: Invalid project ID or bad request
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
 *         description: Project not found
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

  
async getProject(req: IRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        
    } catch (error) {
        next(error)
    }
}


/**
 * @swagger
 * /api/project/delete/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires a JWT token
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the project to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       400:
 *         description: Invalid project ID or bad request
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
 *       403:
 *         description: Forbidden. Only the project owner can delete the project.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not the owner of this project."
 *       404:
 *         description: Project not found
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


async deleteProject(req: IRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        
    } catch (error) {
        next(error)
    }
}
/**
 * @swagger
 * /api/project/addMember/{projectId}:
 *   post:
 *     summary: Add multiple users to a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires a JWT token
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The ID of the project to which users are being added
 *         schema:
 *           type: string  # Assuming projectId is a string. Change if it's a number.
 *         example: "sdfd123"
 *     requestBody:
 *       description: An array of user IDs to be added to the project.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [123, 456]
 *     responses:
 *       200:
 *         description: Users added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Users added successfully."
 *       400:
 *         description: Invalid user ID(s) or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User IDs are required and should be an array of numbers."
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
 *         description: User(s) not found or project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User(s) not found or project not found."
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



async addMember(req: IRequest, res: Response, next: NextFunction): Promise<void> {
    
    try{

        const projectId=parseInt(req.params.projectId)
        const {addedUsers}=req.body
        await this.projectUsecase.verifyAddMemeber(addedUsers,projectId)
        res.status(StatusCode.success).json({message:" Users added successfully"})

        
    } catch (error) {
         next(error)
    }
}
 

/**
 * @swagger
 * /api/project/removeMember:
 *   post:
 *     summary: Remove multiple users
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires a JWT token
 *     requestBody:
 *       description: An array of user IDs to be removed.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["user123", "user456"]
 *     responses:
 *       200:
 *         description: Users removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Users removed successfully."
 *                 removedUsers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["user123", "user456"]
 *       400:
 *         description: Invalid user ID(s) or bad request
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
 *         description: User(s) not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User(s) not found."
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


async removeMember(req: IRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        
    } catch (error) {
        next(error)
    }
}



}