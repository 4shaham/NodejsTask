export enum TaskStatus {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Completed = 'Completed',
    OnHold = 'OnHold',
    Archived = 'Archived',
  }
  
  export default interface TaskEntity {
    id: number;
    title:string;
    description:string;
    status:TaskStatus;
    projectId:number;
    createdAt?:Date;
    updatedAt?:Date;
  }
  