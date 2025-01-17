import { Model } from "sequelize";
import userEntity from "../../entity/userEntity";
import IProjectRepository from "../../interface/repository/IProject.repository.interface";
import User from "../../framework/model/userModel";
import Project from "../../framework/model/projectModel";
import ProjectEntity from "../../entity/projectEntity";


export default class ProjectRepository implements IProjectRepository {




  async userIsValid(id:number): Promise<null | userEntity> {
    try {

        const data = await User.findOne({
            where: {id},
            attributes: ['id', 'password', 'email', 'name'],
        });

       return data?.dataValues?data.dataValues:null
    } catch (error) {
         throw error
    }
}


async projectNameIsUsed(name: string): Promise<null | ProjectEntity> {
    try {
        
        const data=await Project.findOne({
            where: {name},
            attributes: ['projectId'],
        });
        return data?.dataValues?data.dataValues:null
    } catch (error) {
        throw error
    }
}

async saveProject(name: string, description: string, ownerId: number): Promise<void> {
    try {
        
        await Project.create({name,description,ownerId})

    } catch (error) {
        throw error
    }
}


}
