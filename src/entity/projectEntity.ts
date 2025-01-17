export default interface ProjectEntity {
  id: number;
  title: string;
  description: string;
  ownerId: number; // User ID who owns the project
  createdAt?: Date;
  updatedAt?: Date;
}