import { api } from "@/shared/api";

import {
  TaskType,
  CreateTaskTypeDto,
  UpdateTaskTypeDto,
} from "@/features/tasks/types/task-type.types";

class TaskTypesService {
  public list() {
    return api.get<TaskType[]>("task-types");
  }

  public create(data: CreateTaskTypeDto) {
    return api.post<TaskType>("task-types", data);
  }

  public update(id: string, data: UpdateTaskTypeDto) {
    return api.put<TaskType>(`task-types/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`task-types/${id}`);
  }
}

export const taskTypesService = new TaskTypesService();

