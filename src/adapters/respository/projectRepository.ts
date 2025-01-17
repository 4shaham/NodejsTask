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
      await Project.create({ name, description, ownerId });
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
}
