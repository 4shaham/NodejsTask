import { NextFunction, Request, Response } from "express"
import { IAuthController } from "../../interface/controllers/IAuth.controller.interface"
import IAuthUseCase from "../../interface/usecase/IAuth.usecase.interface"
import { StatusCode } from "../../enums/statusCode"



export default class AuthController implements IAuthController{
 
    private authUseCase:IAuthUseCase
    constructor(authUseCase:IAuthUseCase){
        this.authUseCase=authUseCase
    }


    /**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: User registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *               confirmPassword:
 *                 type: string
 *                 description: Password confirmation, must match password
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation error (e.g., missing fields, passwords do not match)
 *       409:
 *         description: Email is already in use
 */



    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {name,email,password,confirmPassword}=req.body
            await this.authUseCase.verifyRegister(name,email,password,confirmPassword)
            res.status(StatusCode.created).json({message:"Registration successful"})
        } catch (error) {
             next(error)
        }
    }

    

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation error (e.g., missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: Missing email or password"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 */



    async login(req:Request, res: Response,next:NextFunction): Promise<void> {
        try {

            const {email,password}=req.body
            let token=await this.authUseCase.verifyLogin(email,password)

            if(token){
                res.status(StatusCode.success).json({success:true,token})
            }
            
        } catch (error) {
            next(error)
        }
    }

   
    /**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: [] # Indicates JWT token is required
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized, invalid, or missing token
 *       500:
 *         description: Internal server error
 */


    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (error) {
             next(error)
        }
    }  
      

    
}