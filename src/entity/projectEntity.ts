export default interface ProjectEntity {
  projectId:number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}