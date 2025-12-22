import {
  CreateTaskDto,
  Task,
  TasksQuery,
  TasksResponse,
  UpdateTaskDto,
} from "@/features/tasks/types/task-api.types";

import { api } from "@/shared/api";

class TasksService {
  public getTasks(params: TasksQuery = { page: 1, limit: 20 }) {
    return api.get<TasksResponse>("tasks", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.search && { search: params.search }),
        ...(params.startExecutionDateFrom && {
          startExecutionDateFrom: params.startExecutionDateFrom,
        }),
        ...(params.startExecutionDateTo && {
          startExecutionDateTo: params.startExecutionDateTo,
        }),
        ...(params.createdAtFrom && { createdAtFrom: params.createdAtFrom }),
        ...(params.createdAtTo && { createdAtTo: params.createdAtTo }),
        ...(params.taskTypeId && { taskTypeId: params.taskTypeId }),
        ...(params.counterpartyId && { counterpartyId: params.counterpartyId }),
        ...(params.createdById && { createdById: params.createdById }),
        ...(params.responsibleUserId && {
          responsibleUserId: params.responsibleUserId,
        }),
        ...(params.status && { status: params.status }),
        ...(params.orderRequestId && { orderRequestId: params.orderRequestId }),
        ...(params.year && { year: params.year }),
        ...(params.month && { month: params.month }),
        ...(params.day && { day: params.day }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortDirection && { sortDirection: params.sortDirection }),
      },
    });
  }

  public getById(id: string) {
    return api.get<Task>(`tasks/${id}`);
  }

  public create(data: CreateTaskDto) {
    return api.post<Task>("tasks", data);
  }

  public update(id: string, data: UpdateTaskDto) {
    return api.put<Task>(`tasks/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`tasks/${id}`);
  }

  public addComment(taskId: string, text: string) {
    return api.post<{ id: string; text: string; createdAt: string }>(
      `tasks/${taskId}/comments`,
      { text }
    );
  }

  public getComments(taskId: string) {
    return api.get<
      Array<{
        id: string;
        text: string;
        createdAt: string;
        createdBy: {
          id: string;
          email: string;
          firstName: string;
          lastName: string;
          displayName: string;
        };
      }>
    >(`tasks/${taskId}/comments`);
  }
}

export const tasksService = new TasksService();
