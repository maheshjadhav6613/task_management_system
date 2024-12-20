export interface Task {
  id: number;
  title: string;
  description: string;
}

export interface KanbanColumn {
  status: string;
  statusId: number;
  tasks: Task[];
}





