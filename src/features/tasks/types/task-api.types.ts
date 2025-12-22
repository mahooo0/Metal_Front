export type TaskStatus =
  | "PLANNING"
  | "BACKLOG"
  | "TODO"
  | "IN_PROGRESS"
  | "CALCULATION"
  | "DONE"
  | "CANCELED";

export type TaskSortBy =
  | "createdAt"
  | "startExecutionDate"
  | "type"
  | "status"
  | "responsibleUser"
  | "createdBy";

export interface CreateTaskDto {
  title: string;
  description: string;
  orderRequestId: string;
  taskTypeId: string;
  startExecutionDate: string;
  startTime: string;
  endTime: string;
  responsibleUserId: string;
}

export interface UpdateTaskDto {
  title: string;
  description: string;
  taskTypeId: string;
  startExecutionDate: string;
  startTime: string;
  endTime: string;
  responsibleUserId: string;
  status: TaskStatus;
}

export interface TaskType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Counterparty {
  id: string;
  name: string;
  comment: string;
  legalAddress: string;
  actualAddress: string;
  bankDetails: string;
  edrpou: string;
  ipn: string;
  vatCertificate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderRequest {
  id: string;
  title: string;
  description: string;
  indexLike: string;
  status: string;
  startTime: string;
  endTime: string;
  orderTypeId: string;
  counterpartyId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  counterparty: Counterparty;
}

export interface CreatedBy {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
}

export interface ResponsibleUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
}

export interface TaskComment {
  id: string;
  text: string;
  createdAt: string;
  createdBy: CreatedBy;
}

export interface TaskCount {
  comments: number;
  files: number;
  timeline: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  startExecutionDate: string;
  startTime: string;
  endTime: string;
  taskTypeId: string;
  orderRequestId: string;
  createdById: string;
  responsibleUserId: string;
  createdAt: string;
  updatedAt: string;
  taskType: TaskType;
  orderRequest: OrderRequest;
  createdBy: CreatedBy;
  responsibleUser: ResponsibleUser;
  comments?: TaskComment[];
  _count: TaskCount;
}

export interface TasksMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TasksResponse {
  data: Task[];
  meta: TasksMeta;
}

export interface TasksQuery {
  search?: string;
  startExecutionDateFrom?: string;
  startExecutionDateTo?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
  taskTypeId?: string;
  counterpartyId?: string;
  createdById?: string;
  responsibleUserId?: string;
  status?: TaskStatus;
  orderRequestId?: string;
  year?: number;
  month?: number;
  day?: number;
  sortBy?: TaskSortBy;
  sortDirection?: "asc" | "desc";
  page?: number;
  limit?: number;
}
