import { Request } from 'express';

export default interface IRequest extends Request {
    userId?:number;
    email?:string;
}

import { Model, Sequelize } from "sequelize";

// Extend the Model interface to include the `associate` method
export interface BaseModel extends Model {
  associate?: (models: { [key: string]: typeof Model }) => void;
}

