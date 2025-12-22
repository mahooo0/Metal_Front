import { Task } from "../types/task-api.types";
import { TaskItem } from "../types/task.types";

export function mapTaskToTableItem(task: Task): TaskItem {
  return {
    id: task.id,
    createdDate: task.createdAt,
    startDate: task.startExecutionDate,
    entity: task.orderRequest?.title || task.orderRequestId || "",
    taskType: task.taskType?.name || "",
    creator: task.createdBy?.displayName || "",
    responsible: task.responsibleUser?.displayName || "",
    comment: task.description || "",
    status: task.status,
    statusDisplay: task.status === "DONE" ? "completed" : "current",
  };
}
