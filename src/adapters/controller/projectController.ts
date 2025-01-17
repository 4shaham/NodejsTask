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
 * /api/project/getAll:
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


        const userId=Number(req.userId) 
        const project=await this.projectUsecase.getAllProjectUsecase(userId)
        res.status(StatusCode.success).json({message:"Projects fetched successfully",projects:project})

        
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
 *         schema:
 *           type: string
 *           example: "abc123"  # Example project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the project
 *                 example: "Updated Project Alpha"
 *               description:
 *                 type: string
 *                 description: The new description of the project
 *                 example: "Updated description of Project Alpha."
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project updated successfully."
 *       400:
 *         description: Invalid input or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Name and description are required."
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


        const projectId=parseInt(req.params.projectId)
        const {name,description}=req.body
        const id=req.userId as number
        console.log(projectId,name,description,id)
        await this.projectUsecase.verifyEditProject(projectId,name,description,id)
        res.status(StatusCode.success).json({message:"Project updated successfully"})
        
    } catch (error) {
        next(error)
    }
}



/**
 * @swagger
 * /api/project/delete/{projectId}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires a JWT token
 *     parameters:
 *       - name: projectId
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
          
        const projectId:number=Number(req.params.projectId)
        const userId:number=Number(req.userId)
        await this.projectUsecase.verifyDeleteProject(projectId,userId)
        res.status(StatusCode.success).json({message:"Project deleted successfully"})
        
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
 *                   type: number  # Assuming userIds are numbers. Change if they're strings.
 *                 example: [123, 456]
 *             required:
 *               - userIds
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
 *                 addedUsers:
 *                   type: array
 *                   items:
 *                     type: number
 *                   example: [123, 456]
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
 *       403:
 *         description: Forbidden. Action not allowed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not authorized to add members to this project."
 *       404:
 *         description: User(s) not found or project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Project not found or some users were not found."
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
        const {userIds}=req.body
        const id=req.userId as number
        await this.projectUsecase.verifyAddMemeber(userIds,projectId,id)
        res.status(StatusCode.success).json({message:" Users added successfully"})

        
    } catch (error) {
         next(error)
    }
}
 
/**
 * @swagger
 * /api/project/removeMember/{projectId}:
 *   delete:
 *     summary: Remove multiple users from a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []  # Requires a JWT token for authentication
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The ID of the project from which users are being removed
 *         schema:
 *           type: string  # Change to "number" if projectId is numeric
 *         example: "sdfd123"
 *     requestBody:
 *       description: An array of user IDs to be removed from the project
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: number  # Change to "string" if userIds are strings
 *                 example: [123, 456]
 *             required:
 *               - userIds
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
 *                     type: number
 *                   example: [123, 456]
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User IDs are required and should be an array of numbers."
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication failed. Token is invalid or missing."
 *       403:
 *         description: Forbidden. Action not allowed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not authorized to remove members from this project."
 *       404:
 *         description: Not Found. Resource(s) not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Project not found or some users were not found."
 *       500:
 *         description: Internal Server Error
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
          
        const projectId=parseInt(req.params.projectId)
        const {userIds}=req.body
        const id=req.userId as number
        await this.projectUsecase.verifyRemoveMember(userIds,projectId,id)
        res.status(StatusCode.success).json({message:"removed successfully"})

    } catch (error) {
        next(error)
    }
}



}