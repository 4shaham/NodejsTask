export default interface ProjectEntity {
  projectId: number;
  name: string;
  description: string;
  ownerId: number; // User ID who owns the project
  createdAt?: Date;
  updatedAt?: Date;
}