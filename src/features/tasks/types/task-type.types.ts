export interface TaskType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskTypeDto {
  name: string;
}

export interface UpdateTaskTypeDto {
  name: string;
}

