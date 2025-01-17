import IProjectController from "../../interface/controllers/IProject.controller.interface";
import IProjectUsecase from "../../interface/usecase/IProject.usecase.interface";


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
 *       200:
 *         description: Project created successfully
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




}