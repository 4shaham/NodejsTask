export enum TaskStatus {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed',
}
  
  export default interface TaskEntity {
    taskId: number;
    title:string;
    description:string;
    status:TaskStatus;
    projectId:number;
    createdAt?:Date;
    updatedAt?:Date;
  }
  