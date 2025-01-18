import { Model } from "sequelize";
import userEntity from "../../entity/userEntity";
import IProjectRepository from "../../interface/repository/IProject.repository.interface";
import User from "../../framework/model/userModel";
import Project from "../../framework/model/projectModel";
import ProjectEntity from "../../entity/projectEntity";
import UserProjects from "../../framework/model/userProjectsModel";

export default class ProjectRepository implements IProjectRepository {

  async userIsValid(id: number): Promise<null | userEntity> {
    try {
      const data = await User.findOne({
        where: { id },
        attributes: ["id", "password", "email", "name"],
      });

      return data?.dataValues ? data.dataValues : null;
    } catch (error) {
      throw error;
    }
  }

  async projectNameIsUsed(name: string): Promise<null | ProjectEntity> {
    try {
      const data = await Project.findOne({
        where: { name },
        attributes: ["projectId"],
      });
      return data?.dataValues ? data.dataValues : null;
    } catch (error) {
      throw error;
    }
  }

  async projectIdIsValid(projectId: number): Promise<null | ProjectEntity> {
    try {
      const data = await Project.findOne({
        where: { projectId },
        attributes: ["projectId"],
      });
      return data?.dataValues ? data.dataValues : null;
    } catch (error) {
      throw error;
    }
  }

  async saveProject(
    name: string,
    description: string,
    ownerId: number
  ): Promise<void> {
    try {
      let project=await Project.create({ name, description});
      console.log(project.dataValues.projectId,"project after crate")
      await UserProjects.create({userId:ownerId,projectId:project.dataValues.projectId,role:"owner"})
    } catch (error) {
      throw error;
    }
  }

  async addMembers(userId: number, projectId: number): Promise<void> {
    try {
      await UserProjects.create({
        userId, // The user ID you want to add
        projectId, // The project ID
      });
    } catch (error) {
      throw error;
    }
  }

  async removeMembers(userId: number, projectId: number): Promise<void> {
    try {

      await UserProjects.destroy({
        where: {
          userId: userId,       
          projectId: projectId, 
        }})
      
    } catch (error) {
       throw error
    }
  }


  async verifyOwnerOfTheProject(userId: number, projectId: number): Promise<Boolean> {
     try {
      
      let project=await UserProjects.findOne({
        where: {userId,projectId},
        attributes: ["role"],
      });
      
      return project?.dataValues.role=="owner"?true:false
     
     }catch (error) {
       throw error
     }

  }




  async fetchAllProjects(userId:number): Promise<null|ProjectEntity[]> {
      try {
        
        const project:any =await User.findOne({
          where: { id: userId },  // Find the user by ID
          include: [
            {
              model:Project,      // Include related projects
              attributes: ['projectId','name', 'description'],  // Specify which fields to fetch from Project
            },
          ],
        });

      let array=project.dataValues.Projects.map((project: any) => ({
          id: project.projectId,
          name: project.name,
          description: project.description
      }))
   
      return array

       
      } catch (error) {
        console.log("eroror",error)
         throw error
      }
  }


  async memberisExcedd(userId:number, projectId:number): Promise<Boolean> {
    try {
      
      let project=await UserProjects.findOne({
        where:{userId,projectId},
        attributes: ["role"],
      });

      return project?.dataValues.role?true:false
      
    } catch (error) {
      throw error
    }
  }


  async updateProject(name: string, description: string, projectId:number): Promise<void> {
     try {

      await Project.update(
        { 
          name, 
          description 
        }, 
        { 
          where: {projectId}
        }
      );
      
     } catch (error) {
       throw error
     }
  }

  async deleteProject(projectId: number): Promise<void> {
     try {
      
      await Project.destroy({
        where: {       
          projectId: projectId, 
      }})

     } catch (error) {
       throw error
     }
  }


}
