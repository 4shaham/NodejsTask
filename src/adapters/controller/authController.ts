import { NextFunction, Request, Response } from "express"
import { IAuthController } from "../../interface/controllers/IAuth.controller.interface"
import IAuthUseCase from "../../interface/usecase/IAuth.usecase.interface"



export default class AuthController implements IAuthController{
 
    private authUseCase:IAuthUseCase
    constructor(authUseCase:IAuthUseCase){
        this.authUseCase=authUseCase
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */


    async login(req:Request, res: Response,next:NextFunction): Promise<void> {
        try {
            console.log(req.body)
            res.status(200).json({success:true})
            
        } catch (error) {
            next(error)
        }
    }

     

      

    
}